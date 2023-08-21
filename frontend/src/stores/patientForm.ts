import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { UploadProps, UploadUserFile } from 'element-plus'

export const usePatientFormStore = defineStore('patientForm', () => {
  
  const walletAddress = ref('')

  const imagesList = ref<UploadUserFile[]>([]);
  const handleImagesRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('handleRemove', uploadFiles)
    imagesList.value = uploadFiles
  }
  const handleImagesChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    console.log('handleChange', uploadFile, uploadFiles)
    imagesList.value = uploadFiles
  }
  // const handleImagePreview: UploadProps['onPreview'] = async (file) => {
  //   console.log('handlePreview', file)
  // }

  const videosList = ref<UploadUserFile[]>([]);
  const handleVideosRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log('handleRemove', uploadFiles)
    videosList.value = uploadFiles
  }
  const handleVideosChange: UploadProps['onChange'] = (uploadFile, uploadFiles) => {
    console.log('handleChange', uploadFile, uploadFiles)
    videosList.value = uploadFiles
  }
  // const handleVideoPreview: UploadProps['onPreview'] = async (file) => {
  //   console.log('handlePreview', file)
  // }

  

  return { 
    walletAddress, 
    imagesList, 
    handleImagesRemove, 
    handleImagesChange,
    videosList,
    handleVideosRemove,
    handleVideosChange
  }
})
