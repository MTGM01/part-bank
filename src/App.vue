<script setup>
import { RouterView, useRouter } from 'vue-router'
import { onMounted } from 'vue'
const router = useRouter()
onMounted(() => {
  const loginObject = JSON.parse(localStorage.getItem('loginData'))
  if (!loginObject) {
    router.push('/login')
  }
})
</script>

<template>
  <RouterView />
</template>

<style lang="scss" scoped></style>
