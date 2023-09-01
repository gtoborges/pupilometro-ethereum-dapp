import { defineStore } from 'pinia';
import { ethers } from 'ethers';
import { Client } from '@xmtp/xmtp-js'

export const useXmtpStore = defineStore('xmtpStore', () => {

  const getSigner = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(window.ethereum.selectedAddress)
    return signer
  }

  const xmtpClient = async () => {
    const signer = await getSigner()
    const xmtp = await Client.create(signer, { env: import.meta.env.VITE_XMTP_ENV })
    return xmtp
  }

  const sendMessage = async (xmtp_client: Client, addressTo: string, message: string) => {
    if(!await xmtp_client?.canMessage(addressTo)) throw new Error('Endereço não encontrado na rede')

    const conversation = await xmtp_client.conversations.newConversation(addressTo, 
      { 
        conversationId: "exam", 
        metadata: { ['']: '' } 
      }
    );
    await conversation.send(message)
  }

  const getExamsKeys = async (xmtp_client: Client) => {
    const conversationsList = await xmtp_client.conversations.list() // obter lista de todas as conversações
    const [conversation] = conversationsList.filter(c => c.context?.conversationId == 'exam')
    if(!conversation) return 
    const messages = await conversation.messages() // pegar mensagens da conversa

    return messages.map(m => m.content)
  }

  const shareExam = async (xmtp_client: Client, addressTo: string, message: string) => {
    if(!await xmtp_client?.canMessage(addressTo)) throw new Error('Endereço não encontrado na rede')
    
    const conversation = await xmtp_client.conversations.newConversation(addressTo,
      {
        conversationId: "sharedExam",
        metadata: { ['']: '' }
      }
    )
    await conversation.send(message)
  }

  const getSharedExams = async (xmtp_client: Client, address: string) => {
    const conversationList = await xmtp_client.conversations.list();
    console.log(conversationList, address)
    const [conversation] = conversationList.filter(c => c.context?.conversationId == 'sharedExam' && c.peerAddress == address)
    console.log(conversation)
    if(!conversation) return []
    const messages = await conversation.messages()

    return messages.map(m => m.content)
  }

  return {
    xmtpClient,
    sendMessage,
    getExamsKeys,
    shareExam,
    getSharedExams
  }
})
