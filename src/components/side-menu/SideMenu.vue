<script setup>
import { convertToPersianNumber } from '@/helpers/helper'
import ListItem from './ListItem.vue'
import { useLoginAPIStore } from '@/stores/login-data'
import { logoutUser } from '@/services/logout-api.js'

const loginData = useLoginAPIStore()

const exitDashboardHandler = () => {
  logoutUser()
  loginData.resetUserData()
}
const listItems = [
  {
    id: 1,
    text: 'داشبورد',
    iconUrl: '/src/assets/icons/dashboard.svg'
  },
  {
    id: 2,
    text: 'حساب',
    iconUrl: '/src/assets/icons/account.svg'
  },
  {
    id: 3,
    text: 'تسهیلات',
    iconUrl: '/src/assets/icons/facility.svg'
  },
  {
    id: 4,
    text: 'عملیات کارت',
    iconUrl: '/src/assets/icons/card-operation.svg'
  },
  {
    id: 5,
    text: 'سفته الکتریک',
    iconUrl: '/src/assets/icons/demand-note.svg'
  },
  {
    id: 6,
    text: 'خدمات',
    iconUrl: '/src/assets/icons/services.svg'
  },
  {
    id: 7,
    text: 'خروج',
    iconUrl: '/src/assets/icons/logout.svg',
    onClick: exitDashboardHandler
  }
]
</script>

<template>
  <aside class="side-menu">
    <div class="side-menu__user-info">
      <span class="side-menu__account-name">{{ loginData.$state.firstName }} {{ loginData.$state.lastName }}</span>
      <div class="side-menu__id-number">
        <span class="side-menu__national-code">کد ملی:</span>
        <span class="side-menu__numder">{{
          convertToPersianNumber(loginData.$state.idNumber)
        }}</span>
      </div>
    </div>
    <div class="side-menu__line"></div>
    <div class="side-menu__options">
      <ListItem v-for="(item, i) in listItems" :key="item.id" :text="item.text" :iconUrl="item.iconUrl"
        :onClick="item.onClick" class="side-menu__option" :class="{
          'side-menu__option_exit': i === listItems.length - 1,
          'side-menu__option_active': i === 0
        }" />
    </div>
  </aside>
</template>

<style lang="scss" scoped>
.side-menu {
  @include flexBox($dir: column, $align: flex-start, $gap: 1.25rem);
  background-color: var(--color-surface);
  border-radius: 0.75rem;

  &__user-info {
    @include flexBox($dir: column, $align: center, $gap: 2.5rem);
    width: 100%;
    padding: 2.38rem 1.5rem 0 1.5rem;
  }

  &__account-name {
    color: var(--color-black-500);
    text-align: center;
    @include font(18px, 700, 28px);
  }

  &__id-number {
    @include flexBox($dir: row, $align: flex-start, $justify: space-between);
    width: 100%;
  }

  &__national-code {
    color: var(--color-text-gray);
    text-align: right;
    @include font(12px, 400);
  }

  &__line {
    width: 85%;
    height: 1px;
    align-self: center;
    background-color: #e2edff;
  }

  &__number {
    color: var(--color-black-500);
    text-align: right;
    @include font(14px, 600);
  }

  &__options {
    @include flexBox($dir: column, $align: flex-start, $justify: flex-start, $gap: 0.8rem);
    width: 100%;
    padding: 0 0.5rem;
  }

  &__option {
    @include flexBox($dir: row-reverse, $align: flex-start, $justify: flex-end, $gap: 8px);
    color: var(--color-text-gray);
    padding: 0.5rem 1rem 0.5rem 0.75rem;
    text-align: center;
    @include font(14px, 400);
    cursor: pointer;

    &:hover {
      border-radius: 0.75rem;
      background-color: var(--Surface-lightblue, #f9fafb);
      color: var(--color-primary-500);
      padding: 0.5rem 1rem 0.5rem 0.75rem;
      transition: all 200ms ease-in-out;
    }

    &_active {
      border-radius: 0.75rem;
      background-color: var(--Surface-lightblue, #f9fafb);
      color: var(--color-primary-500);
    }

    &_exit {
      color: var(--color-fail-500);

      &:hover {
        border-radius: 0.75rem;
        background-color: var(--Surface-lightblue, #f9fafb);
        color: var(--color-fail-500);
        padding: 0.5rem 1rem 0.5rem 0.75rem;
        transition: all 200ms ease-in-out;
      }
    }
  }
}
</style>
