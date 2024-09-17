<script setup>
import ThePicker from './ThePicker.vue'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()
const inputFile = document.getElementsByClassName('card-wrapper__uploaded-file')
const showValidation = ref(false)
const buttons = [
  {
    text: 'ثبت و ادامه',
    type: 'submit',
    onClick: () => {
      if (Array.from(inputFile).every(elem => elem.getAttribute('src') !== '')) {
        showValidation.value = false
        router.push('/create-account/confirm-information')
      } else {
        showValidation.value = true
      }
    }
  },
  {
    text: 'قبلی',
    class: 'button_black',
    onClick: () => {
      router.push('/create-account')
    }
  }
]
</script>

<template>
  <main class="upload-card">
    <section class="upload-card__container">
      <h3 class="upload-card__title">تصویر کارت ملی</h3>
      <div class="upload-card__line"></div>
      <form @submit.prevent method="post" class="upload-card__form-upload-card">
        <div class="upload-card__file-picker">
          <ThePicker class="upload-card__card-wrapper" :footerText="`تصویر روی کارت ملی`" />
          <p v-show="showValidation" class="upload-card__text-validation_front">لطفا تصویر روی کارت ملی خود را آپلود
            کنید</p>
          <ThePicker class="upload-card__card-wrapper" :footerText="`تصویر پشت کارت ملی`" />
          <p v-show="showValidation" class="upload-card__text-validation_behind">لطفا تصویر پشت کارت ملی خود را آپلود
            کنید</p>
        </div>

        <div class="upload-card__card-buttons">
          <template v-for="i in buttons" :key="i">
            <base-button :text="i.text" :onClick="i.onClick" :type="i.type" :classBtn="i.class" />
          </template>
        </div>
      </form>
    </section>
  </main>
</template>

<style lang="scss" scoped>
.upload-card {
  @include flexBox($dir: column, $align: center, $justify: flex-start, $gap: 2.63rem);
  width: 100%;
  height: 100vh;
  background: var(--Background, #f7f8fa);

  &__container {
    @include flexBox($dir: column, $align: center, $gap: 2.5rem);
    width: 87.5rem;
    padding: 2.5rem;
    border-radius: 0.75rem;
    background: var(--Surface, #fff);
  }

  &__title {
    @include font($size: 1.25rem, $weight: 700);
    color: var(--Text-Title, #3c4351);
    text-align: center;
  }

  &__line {
    width: 100%;
    height: 0.0625rem;
    background: #e2edff;
  }

  &__form-upload-card {
    @include flexBox($dir: column, $align: center, $gap: 2.5rem);
    width: 100%;
  }

  &__file-picker {
    @include flexBox($dir: row, $align: center, $gap: 2.5rem);
    @include position($pos: relative)
  }

  &__text-validation_front {
    @include position($pos: absolute, $right: 0, $bottom: -1.5rem);
    @include font($size: 0.75rem, $weight: 400);
    color: var(--Fail-fail-500, #EB482B);
    text-align: right;
  }

  &__text-validation_behind {
    @include position($pos: absolute, $left: 7.3rem, $bottom: -1.5rem);
    @include font($size: 0.75rem, $weight: 400);
    color: var(--Fail-fail-500, #EB482B);
    text-align: right;
  }

  &__card-wrapper {
    @include flexBox($dir: column, $align: center);
    width: 20rem;
  }

  &__card-buttons {
    @include flexBox($dir: row-reverse, $align: center, $justify: flex-start, $gap: 1rem);
    width: 100%;
  }

  &__card-buttons_submit {
    outline: none;
    cursor: pointer;
    border: none;
    color: var(--Text-On-Primary, #fff);
    text-align: center;
    @include font($size: 1rem, $weight: 700, $l-h: 1.75rem);
    width: 15.36%;
    height: 3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: var(--Primary-Primary-500, #4152a0);
  }

  &__card-buttons_back {
    outline: none;
    cursor: pointer;
    border: none;
    color: var(--Text-Title, #3c4351);
    text-align: center;
    @include font($size: 1rem, $weight: 700, $l-h: 1.75rem);
    width: 15.36%;
    height: 3rem;
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    background: var(--Primary-Primary-50, #eceef6);
  }
}
</style>
