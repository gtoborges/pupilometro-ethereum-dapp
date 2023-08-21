<script setup lang="ts">
import { Download } from '@element-plus/icons-vue'
import utils from '../utils/conversions'
import ipfs from '../services/ipfs-client'
import all from 'it-all'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'

const props = defineProps({ 
  exam: { type: Object } 
})

const getFileType = (type) => {
  if(type == 'video') return 'video/mp4'
  else return 'image/png'
} 

const generateFileName = (type, index) => {
  if(type == 'video') return `${props.exam.timestamp}_video_${index+1}`
  else return `${props.exam.timestamp}_image_${index+1}`
}

const downloadFile = async (fileAddress, type, index) => {
  console.log(fileAddress, type)

  let response = await all(ipfs.cat(fileAddress))
  console.log(response)
  let encryptedBuffer = uint8ArrayConcat(response)
  console.log(encryptedBuffer)

  const key = await utils.generateKey(props.exam.keys.password)
  const decryptedFile = await utils.decryptData(encryptedBuffer, props.exam.keys.iv, key)

  const blob = new Blob([decryptedFile], { type: getFileType(type) }) 
  utils.downloadBlob(blob, generateFileName(type, index))
}
</script>

<template>
  <h2>Exame {{ props.exam.timestamp }} - {{ new Date(props.exam.timestamp).toLocaleDateString() }}</h2>
  <el-row>
    <el-card class="box-card" v-if="props.exam.images.length" style="width: 45%; margin-right: 2rem">
      <template #header>
        <span>Imagens</span>
      </template>
      <el-row v-for="(image, index) in props.exam.images" class="text item" :key="image" style="margin-top: 10px">
        <el-col :span="6" :offset="6">Imagem {{index + 1}}</el-col>
        <el-col :span="4"><el-button type="primary" :icon="Download" circle @click="downloadFile(image, 'image', index)"/></el-col>
      </el-row>
    </el-card>
    <el-card class="box-card" v-if="props.exam.videos.length" style="width: 45%">
      <template #header>
        <span>Videos</span>
      </template>
      <el-row v-for="(video, index) in props.exam.videos" class="text item" :key="video" style="margin-top: 10px">
        <el-col :span="6" :offset="6">Video {{index + 1}}</el-col>
        <el-col :span="4"><el-button type="primary" :icon="Download" circle @click="downloadFile(video, 'video', index)" /></el-col>
      </el-row>
    </el-card>
  </el-row> 
</template>
