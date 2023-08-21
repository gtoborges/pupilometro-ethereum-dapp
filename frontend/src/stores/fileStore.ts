import { reactive } from "vue";
import { defineStore } from "pinia";
import utils from '../utils/conversions'

export const useFileStore = defineStore('fileStore', () => {

  let password:string = ''
  let iv = []
  let key
  const filesToUpload = reactive({ videos: [], images: [], texts: []})

  const encryptFiles = async (arrayBuffer, filetype) => {
    if(!password.length) password = utils.generateRandomPassword()
    if(!iv.length) iv = await utils.generateIV()
    if(!key) key = await utils.generateKey(password)
    const encryptedFile = await utils.encryptData(arrayBuffer, iv, key)
    filesToUpload[filetype].push(encryptedFile)

    console.log('password and iv: ', password, iv)
    Promise.resolve()
  }

  const getMessage = () => {
    return `${password};${iv.join(",")}`
  }

  return {
    filesToUpload,
    encryptFiles,
    getMessage
  }
})
