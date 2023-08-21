<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import utils from '../utils/conversions'
import ipfs from '../services/ipfs-client.ts'
import all from 'it-all'
import { concat as uint8ArrayConcat } from 'uint8arrays/concat'

const imageUrl = ref('')

onMounted(async () => {
  // let CID = 'QmQ6bDH2j3n7qsumKUbkZ7cXocJHNSkvZLitHNKJqyCwdQ'
  let CID = 'QmZKkYr1aYcHXGN1ZCSnUzuqiuLw26BVnXqm1eg5Fq5z5A'
  let response = await all(ipfs.cat(CID))

  console.log('response: ', response) // 8445288
  let video = uint8ArrayConcat(response)
  console.log('video: ', video)

  let password = 'AJ69KRAV4KTAM'
  let iv = new Uint8Array([57, 200, 155, 100, 83, 198, 210, 253, 164, 62, 186, 66, 39, 236, 77, 58])
  let key = await utils.generateKey(password)
  let decrypted = await utils.decryptData(video, iv, key)
  console.log('decrypted: ', decrypted)

  const blob = new Blob([decrypted], { type: 'video/mp4'})
  utils.downloadBlob(blob, 'video30mb.mp4')
  return
  const myBlob = new Blob(test.value, { type: 'image/png' })
  console.log(myBlob)
  let base64url = await base64_arraybuffer(test.value)

  setImageUrl(base64url)
})

const base64_arraybuffer = async (data) => {
    // Use a FileReader to generate a base64 data URI
    const base64url = await new Promise((r) => {
        const reader = new FileReader()
        reader.onload = () => r(reader.result)
        reader.readAsDataURL(new Blob([data]))
    })

    return base64url

    /*
    The result looks like 
    "data:application/octet-stream;base64,<your base64 data>", 
    so we split off the beginning:
    */
    // return base64url.substring(base64url.indexOf(',')+1)
}

const loadImageOnScreen = (e) => {
  const image = e.target.files[0]
  const reader = new FileReader()
  console.log(image)
  reader.readAsDataURL(image)
  reader.onload = e => {
    setImageUrl(e.target.result)
  }
}

const setImageUrl = (url) => {
  console.log('url: ', url)
  imageUrl.value = url
}
</script>

<template>
  <input type="file" accept="image/png" @change="loadImageOnScreen" />
  <img :src="imageUrl" />
</template>
