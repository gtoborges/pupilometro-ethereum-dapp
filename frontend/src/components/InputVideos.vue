<script setup lang="ts">
import { usePatientFormStore } from '../stores/patientForm'
const patientForm = usePatientFormStore()

</script>

<template>
  <el-upload 
    v-model="patientForm.videosList"
    class="upload-demo"
    multiple
    accept="video/mp4"
    :on-remove="patientForm.handleVideosRemove"
    :auto-upload="false"
    :on-change="patientForm.handleVideosChange"
    :on-preview="patientForm.handleVideoPreview"
  >
    <el-button type="primary">Selecionar videos</el-button> 
  </el-upload>
</template>
