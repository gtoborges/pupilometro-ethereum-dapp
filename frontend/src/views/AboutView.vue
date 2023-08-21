<script lang="ts" setup>
import Upload from '../components/TheUpload.vue'
</script>

<template>
  <div class="about">
    <Upload />
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
