<script setup>
import SideMenu from '@/components/side-menu/SideMenu.vue';
import AccountInfo from '@/components/bank-account-info/AccountInfo.vue';
import { useUserAccountData } from '@/stores/account-store';
import { onBeforeMount } from 'vue';
import TheHeader from '@/components/common/TheHeader.vue';

const userAccountData = useUserAccountData()

onBeforeMount(() => {
    userAccountData.getUserAccount()
    userAccountData.getTransActionTableData()
})
</script>

<template>
    <main class="dashboard">
        <TheHeader class="dashboard__header" />
        <section class="dashboard__container">
            <SideMenu class="dashboard__side-menu" />
            <AccountInfo class="dashboard__account" />
        </section>
    </main>
</template>

<style lang="scss" scoped>
.dashboard {
    @include flexBox($dir: column,
        $align: flex-start,
        $justify: flex-start,
        $gap: 2.5rem);
    width: 100%;
    height: 100vh;
    background: var(--Background, #f7f8fa);

    &__header {
        width: 100%;
        padding: 1.19rem 2.5rem;
    }

    &__container {
        @include flexBox($dir: row, $justify: center, $gap: 1rem);
        width: 100%;
    }

    &__side-menu {
        width: 13.75rem;
        height: 40.25rem;
    }

    &__account {
        @include flexBox($dir: column, $align: flex-start, $gap: 1.5rem);
        width: 72.75rem;
        height: 40.25rem;
    }
}
</style>