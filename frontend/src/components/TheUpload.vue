<script setup lang="ts">
import utils from '../utils/conversions.ts'
import ipfs from '../services/ipfs-client.ts'
import { ref, onMounted } from 'vue';

let url = ref('')

const getImages = async (e) => {
  
  for(let file of e.target.files) {
    console.log(file)
    let image = await utils.getBase64FromArrayBuffer(file)
    console.log(image)
    // let cid = await ipfs.add(image)
    // console.log(cid)
    let array = await utils.getArrayFromBase64(image)
    console.log('array: ', array)

  }

}

onMounted( async () => {
  let CID = "QmUuh9UEBzjjxmB3G2FW58pU7QPq4jsSNjc9pSKH8smPn6"
  let response = await ipfs.cat(CID)
  console.log(response)
  let base64 = await utils.decodeData(response.value)
  console.log(base64)
  url.value = utils.getUrl(base64)
})
</script>

<template>
  <div>teste</div>
  <input type="file" multiple accept="image/png" @change="getImages" />
  <img :src="url" />
</template>
