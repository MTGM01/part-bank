<script setup>
defineProps({
  text: {
    types: String,
    default: ''
  },
  iconUrl: {
    types: String,
    default: '/src/assets/icons/dashboard.svg'
  },
  onClick: {
    type: Function
  }
})
</script>

<template>
  <div @click="onClick" class="option">
    <span>{{ text }}</span>
    <img :src="iconUrl" :alt="text" />
  </div>
</template>

<style lang="scss" scoped>
.option {
  width: 100%;
}
</style>
