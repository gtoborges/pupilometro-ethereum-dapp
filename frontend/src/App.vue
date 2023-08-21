<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { getEth } from './services/metamask'

onMounted(() => {
  try {
    getEth()
  } catch (err) {
    window.location.replace('https://metamask.io/download/')
  }
})

const activeIndex = ref('1')
// const handleSelect = (key: string, keyPath: string[]) => {
//   console.log(key, keyPath)
// }

</script>

<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-menu
          style="justify-content: center"
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#f8f8f8"
        >
          <RouterLink to="/save">
            <el-menu-item index="1">Salvar dados</el-menu-item>
          </RouterLink>
          <RouterLink to="/manage-permissions">
            <el-menu-item index="2">Gerenciar permissões</el-menu-item>
          </RouterLink>
          <RouterLink to="/list-exams">
            <el-menu-item index="3">Listar exames</el-menu-item>
          </RouterLink>
          <RouterLink to="/search-exams">
            <el-menu-item index="4">Buscar exames</el-menu-item>
          </RouterLink>
        </el-menu>
      </el-header>
      <el-divider/>
      <el-main>
        <el-row>
          <RouterView />
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.ul {
  width: 100%;
}

</style>
