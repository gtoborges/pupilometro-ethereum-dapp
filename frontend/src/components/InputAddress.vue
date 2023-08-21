<script setup lang="ts">
import { usePatientFormStore } from '../stores/patientForm'

const patientForm = usePatientFormStore()
</script>

<template>
  <el-input v-model="patientForm.walletAddress" placeholder="Endereço do paciente">
    <template #prepend>Endereço</template>
  </el-input> 
</template>
