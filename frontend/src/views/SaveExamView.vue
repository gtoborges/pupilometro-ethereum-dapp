<script setup lang="ts">
import InputAddressVue from '../components/InputAddress.vue';
import InputImagesVue from '../components/InputImages.vue';
import InputVideosVue from '../components/InputVideos.vue';
import { examsContract } from '../services/metamask'

import ipfs from '../services/ipfs-client.ts'

import { usePatientFormStore } from '../stores/patientForm'
import { useFileStore } from '../stores/fileStore'
import { useXmtpStore } from '../stores/xmtp'
const patientFormStore = usePatientFormStore()
const fileStore = useFileStore()
const messageStore = useXmtpStore()

const encryptFiles = async () => {

  for(let video of patientFormStore.videosList) {
    let arrayBuffer = new Uint8Array(await video.raw?.arrayBuffer())
    await fileStore.encryptFiles(arrayBuffer, 'videos')
  }

  for(let image of patientFormStore.imagesList) {
    let arrayBuffer = new Uint8Array(await image.raw?.arrayBuffer())
    await fileStore.encryptFiles(arrayBuffer, 'images')
  }

  // acrescentar a parte de textos

  return
}

const uploadFiles = async () => {

  const payload = {
    timestamp: new Date().getTime(),
    videos: [],
    images: [],
    texts: []
  }

  console.log('>>>>>>>>> uploadfiles')
  for(let image of fileStore.filesToUpload.images) {
    const response = await ipfs.add(image, {content: Uint8Array})
    console.log('image saved: ', response.path)
    payload.images.push(response.path)
  }
  

  for(let video of fileStore.filesToUpload.videos) {
    const response = await ipfs.add(video, {content: Uint8Array})
    console.log('video saved: ', response.path)
    payload.videos.push(response.path)
  }

  for(let text of fileStore.filesToUpload.texts) {
    const response = await ipfs.add(text, {content: Uint8Array})
    console.log('text saved: ', response.path)
    payload.texts.push(response.path)
  }

  return payload
}

const saveOnChain = async ({timestamp, videos, images, texts}, address) => {

  console.log({timestamp, videos, images, texts}, address)

  let receipt
  try {
    const response = await examsContract().storeExam(address, videos, images, texts, timestamp)
    receipt = await response.wait()
  } catch (error) {
    console.log('erro store exam: ', error)
  }
  console.log('save on chain receipt: ', receipt)

  return receipt
}

const saveExam = async () => {
  
  if(!patientFormStore.walletAddress.length) return console.log('missing wallet address')

  await encryptFiles()
  const payload = await uploadFiles()
  const response = await saveOnChain(payload, patientFormStore.walletAddress)

  const message = `${payload.timestamp};${fileStore.getMessage()}`
  console.log('message xmtp: ', message)
  const xmtp = await messageStore.xmtpClient()
  await messageStore.sendMessage(xmtp, patientFormStore.walletAddress, message)

  return
}

</script>

<template>
  <el-col>
    <InputAddressVue></InputAddressVue>
  </el-col>
  <el-divider />
  <el-col>
    <InputImagesVue></InputImagesVue>
  </el-col>
  <el-divider />
  <el-col>
    <InputVideosVue></InputVideosVue>
  </el-col>
  <el-divider />
  <el-col :span="12" :offset="6">
    <el-button type="success" size="large" style="width: 100%" @click="saveExam">Salvar</el-button>
  </el-col>
</template>
