<script setup>
import { ref } from 'vue'
import { loginSchema } from '@/libs/input-rules'
import { reactive } from 'vue'
import { useLoginAPIStore } from '@/stores/login-data'
import { useRouter } from 'vue-router'

const router = useRouter()

const loginAPIStore = useLoginAPIStore()

const toggleIcon = ref({
  src: '/src/assets/icons/eye-close.svg',
  alt: 'close eye icon'
})

const showPassword = ref(false)

function toggleVisibility() {
  if (!showPassword.value) {
    toggleIcon.value.src = '/src/assets/icons/eye-open.svg'
    toggleIcon.value.alt = 'open eye icon'
    showPassword.value = true
    inputs[1].type = 'text'
  } else {
    toggleIcon.value.src = '/src/assets/icons/eye-close.svg'
    toggleIcon.value.alt = 'close eye icon'
    showPassword.value = false
    inputs[1].type = 'password'
  }
}

const inputs = reactive([
  {
    type: 'tel',
    id: 'phone-number',
    label: 'شماره همراه',
    name: 'phoneNumber',
    placeHolder: 'مثلا: 09121234567',
    border: 'none',
    labelColor: 'var(--color-black-500)',
    elementClass: 'login-form__inputs input-field'
  },
  {
    type: 'password',
    id: 'password',
    label: 'رمز عبور',
    name: 'password',
    placeHolder: 'رمز عبور ',
    border: 'none',
    labelColor: 'var(--color-black-500)',
    icon: true,
    elementClass: 'login-form__inputs input-field'
  }
])

const buttons = reactive([
  {
    disable: false,
    text: 'ورود',
    type: 'submit'
  }
])

const loginHandler = async (data) => {
  await loginAPIStore.setAPIData(data)
  router.push('/')
}
</script>
<template lang="">
  <div class="login-layout">
    <section class="login-layout__container login-container">
      <div class="login-container__form-container form-container">
        <div class="form-container__header">
          <img src="/src/assets/icons/logo.svg" alt="part bank logo" />
          <div class="form-container__titles">
            <span class="form-container__title">پارت بانک</span>
            <span class="form-container__subtitle">تجربه ای نوین در بانکداری</span>
          </div>
        </div>

        <base-form
          :isLoading="loginAPIStore.$state.isLoading"
          :inputs="inputs"
          :buttons="buttons"
          :validation="loginSchema"
          :onSubmit="loginHandler"
          mainClass="login-container"
          layoutClass="login-form-layout"
        >
          <template #icon>
            <div @click="toggleVisibility">
              <img
                :src="toggleIcon.src"
                id="trigger"
                class="login-form__trigger-icon"
                :alt="toggleIcon.alt"
              />
            </div>
          </template>
</base-form>

<p class="form-container__footer-text">پشتیبانی: ۱۲۳۴۵۶۷۸-‍‍‍‍‍۰۲۱</p>
</div>
<div class="login-container__aside">
  <img src="/src/assets/images/login-img.png" alt="login image" title="part bank login"
    class="login-container__aside-image" />
</div>
</section>
</div>
</template>

<style lang="scss">
.login-layout {
  @include flexBox($dir: row, $align: center, $justify: center);
  background: url('/src/assets/images/login-bg.png') lightgray 0px -100px / 100% 118.519% no-repeat;
  width: 100%;
  height: 100vh;
}

.login-container {
  box-shadow: 0px 0px 4px 0px rgba(0, 67, 101, 0.05);
  @include flexBox($dir: row, $align: center, $gap: 20px);
  background-color: var(--color-surface);
  border-radius: 15px;

  &__form-container {
    width: 37.5rem;
    height: 52.5rem;
  }

  &__form {
    width: 22.1rem;
  }

  &__aside {
    width: 50%;
    height: 100%;
    padding: 20px 0 20px 20px;
    @include flexBox($align: center, $justify: center);
  }

  &__aside-image {
    object-fit: cover;
    border-radius: 12px;
    width: 100%;
    height: 100%;
  }
}

.form-container {
  @include flexBox($dir: column, $align: center);
  padding: 66.4px 0 25.6px;

  &__header {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
    width: 100%;
    margin-bottom: 6.45rem;
  }

  &__title {
    @include font(40px, 700);
    line-height: 32px;
    color: var(--color-primary-500);
    text-align: center;
  }

  &__subtitle {
    @include font(16px, 400);
    line-height: 32px;
    color: var(--color-primary-500);
    text-align: center;
  }

  &__titles {
    @include flexBox($dir: column, $align: center, $justify: flex-start, $gap: 4px);
  }

  &__footer-text {
    @include font(14px, 400);
    color: var(--color-black-500);
    margin-top: 14rem;
  }
}
</style>