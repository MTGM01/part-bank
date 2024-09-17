<script setup>
import AccountCard from './AccountCard.vue'
import AccountLoanInfo from './AccountLoanInfo.vue'
import TransactionsList from './TransactionsList.vue'
import CreateAccount from './CreateAccount.vue'
import { useUserAccountData } from '@/stores/account-store'
import { computed } from 'vue'
import { convertToPersianNumber, threeDigitSeprator, turnMiladiToPersian } from '@/helpers/helper'

const loanData = useUserAccountData()
const scoreAmount = computed(() => {
  const sepratedNumber = threeDigitSeprator(loanData?.$state?.score?.amount)
  return convertToPersianNumber(sepratedNumber)
})
const upcomingInstalmentAmount = computed(() => {
  const sepratedNumber = threeDigitSeprator(loanData?.$state?.upcomingInstalment?.amount)
  return convertToPersianNumber(sepratedNumber)
})
const hasAccountData = computed(() => {
  if (loanData.$state.score || loanData.$state.cardNumber) {
    return false
  } else {
    return true
  }
})
</script>

<template>
  <article class="account">
    <section class="account__info account-info"
      :class="{ 'account-info_no-data': hasAccountData, 'account-info_has-data': !hasAccountData }">
      <AccountCard class="account-info__bank-card" />

      <AccountLoanInfo class="account-info__account-point" :headerText="`امتیاز حساب`" :buttonText="`محاسبه امتیاز`">
        <template #detail>
          <img class="account-point__point-info" src="/src/assets/icons/info-circle.svg" alt="info-circle"
            title="info" />
        </template>
        <template #account-detail>
          <div class="account-info__amount-point">
            <div class="account-info__account-amount">
              <span>{{ loanData?.$state?.score?.amount ? scoreAmount : 0 }}</span>
              <span class="account-info__unit-amount">ریال</span>
            </div>
            <div class="account-info__duration-number">
              <span>{{
                loanData?.$state?.score?.paymentPeriod
                  ? convertToPersianNumber(loanData?.$state?.score?.paymentPeriod)
                  : 0
              }}</span>
              <span class="account-info__duration-text">ماهه</span>
            </div>
          </div>
        </template>
      </AccountLoanInfo>

      <AccountLoanInfo class="account-info__account-bill" :headerText="`قسط پیش رو`" :buttonText="`پرداخت`">
        <template #detail>
          <div class="account-info__detail">
            <span class="account-info__detail-text">جزئیات</span>
            <img class="account-info__point-info" src="/src/assets/icons/angle-left.svg" alt="info-circle"
              title="info" />
          </div>
        </template>
        <template #account-detail>
          <div class="account-info__bill-amount">
            <div class="account-info__bill">
              <span class="account-info__bill-text">مبلغ تست:</span>
              <span class="account-info__bill-number">{{
                loanData?.$state?.upcomingInstalment?.amount ? upcomingInstalmentAmount : 0
              }}</span>
            </div>
            <div class="account-info__bill">
              <span class="account-info__bill-text">تاریخ سررسید:</span>
              <span class="account-info__bill-number" id="due-date">
                {{
                  loanData?.$state?.upcomingInstalment?.dueDate
                    ? turnMiladiToPersian(loanData?.$state?.upcomingInstalment?.dueDate)
                    : '-'
                }}
              </span>
            </div>
          </div>
        </template>
        <template #arrow>
          <img src="/src/assets/icons/arrow-left.svg" alt="arrow-left" />
        </template>
      </AccountLoanInfo>
    </section>

    <TransactionsList class="account__transactions-list" :hasAccountData="hasAccountData" />

    <CreateAccount v-show="!(loanData.$state.score || loanData.$state.cardNumber)" class="account__make-account" />
  </article>
</template>

<style lang="scss" scoped>
.account {
  border-radius: 0.75rem;

  &__make-account {
    @include flexBox($dir: column, $align: center, $gap: 1.25rem);
    @include position($pos: absolute, $top: 25.2rem, $right: 57rem, $z: 10);
  }

  &__transactions-list {
    @include flexBox($dir: column, $align: center, $gap: 1.5rem);
    width: 100%;
    height: 32.5rem;
  }

  &__info {
    width: 100%;
  }
}

.account-info {
  @include flexBox($dir: row, $align: flex-start, $gap: 1rem);
  opacity: 1;

  &_no-data {
    opacity: 0.15;
  }

  &__bank-card {
    @include flexBox($dir: column, $align: center, $justify: space-between);
    @include position($pos: relative);
    width: 28.5rem;
    height: 16.25rem;
    background-color: rgb(190, 118, 24);
  }

  &__account-point {
    @include flexBox($dir: column, $align: flex-start, $justify: center, $gap: 1.75rem);
    width: 21.125rem;
    height: 16.25rem;
  }

  &__account-bill {
    @include flexBox($dir: column, $align: center, $justify: space-between);
    width: 21.125rem;
    height: 16.25rem;
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: var(--color-surface);
  }

  &__amount-point {
    @include flexBox($dir: column, $align: center, $justify: flex-start, $gap: 0.25rem);
    width: 100%;
  }

  &__account-amount {
    @include flexBox($dir: row, $align: center, $gap: 0.25rem);
    color: var(--color-primary-500);
    text-align: right;
    @include font($size: 2.5rem, $weight: 700);
  }

  &__unit-amount {
    color: var(--color-text-gray);
    text-align: right;
    @include font($size: 0.875rem, $weight: 400);
  }

  &__duration-number {
    @include flexBox($dir: row, $align: center, $gap: 0.25rem);
    color: var(--color-primary-500);
    text-align: right;
    @include font($size: 1.125rem, $weight: 700, $l-h: 1.75rem);
  }

  &__duration-text {
    color: var(--color-text-gray);
    text-align: right;
    @include font(0.875rem, 400);
  }

  &__account-bill {
    @include flexBox($dir: column, $align: center, $justify: space-between);
    width: 21.125rem;
    height: 16.25rem;
    padding: 1.5rem;
    border-radius: 0.75rem;
    background: var(--color-surface);
  }

  &__detail {
    @include flexBox($dir: row, $align: center, $justify: flex-start, $gap: 0.25rem);
  }

  &__detail-text {
    color: var(--color-text-gray);
    text-align: center;
    @include font(0.875rem, 400);
  }

  &__bill-amount {
    @include flexBox($dir: column, $align: center, $justify: center, $gap: 0.75rem);
    width: 100%;
  }

  &__bill-amount-pay {
    @include flexBox($dir: column, $align: center, $justify: flex-start, $gap: 1.25rem);
    width: 100%;
  }

  &__bill {
    @include flexBox($dir: row, $align: center, $justify: space-between);
    width: 100%;
  }

  &__bill-text {
    color: var(--color-text-gray);
    text-align: right;
    @include font(0.875rem, 400);
  }

  &__bill-number {
    direction: ltr;
    color: var(--color-black-500);
    text-align: right;
    @include font(0.875rem, 600);
  }
}
</style>
