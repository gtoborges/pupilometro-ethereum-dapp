<script setup lang="ts">
import { usePatientFormStore } from '../stores/patientForm'
const patientForm = usePatientFormStore()

</script>

<template>
  <el-upload 
    v-model="patientForm.imagesList"
    class="upload-demo"
    multiple
    accept="image/png"
    :on-remove="patientForm.handleImagesRemove"
    :auto-upload="false"
    list-type="picture"
    :on-change="patientForm.handleImagesChange"
    :on-preview="patientForm.handleImagePreview"
    :accept="'png'"
  >
    <el-button type="primary">Selecionar imagens</el-button> 
  </el-upload>
</template>
