<script setup>
import { accountCreationDepositSchema } from '@/libs/input-rules'
import { reactive } from 'vue'
import { useAccountDepositCreationStore } from '@/stores/account-deposit.js'
import { useRouter } from 'vue-router'

const router = useRouter()

const accountDepositCreationStore = useAccountDepositCreationStore()

defineProps({
  title: {
    type: String,
    required: true
  }
})

const inputs = reactive([
  {
    type: 'text',
    id: 'first-name',
    label: 'نام',
    name: 'firstName',
    placeHolder: 'نام فارسی',
    border: '1px solid var(--color-black-50, #ECECEE)',
    labelColor: 'var(--color-text-gray)',
    elementClass: 'step-template__input-container input-field',
    defaultValue: accountDepositCreationStore.$state.firstName
  },
  {
    type: 'text',
    id: 'last-name',
    label: 'نام خانوادگی',
    name: 'lastName',
    placeHolder: 'نام خانوادگی به صورت کامل',
    border: '1px solid var(--color-black-50, #ECECEE)',
    labelColor: 'var(--color-text-gray)',
    elementClass: 'step-template__input-container input-field',
    defaultValue: accountDepositCreationStore.$state.lastName
  },
  {
    type: 'number',
    label: 'کد پستی',
    id: 'postal-code',
    name: 'postalCode',
    placeHolder: 'کد پستی',
    border: '1px solid var(--color-black-50, #ECECEE)',
    labelColor: 'var(--color-text-gray)',
    elementClass: 'step-template__input-container input-field',
    defaultValue: accountDepositCreationStore.$state.postalCode
  },
  {
    as: 'textarea',
    label: 'محل سکونت',
    id: 'address',
    name: 'address',
    placeHolder: 'آدرس محل سکونت خود را وارد کنید',
    border: '1px solid var(--color-black-50, #ECECEE)',
    labelColor: 'var(--color-text-gray)',
    row: 3,
    elementClass:
      'step-template__input-container input-container step-template__input-container_full-width',
    defaultValue: accountDepositCreationStore.$state.address
  }
])
const buttons = reactive([
  {
    disable: false,
    text: 'قبلی',
    class: 'button_black',
    onClick: () => {
      router.push('/')
    }
  },
  {
    disable: false,
    text: 'ثبت و ادامه',
    type: 'submit'
  }
])
</script>
<template>
  <base-form
    :inputs="inputs"
    :buttons="buttons"
    :validation="accountCreationDepositSchema"
    class="deposit-creation__step-template step-template"
    :onSubmit="
      (data) => {
        accountDepositCreationStore.setData(data)
        router.push('/create-account/upload-national-card')
      }
    "
    layoutClass="account-creation-layout"
    mainClass=""
  >
    <template #title>
      <h1 class="step-template__title">{{ title }}</h1>
      <hr color="#E2EDFF" />
    </template>
  </base-form>
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
