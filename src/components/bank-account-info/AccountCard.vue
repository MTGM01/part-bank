<script setup>
import { convertToPersianNumber, threeDigitSeprator } from '@/helpers/helper';
import { useUserAccountData } from '@/stores/account-store';
import { computed, ref } from 'vue';

const openMenu = ref(null)
const isOpen = ref(false)
const bankCardData = useUserAccountData()
const balance = computed(() => {
    const sepratedNumber = threeDigitSeprator(bankCardData.$state.balance ? bankCardData.$state.balance : 0)
    return convertToPersianNumber(sepratedNumber)
})
const openMenuHandler = () => {
    if (!isOpen.value) {
        openMenu.value.style.display = 'flex'
        isOpen.value = true
    } else {
        openMenu.value.style.display = 'none'
        isOpen.value = false
    }
}

const accountStore = useUserAccountData()
const exitAccountHandler = () => {
    accountStore.exit(accountStore.$state.id)
}
// const cardNumber = computed(() => {
//     return bankCardData.$state.cardNumber.split('').reverse().join('')
// })
</script>

<template>
    <div class="bank-card">
        <div class="bank-card__inventory">
            <div class="bank-card__amount">
                <span class="bank-card__text-amount"> موجودی کل </span>
                <span class="bank-card__number-amount"> {{ balance }} </span>
            </div>
            <img @click="openMenuHandler" src="/src/assets/icons/card-more-dot.svg" alt="card more icon"
                class="bank-card__show-option" />
            <div ref="openMenu" class="bank-card__menu" v-if="bankCardData.$state.balance">
                <div class="bank-card__change-account">
                    <img src="/src/assets/icons/change-account.svg" class="bank-card__change-account"
                        alt="change-account" />
                    <span class="bank-card_text">
                        تغییر حساب متصل
                    </span>
                </div>
                <div class="bank-card__line"></div>
                <div @click="exitAccountHandler" class="bank-card__delete-account">
                    <img src="/src/assets//icons/delete-account.svg" class="bank-card__delete-account"
                        alt="delete-account" />
                    <span class="bank-card__delete-account_text">
                        حذف حساب بانکی
                    </span>
                </div>
            </div>
        </div>

        <div class="bank-card__card-number" v-if="bankCardData.$state.cardNumber">
            <span class="bank-card__digits">
                {{ convertToPersianNumber(bankCardData.$state.cardNumber.slice(0, 4)) }}
            </span>
            <span class="bank-card__digits">
                {{ convertToPersianNumber(bankCardData.$state.cardNumber.slice(4, 8)) }}
            </span>
            <span class="bank-card__digits">
                {{ convertToPersianNumber(bankCardData.$state.cardNumber.slice(8, 12)) }}
            </span>
            <span class="bank-card__digits">
                {{ convertToPersianNumber(bankCardData.$state.cardNumber.slice(12, 16)) }}
            </span>
        </div>

        <img src="/src/assets/images/Pattern.png" alt="pattern" class="bank-card__pattern" />
        <img src="/src/assets/images/Noise.png" alt="noise" class="bank-card__noise" />
    </div>
</template>

<style lang="scss" scoped>
.bank-card {
    border-radius: 0.75rem;
    padding: 2.25rem 1.5rem 2rem 2.25rem;
    background: linear-gradient(112deg, #4152a0 0%, #d0c9c1 100%, #d0c9c1 100%);

    &__show-option {
        cursor: pointer;
        z-index: 3;
    }

    &__menu {
        display: none;
        position: absolute;
        z-index: 3;
        top: 4.375rem;
        right: 1.875rem;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
        box-sizing: border-box;
        animation-name: menu-option-card;
        animation-timing-function: linear;
        animation-duration: 300ms;
        animation-iteration-count: 1;
        background-color: var(--color-text-on-primary);
        border-radius: 0.75rem;
        padding: 0.75rem;
    }

    &__delete-account,
    &__change-account {
        @include flexBox($dir: row, $align: flex-start, $gap: 0.5rem);
        cursor: pointer;
    }

    &__delete-account {
        &_text {
            @include font($size: 0.875rem, $weight: 400, $l-h: 1.25rem);
            text-align: right;
            color: #eb482b;
        }
    }

    &__change-account {
        &_text {
            @include font($size: 0.875rem, $weight: 400, $l-h: 1.25rem);
            text-align: right;
            color: #c3c5c9;
        }
    }

    &__line {
        width: 10.1875rem;
        height: 0.0625rem;
        padding: 0;
        background: #e2edff;
    }

    @keyframes menu-option-card {
        0% {
            transform: scale(10%);
        }

        10% {
            transform: scale(20%);
        }

        20% {
            transform: scale(30%);
        }

        30% {
            transform: scale(40%);
        }

        40% {
            transform: scale(50%);
        }

        50% {
            transform: scale(60%);
        }

        60% {
            transform: scale(70%);
        }

        70% {
            transform: scale(80%);
        }

        80% {
            transform: scale(90%);
        }

        90% {
            transform: scale(100%);
        }

        100% {
            transform: scale(110%);
        }
    }

    &__card-number {
        @include flexBox($dir: row, $align: center, $gap: 2rem);
        z-index: 3;
    }

    &__digits {
        color: #fff;
        @include font($size: 2.25rem, $weight: 600);
    }

    &__inventory {
        @include flexBox($dir: row-reverse,
            $align: flex-start,
            $justify: space-between);
        width: 100%;
    }

    &__amount {
        @include flexBox($dir: column,
            $align: flex-end,
            $justify: center,
            $gap: 0.625rem);
        color: var(--color-text-on-primary);
    }

    &__text-amount {
        color: inherit;
        @include font($size: 1rem, $weight: 600);
    }

    &__number-amount {
        color: inherit;
        @include font($size: 2.5rem, $weight: 600);
    }

    &__digits {
        color: var(--color-text-on-primary);
        @include font(36px, 400);
    }

    &__pattern {
        @include position($pos: absolute, $top: 0, $z: 1);
        object-fit: cover;
        width: 100%;
        height: 100%;
    }

    &__noise {
        @include position($pos: absolute, $top: 0, $left: 0, $z: 2);
        object-fit: cover;
        width: 100%;
        height: 100%;
        border-radius: inherit;
    }
}
</style>