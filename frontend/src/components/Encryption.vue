<script setup lang="ts">
import base64 from '../assets/base64.json'
import ipfs from '../services/ipfs-client.ts'
import conversions from '../utils/conversions.ts'
import { onMounted, ref } from 'vue'


console.log('base64 original: ', base64.imagem)
let teste2 = ref('')
const showImage = ref(false)

onMounted( async () => {

  let arrayBytes = conversions.getArrayFromBase64(base64.imagem)
  console.log('arrayBytes: ', arrayBytes)

  // console.log('array stringify: ', await conversions.encodeData(arrayBytes))


  // console.log('url: ', teste2.value)
  
  let iv = await conversions.generateIV()
  console.log('iv: ', iv)
  let key = '12345678'
  let generatedKey = await conversions.generateKey(key)
  console.log('key: ', generatedKey, generatedKey.toString())


  // let encodedContent = await conversions.encodeData(arrayBytes)
  // console.log('encodedCondent: ', encodedContent)
  

  let encrypted = await conversions.encryptData(arrayBytes, iv, generatedKey)
  console.log('encrypted: ', encrypted)

  
  let decrypted = await conversions.decryptData(encrypted, iv, generatedKey)
  console.log('decrypted: ', decrypted)
  const image = new Blob([decrypted], { type: 'image/png'})
  const link = document.createElement('a')
  link.href = window.URL.createObjectURL(image)
  link.download = "novaImagem.png"
  link.click()
  return

  let decoded = await conversions.decodeData(decrypted)
  console.log('decoded string: ', decoded)
  let arrayBuffer = new Uint8Array(decoded.split(','))
  console.log('decoded array: ', arrayBytes)

  teste2.value = await conversions.getBase64FromArrayBuffer(arrayBuffer)
  console.log('base64 decryptada: ', teste2.value)
  


  setTimeout(() => {
    console.log('2segundos', showImage.value)
    showImage.value = true  
  }, 2000);

})

const readFile = async (e) => {
  let text = await conversions.readFileAsText(e.target.files[0])
  console.log(text)
}


</script>

<template>
  teste

  <!-- <input type="file" accept="image/png" @change="readFile" /> -->

  <div v-if="showImage">
    <!-- <img :src="teste2" /> -->
    <img :src="'data:image/png;base64,' + teste2" />
  </div>
</template>
