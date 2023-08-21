<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import { onMounted, ref } from 'vue'
import { ethers } from 'ethers'
// import Exames from '../../Exames.json'
import ipfs from '../services/ipfs-client.ts'

const isMetamaskSupported = ref(false)
// const accountAddress = ref("teste")
// const examesContract = new ethers.Contract(
//   import.meta.env.VITE_CONTRACT_ADDRESS, 
//   Exames.abi,
//   new ethers.providers.Web3Provider(window.ethereum)
// ) 

const testeUrl = ref(null)
const showImage = ref(false)
let imageLink = undefined
let blobTest = ref('')

onMounted(async () => {
  // console.log(window.ethereum.isMetaMask)
  isMetamaskSupported.value = typeof (window as any).ethereum !== "undefined"

  if(isMetamaskSupported.value) requestAccounts()
  // console.log(import.meta.env)
  // console.log(Exames)

  getImagesFromContract()
  console.log('ipfs: ', ipfs)
  console.log('ipfsConfig: ', ipfs.getEndpointConfig())

  let CID = 'QmREQAbAhE3zTgp5om27Ug88TqVKXocKq3vDeveWavmqo3'
  let test = await ipfs.cat(CID).next()
  console.log('test: ', test)
  let imageBlob = new Blob(test.value)
  console.log(new Blob(test.value, { type: 'image/png' }))

  let response = await fetch('http://127.0.0.1:8080/ipfs/QmREQAbAhE3zTgp5om27Ug88TqVKXocKq3vDeveWavmqo3')
  console.log('testeUrl: ', testeUrl)
  testeUrl.value = await response.blob()
  console.log('testeUrl: ', testeUrl.value)

  blobTest.value = imageBlob
  imgUrl(imageBlob)
})

async function requestAccounts() {
  accountAddress.value = await (window as any).ethereum.request({ method: "eth_requestAccounts"})
  // console.log(accountAddress)
  
  return accountAddress.value.length ? accountAddress.value[0] : null
}

async function getImagesFromContract() {
  let response = await examesContract.getImages()
  console.log(response)
}

const imgUrl = (blob) => {
  imageLink = window.URL.createObjectURL(blob);
  console.log(imageLink)
  console.log('blobTest: ', blobTest)
  showImage.value = true
  console.log(showImage.value, blob)
} 
</script>

<template>
  <WelcomeItem>
    {{ accountAddress }}
    <div v-if="showImage ? true : false">
      {{ testeUrl }} - {{ imageLink }}
      <img :src="imageLink"/>
    </div>
  </WelcomeItem>
</template>
