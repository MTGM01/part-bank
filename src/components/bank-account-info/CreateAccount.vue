<script setup>
import { useRouter } from 'vue-router';

const router = useRouter()
</script>

<template>
    <div class="make-account">
        <img src="/src/assets/icons/make-account.svg" alt="search-icon" />
        <div class="make-account__title">
            برای دسترسی به داشبورد، لطفا ابتدا افتتاح حساب کنید
        </div>
        <button @click="router.push('/create-account')" class="make-account__btn">افتتاح حساب</button>
    </div>
</template>

<style lang="scss" scoped>
.make-account {
    border-radius: 0.75rem;

    &__title {
        color: var(--color-black-500);
        text-align: center;
        @include font(1rem, 600);
        font-style: normal;
    }

    &__btn {
        border-radius: 0.5rem;
        background: var(--color-primary-500);
        padding: 0.5rem 1rem;
        width: 12.5rem;
        height: 3rem;
        color: var(--color-text-on-primary);
        @include font(1rem, 700, 1.75rem);
        font-style: normal;
        border: none;
        cursor: pointer;
    }
}
</style>