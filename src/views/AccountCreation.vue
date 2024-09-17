<script setup>
import AccountCreationInput from '@/components/create-account-flow/AccountCreationInput.vue'
import TheHeader from '@/components/common/TheHeader.vue'
import FilePicker from '@/components/create-account-flow/FilePicker.vue'
import AccountCreationConfirm from '@/components/create-account-flow/AccountCreationConfirm.vue'
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="deposit-creation">
    <!-- navbar -->
    <TheHeader />

    <!-- steps section -->
    <AccountCreationInput v-if="route.fullPath == '/create-account'" title="اطلاعات فردی" />

    <file-picker v-if="route.fullPath == '/create-account/upload-national-card'" />

    <AccountCreationConfirm v-if="route.fullPath == '/create-account/confirm-information'" />
  </div>
</template>

<style lang="scss">
.deposit-creation {
  @include flexBox($dir: column, $align: center, $justify: flex-start, $gap: 2.5rem);
  width: 100%;
  height: 100vh;
  background: #f7f8fa;

  &__step-template {
    width: 87.5rem;
    padding: 2.5rem;
    padding: 40px;
  }
}
</style>
