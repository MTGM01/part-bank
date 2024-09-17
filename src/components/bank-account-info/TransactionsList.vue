<script setup>
import { convertToPersianNumber, determineSrcIcon, determineType, hejriDateAndTime, threeDigitSeprator } from '@/helpers/helper';
import { useUserAccountData } from '@/stores/account-store';
import { computed, ref } from 'vue';

defineProps(['hasAccountData'])

const transactionsListData = useUserAccountData()
const currentPage = ref(1)
const rowsPerPage = ref(5)
const pagesPerGroup = ref(3)

const totalPages = computed(() => {
    return Math.ceil(transactionsListData.$state.transactionTable.length / rowsPerPage.value);
})
const totalPageGroups = computed(() => {
    return Math.ceil(totalPages.value / pagesPerGroup.value);
})
const currentPageGroup = computed(() => {
    return Math.ceil(currentPage.value / pagesPerGroup.value);
})
const visiblePageNumbers = computed(() => {
    const startPage = (currentPageGroup.value - 1) * pagesPerGroup.value + 1;
    const endPage = Math.min(startPage + pagesPerGroup.value - 1, totalPages.value);
    let pages = [];
    for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
    }
    pages.sort((a, b) => b - a)
    return pages;
})
const paginatedTransactions = computed(() => {
    const startIndex = (currentPage.value - 1) * rowsPerPage.value;
    const endIndex = startIndex + rowsPerPage.value;
    return transactionsListData.$state.transactionTable.slice(startIndex, endIndex);
})

const goToPage = (page) => {
    currentPage.value = page;
}
const prevPageGroup = () => {
    if (currentPageGroup.value > 1) {
        currentPage.value = (currentPageGroup.value - 2) * pagesPerGroup.value + 1;
    }
}
const nextPageGroup = () => {
    if (currentPageGroup.value < totalPageGroups.value) {
        currentPage.value = currentPageGroup.value * pagesPerGroup.value + 1;
    }
}
// const numberOfPages = transactionsListData.$state.transactionTable.length / 5
// if (numberOfPages % 1 === 0) {
//     pages.value = numberOfPages
// } else {
//     pages.value = numberOfPages + 1
// }
</script>

<template>
    <section class="transactions-list"
        :class="{ 'transactions-list_no-data': hasAccountData, 'transactions-list_has-data': !hasAccountData }">
        <div class="transactions-list__header-table">
            <div class="transactions-list__title">
                لیست تراکنش ها
                <span class="transactions-list__subtitle">(ریال)</span>
            </div>
            <div class="transactions-list__input input">
                <div class="input__search-input">
                    <div class="input__search-icon">
                        <img src="/src/assets/icons/search.svg" alt="search" />
                    </div>
                    <input type="search" name="search" id="search" class="input__search" placeholder="جست و جو" />
                </div>
                <div class="input__sort-input">
                    <select name="sort" id="sort" class="input__sort">
                        <option value="همه">همه</option>
                    </select>
                    <label for="sort" class="input__sort-label">
                        <img src="/src/assets/icons/double-arrow-opposite.svg" alt="sort-arrow" />
                        مرتب سازی:
                    </label>
                </div>
            </div>
        </div>
        <div class="transactions-list__transactions-container"
            v-if="transactionsListData.$state.transactionTable.length > 0 && transactionsListData.$state.cardNumber">
            <table class="transactions-list__table">
                <thead>
                    <tr>
                        <th>نوع تراکنش</th>
                        <th>تاریخ و ساعت تراکنش</th>
                        <th>مبلغ تراکنش</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(transaction, index) in paginatedTransactions" :key="index">
                        <td>
                            {{ determineType(transaction.type) }}
                            <img :src="determineSrcIcon(transaction.type)" :alt="transaction.type">
                        </td>
                        <td>{{ hejriDateAndTime(transaction.date) }}</td>
                        <td>{{ convertToPersianNumber(threeDigitSeprator(transaction.amount)) }}</td>
                    </tr>
                </tbody>
            </table>

            <ul class="pagination">
                <li class="pageNum" @click="nextPageGroup" :disabled="currentPageGroup === totalPageGroups">
                    &#60;
                </li>
                <li class="pageNum" v-for="page in visiblePageNumbers" :key="page" @click="goToPage(page)">
                    {{ page }}
                </li>
                <!-- <li class="pageNum">
                    1
                </li>
                <li class="pageNum">
                    2
                </li>
                <li class="pageNum">
                    3
                </li> -->
                <li class="pageNum" @click="prevPageGroup" :disabled="currentPageGroup === 1">
                    &#62;
                </li>
            </ul>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.pagination {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 8px;
    padding: 0;
    list-style-type: none;
}

.pageNum {
    width: 40px;
    height: 40px;
    color: #8999B9;
    text-align: center;
    display: flex;
    align-items: center;
    cursor: pointer;
    justify-content: center;
    background-color: #F9FAFB;
    border-radius: 8px;
}









.transactions-list {
    border-radius: 0.75rem;
    background-color: var(--color-surface);
    padding: 1.5rem 1.5rem 1rem 1.5rem;

    &_has-data {
        opacity: 1;
    }

    &_no-data {
        opacity: 0.15;
    }

    &__title {
        color: var(--color-black-500);
        text-align: right;
        @include font(1.25rem, 700);
        font-style: normal;
    }

    &__subtitle {
        color: var(--color-text-gray);
        text-align: right;
        @include font(1rem, 400);
    }

    &__header-table {
        @include flexBox($dir: row, $align: flex-start, $justify: space-between);
        width: 100%;
    }

    &__transactions-container {
        @include flexBox($dir: column, $align: center, $justify: space-between);
        width: 100%;
        height: 100%;
    }

    &__table {
        border-collapse: collapse;
        border-spacing: 0;
        table-layout: auto;
        width: 100%;
    }

    &__table thead {
        background-color: rgb(53, 53, 101);
        color: white;
    }

    &__table th {
        background-color: inherit;
        color: inherit;
    }

    &__table tbody tr td:first-child {
        @include flexBox($dir: row-reverse, $align: center, $justify: center);
        width: 100%;
    }

    &__table td {
        padding: 0.625rem;
        text-align: center;
    }

    &__table tbody tr:nth-child(even) {
        background-color: #f9fafb;
    }

    &__table th {
        @include font($size: 1rem, $weight: 600);
        padding: 0.625rem 6.25rem;
        color: #fff;
        text-align: center;
    }

    &__table th:nth-child(1) {
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
    }

    &__table th:nth-last-child(1) {
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
    }
}

.input {
    @include flexBox($dir: row-reverse,
        $align: flex-start,
        $justify: flex-start,
        $gap: 0.75rem);

    &__search {
        width: 16.0625rem;
        height: 2.125rem;
        border-radius: 0.5rem;
        border: 1px solid var(--Line, #e2edff);
        background: var(--color-surface);
        padding: 0 0.5rem;
    }

    &__sort {
        width: 11.4375rem;
        height: 2.125rem;
        border-radius: 0.5rem;
        border: 1px solid var(--Line, #e2edff);
        background: var(--color-surface);
    }

    &__search-icon {
        border-radius: 0.4375rem 0 0 0.4375rem;
        background: var(--color-primary-50);
        @include flexBox($dir: row, $align: center, $justify: center);
        @include position($pos: absolute, $top: 0, $left: 0);
        width: 2.0625rem;
        height: 100%;
    }

    &__search-input {
        @include position($pos: relative);
        @include flexBox();
    }

    &__sort-label {
        color: var(--color-text-gray);
        @include font(0.875rem, 400);
        font-style: normal;
    }

    &__sort-input {
        @include flexBox($dir: row-reverse,
            $align: center,
            $justify: center,
            $gap: 0.5rem);
    }
}
</style>