<script setup>
import { reactive } from 'vue'
import { useAccountDepositCreationStore } from '@/stores/account-deposit'
import { postAccountDepositData } from '@/services/account-deposit-api'
import { useRouter } from 'vue-router'

const accountDepositCreation = useAccountDepositCreationStore()
const router = useRouter()
const userData = {
  firstName: accountDepositCreation.$state.firstName,
  lastName: accountDepositCreation.$state.lastName,
  postalCode: accountDepositCreation.$state.postalCode,
  address: accountDepositCreation.$state.address
}
const depositAccountHandler = async () => {
  accountDepositCreation.$state.isLoading = true
  buttons[1].isLoading = accountDepositCreation.$state.isLoading
  buttons.forEach(btn => btn.disable = true)
  const res = await postAccountDepositData(userData)
  // if (res.data.status === 'success') {
  //   router.push('/')
  // }
  accountDepositCreation.$state.isLoading = false
  buttons[1].isLoading = accountDepositCreation.$state.isLoading
  buttons.forEach(btn => btn.disable = false)
  router.push('/')
}
const buttons = reactive([
  {
    isLoading: false,
    disable: false,
    text: 'قبلی',
    class: 'button_black',
    onClick: () => {
      router.push('/create-account/upload-national-card')
    }
  },
  {
    isLoading: accountDepositCreation.$state.isLoading,
    disable: false,
    text: 'افتتاح حساب',
    onClick: depositAccountHandler
  }
])
</script>

<template>
  <section id="confirm-user-data" class="deposit-creation__step-template step-template">
    <h1 class="step-template__title">تایید اطلاعات</h1>
    <hr color="#E2EDFF" />
    <section class="step-template__user-info">
      <div class="step-template__item">
        <p class="step-template__field">نام:</p>
        <p class="step-template__field-value" id="user-first-name">{{ userData.firstName }}</p>
      </div>
      <div class="step-template__item">
        <p class="step-template__field">نام خانوادگی:</p>
        <p class="step-template__field-value" id="user-last-name">{{ userData.lastName }}</p>
      </div>
      <div class="step-template__item">
        <p class="step-template__field">کد پستی:</p>
        <p class="step-template__field-value" id="user-postal-code">{{ userData.postalCode }}</p>
      </div>
      <div class="step-template__item step-template__item_full-width">
        <p class="step-template__field">محل سکونت:</p>
        <p class="step-template__field-value" id="user-address">{{ userData.address }}</p>
      </div>
    </section>
    <section class="step-template__buttons">
      <template v-for="(button, i) in buttons" :key="i">
        <base-button :disable="button.disable" :text="button.text" :classBtn="button.class" :onClick="button.onClick"
          :isLoading="button.isLoading" />
      </template>
    </section>
  </section>
</template>

<style lang="scss">
.step-template {
  background-color: #fff;
  border-radius: 0.75rem;
  @include flexBox($dir: column, $align: flex-start, $gap: 2.5rem);

  &__title {
    color: var(--color-Title, #3c4351);
    text-align: center;
    width: 100%;

    @include font($size: 1.25rem, $weight: 700);
  }

  &__user-info,
  &__user-inputs {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
  }

  &__user-info {
    gap: 2.5rem 7.5rem;
  }

  &__user-inputs {
    gap: 2.5rem 2rem;
  }

  &__field {
    color: var(--color-text-gray);
    @include font($size: 0.875rem, $weight: 400);

    padding-bottom: 4px;
  }

  &__field-value {
    color: var(--color-black-500, #3c4351);
    @include font($size: 1rem, $weight: 600);
  }

  &__buttons {
    @include flexBox($gap: 2rem);
    align-self: self-end;
  }

  &__button {
    height: 3rem;
    padding: 0.5rem 1rem;
    width: 13rem;
    border: none;

    &_black {
      background: var(--color-primary-50, #eceef6) !important;
      color: var(--color-black-500, #3c4351) !important;
    }
  }

  &__item,
  &__input-container {
    @include flexBox($dir: column, $align: stretch, $gap: 0.5rem);

    &_full-width {
      flex-basis: 100%;
    }
  }

  &__input-container {
    flex-grow: 1;
  }
}

.input-container {
  @include flexBox($dir: column, $align: stretch, $gap: 0.5rem);

  &_full-width {
    flex-basis: 100%;
  }

  &__textarea {
    resize: none;
    border-radius: 0.375rem;
    border: 2px solid var(--color-black-50, #ececee);
    background: var(--color-surface-Lightblue, #f9fafb);
    padding: 1rem 0.5rem;

    &:focus-visible,
    &:focus {
      border: 2px solid var(--color-Primary-200, #a8afd3);
      background: var(--color-surface-Lightblue, #f9fafb);
      outline: none;
    }

    &::placeholder {
      padding: 0 0.5rem;
      color: var(--color-black-100, #c3c5c9);
      text-align: right;
      @include font($size: 0.875rem, $weight: 400);
    }
  }
}
</style>
