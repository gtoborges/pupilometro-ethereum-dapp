<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import ExamComponentVue from '../components/ExamComponent.vue'
import { examsContract } from '../services/metamask'

import { useXmtpStore } from '../stores/xmtp'
const messageStore = useXmtpStore()
const examsList = reactive([])
const exam = reactive({videos: [], images: [], texts: [], timestamp: null, keys: {password: null, iv: null}})
const showExam = ref(false)
let xmtp

onMounted(async () => {
  xmtp = await messageStore.xmtpClient()
  getExamsList()
})

const getExamsList = async () => {
  let response = await examsContract().getOwnExams()
  let exams = response.map(e => { return {'videos': e.videos, 'images': e.images, 'texts': e.texts, timestamp: parseInt(e.timestamp)} }) 

  let messages = await messageStore.getExamsKeys(xmtp)
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
    <label>Exames salvos</label>
    <el-card shadow="always" v-for="exam of examsList" :key="exam.timestamp" style="margin-top: 1rem">
      <el-row>
        <el-col :span="22">
          <label>{{ exam?.timestamp }} - {{ new Date(parseInt(exam?.timestamp)).toLocaleDateString()}}</label>
        </el-col>
        <el-col :span="2">
          <el-button type="success" size="small" @click="setExamToShow(exam)">Buscar</el-button>
        </el-col>
      </el-row>
    </el-card>
  </el-col>
  <el-divider/>
  <el-col v-if="showExam">
    <ExamComponentVue :exam="exam" />
  </el-col>
</template>
