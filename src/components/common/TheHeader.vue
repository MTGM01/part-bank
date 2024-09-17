<script setup>
import { convertToPersianNumber } from '@/helpers/helper';
import { useLoginAPIStore } from '@/stores/login-data';

const loginData = useLoginAPIStore()
</script>

<template>
  <header class="header-container">
    <nav class="header-container__navbar-container">
      <div class="header-container__profile-container">
        <img src="../../assets/icons/notification-bell.svg" class="header-container__notification"
          alt="notification bell" />
        <div class="header-container__user-profile">
          <div class="header-container__user-image-container">
            <img src="../../assets/images/user-profile.png" class="header-container__user-image"
              alt="user-image-profile" title="user image profile" />
          </div>
          <span class="header-container__user-phone">{{ convertToPersianNumber(loginData.$state.phoneNumber) }}</span>
          <img src="../../assets/icons/menu-arrow-down.svg" alt="user menu arrow down"
            class="header-container__user-arrow" />
        </div>
      </div>

      <div class="header-container__title-logo">
        <img src="../../assets/icons/logo-small.svg" class="header-container__logo" alt="part bank logo" />
        <span class="header-container__title">پارت بانک</span>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header-container {
  background: var(--color-surface);
  box-shadow: 0px 2px 8px 0px rgba(21, 0, 43, 0.05);
  width: 100%;
  padding: 1.19rem 2.5rem;

  &__navbar-container {
    @include flexBox($dir: row-reverse,
      $align: center,
      $justify: space-between);
  }

  &__profile-container {
    @include flexBox($dir: row, $align: center, $gap: 1rem);
  }

  &__user-profile {
    @include flexBox($dir: row, $align: center, $gap: 0.5rem);
    color: var(--color-black-500, #3c4351);
    @include font($size: 0.875rem, $weight: 400);
  }

  &__user-image-container {
    @include flexBox($dir: row, $align: center, $justify: center);
    width: 2.5625rem;
    height: 2.5625rem;
    overflow: hidden;
    border-radius: 50%;
  }

  &__user-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title-logo {
    @include flexBox($dir: row, $align: center, $gap: 0.75rem);
  }

  &__title {
    color: var(--color-black-500);
    @include font(1rem, 400);
    text-align: right;
    font-style: normal;
  }
}
</style>
