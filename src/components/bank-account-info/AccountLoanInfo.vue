<script setup>
defineProps({
    headerText: {
        type: String
    },
    buttonText: {
        type: String
    }
})
</script>

<template>
    <div class="account-point">
        <div class="account-point__point">
            <span class="account-point__point-text">{{ headerText }}</span>
            <slot name="detail"></slot>
        </div>
        <slot name="account-detail"></slot>
        <button class="account-point__pay-bill">
            {{ buttonText }}
            <slot name="arrow"></slot>
        </button>
    </div>
</template>

<style lang="scss" scoped>
.account-point {
    padding: 1.5rem;
    border-radius: 0.75rem;
    background-color: var(--color-surface);

    &__point {
        @include flexBox($dir: row, $align: center, $justify: space-between);
        width: 100%;
    }

    &__point-text {
        color: var(--color-black-500);
        text-align: right;
        @include font(1.25rem, 700);
    }

    &__pay-bill {
        @include flexBox($dir: row,
            $align: center,
            $justify: center,
            $gap: 0.75rem);
        border: none;
        outline: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        width: 100%;
        background-color: var(--color-primary-50);
        color: var(--color-black-500);
        text-align: center;
        @include font(1rem, 700, 1.75rem);
    }
}
</style>