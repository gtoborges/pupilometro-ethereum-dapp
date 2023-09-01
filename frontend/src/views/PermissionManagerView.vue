<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue';
import { examsContract } from '../services/metamask'

import { useXmtpStore } from '../stores/xmtp'
const messageStore = useXmtpStore()

const permissionedAddresses = reactive([])
const addressToPermit = ref('')
let xmtp

onMounted( async () => {
  xmtp = await messageStore.xmtpClient()
  getPermissions()
})

const getPermissions = async () => {
  permissionedAddresses.splice(0, permissionedAddresses.length)
  let response = await examsContract().getPermissions()
  permissionedAddresses.push(...response.filter(addr => addr != 0).map(addr => {return {'address': addr}}))

  return getExamsData()
}

const getExamsData = async () => {
  const messages = await messageStore.getExamsKeys(xmtp)
  let examsKeys = messages.map(m => m.split(";"))
  
  let data = await examsContract().getOwnExams()
  let examResults = data.map(e => { return {'videos': e.videos, 'images': e.images, 'texts': e.texts, timestamp: parseInt(e.timestamp)} })
  if(examResults.length == 0) return

  console.log('exams data:', examResults)
  console.log('messages: ', messages)
  let exams = []
  for(let keys of examsKeys) {
    const [timestamp] = keys

    let exam = examResults.find(e => e.timestamp == timestamp)
    if(!exam) continue
    exam.keys = keys.join(';')
    exams.push(exam)
  }

  for(let permission of permissionedAddresses){
    console.log(permission.address)
    for(let exam of exams) {
      exam.shared = false
    }
    let messages = await messageStore.getSharedExams(xmtp, permission.address)
    console.log(messages)
    for(let message of messages) {
      let exam = exams.find(e => e.keys == message)
      exam.shared = true
    }

    permission.exams = JSON.parse(JSON.stringify(exams))
  }
}

const shareKeys = async (row, address) => {
  await messageStore.shareExam(xmtp, address, row.keys)
  row.shared = true
}

const removePermission = async (address) => {
  console.log('address: ', address)
  let trx = await examsContract().removePermission(address)
  let response = await trx.wait()

  let index = permissionedAddresses.findIndex(p => p.address == address)
  permissionedAddresses.splice(index, 1)
}

const savePermission = async () => {
  if(!addressToPermit.value.length) return console.log("É preciso inserir um endereço")
  if(addressToPermit.value.length != 42) return console.log("Endereço inválido")

  const transaction = await examsContract().addPermission(addressToPermit.value)
  const receipt = await transaction.wait()
  getPermissions()
}

const identificacaoExame = (row, column, value) => {
  const [timestamp] = value.split(';')
  return `${timestamp} - ${new Date(parseInt(timestamp)).toLocaleDateString()}`
}
</script>

<template>
  <el-col>
    <el-table :data="permissionedAddresses" style="width: 100%" border=true>
      <el-table-column fixed="left" type="expand">
        <template #default="props">
          <el-table :data="props.row.exams" border=true>
            <el-table-column fixed prop="keys" :formatter="identificacaoExame" label="Id do exame - Data"/>
            <el-table-column fixed="right" width="120" label="Acesso">
              <template #default="scope">
                <el-button v-if="!scope.row.shared" size="small" type="success" @click="shareKeys(scope.row, props.row.address)">Compartilhar</el-button>
                <el-button v-else size="small" type="primary" disabled>Compartilhado</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>  
      <el-table-column fixed prop="address" label="Endereços permitidos" width="auto"/>
      <el-table-column fixed="right" label="Acesso" width="120">
        <template #default="scope">
          <el-button size="small" type="danger" @click="removePermission(scope.row.address)">
            Remover
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-divider/>
  </el-col>
  <el-row>
    <label>Adicionar permissão de acesso para um endereço</label>
    <el-input v-model="addressToPermit" placeholder="Endereço de carteira">
      <template #prepend>Endereço</template>
    </el-input> 
    <el-col :span="12" :offset="6" style="margin-top: 1rem">
      <el-button @click="savePermission" type="success" size="large" style="width: 100%" >Salvar</el-button>
    </el-col>
  </el-row>
</template>
