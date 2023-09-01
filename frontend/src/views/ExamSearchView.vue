<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import ExamComponentVue from '../components/ExamComponent.vue'
import { examsContract } from '../services/metamask'
import { ElMessage } from 'element-plus'

import { useXmtpStore } from '../stores/xmtp'
const messageStore = useXmtpStore()
const address = ref('')
const examsList = reactive([])
const exam = reactive({videos: [], images: [], texts: [], timestamp: null, keys: {password: null, iv: null}})
const showExam = ref(false)
let xmtp

onMounted(async () => {
  xmtp = await messageStore.xmtpClient()
})

const showErrorMessage = (message) => {
  ElMessage.error(message)
}

const searchPatientExam = async (address) => {
  if(!address) return console.log('invalid address')
  
  let response 
  try {
    response = await examsContract().searchPatientExam(address)
  } catch (error) {
    return showErrorMessage(error.reason)
  }

  return setExamsList(response, address)
}

const setExamsList = async (examsResponse, address) => {
  let exams = examsResponse.map(e => { return {'videos': e.videos, 'images': e.images, 'texts': e.texts, timestamp: parseInt(e.timestamp), keys: false} }) 

  let messages = await messageStore.getSharedExams(xmtp, address)

  for(let message of messages) {
    let [timestamp, password, ivString] = message.split(';')
    let exam = exams.find(e => e.timestamp == timestamp)
    if(!exam) continue
    exam.keys = {password, iv: new Uint8Array(ivString.split(','))}
  }

  examsList.push(...exams)
}

const setExamToShow = async (e) => {
  console.log(e)
  showExam.value = true
  exam.videos = e.videos
  exam.images = e.images
  exam.texts = e.texts
  exam.timestamp = e.timestamp
  exam.keys = e.keys
}


</script>

<template>
  <el-col>
    <el-row>
      <el-col :span="20">
        <el-input v-model="address" placeholder="Endereço do paciente">
          <template #prepend>Endereço</template>
        </el-input>
      </el-col>
      <el-col :span="2" :offset="1">
        <el-button type="success" size="medium" @click="searchPatientExam(address)">Buscar</el-button>
      </el-col>
    </el-row>
    <el-divider/>
    <label>Exames salvos</label>
    <el-card shadow="always" v-for="exam of examsList" :key="exam.timestamp" style="margin-top: 1rem">
      <el-row>
        <el-col :span="19">
          <label>{{ exam?.timestamp }} - {{ new Date(parseInt(exam?.timestamp)).toLocaleDateString()}}</label>
        </el-col>
        <el-col :span="2">
          <el-button v-if="exam.keys" type="success" size="small" @click="setExamToShow(exam)">Buscar</el-button>
          <el-button v-else type="danger" size="small" disabled>Não compartilhado</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
  <el-divider/>
  <el-col v-if="showExam">
    <ExamComponentVue :exam="exam" />
  </el-col>
</template>
