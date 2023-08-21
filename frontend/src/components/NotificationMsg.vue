<script setup lang="ts">
import { Client } from '@xmtp/xmtp-js'
import { ethers } from 'ethers'
import { onMounted } from 'vue';

const teste01 = "0xfD54784d18961e21B0A607b5752f0d0cC5125D50"
const teste02 = "0x13619c9d533b9E77DC9A3bF5D40d2E818e9A93b4"
const teste03 = "0x729e1f907114c7f5054e4C8f79D7Fa3c3F5BFA45"

onMounted(async () => {
  let [address] = await window.ethereum.request({ method: "eth_requestAccounts"})
  console.log(address)

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner(address)
  
  const xmtp = await Client.create(signer, { env: "dev" })
  let conversationsList = await xmtp.conversations.list() // obter lista de todas as conversações
  console.log('conversationList: ', conversationsList)
  let [conversation] = await conversationsList.filter(c => c.context?.conversationId == 'exam') // buscar a conversa dentre várias pelo contexto
  if(!conversation) return 
  const messages = await conversation.messages() // pegar mensagens da conversa
  for(let msg of messages) {
    console.log(msg.content)
  }
  
})


</script>

<template>
  <div>
    teste
  </div>
</template>
