import { exitAccount, getDepositAccountdata, getTransActionsData, toast } from "@/services/api";
import { defineStore } from "pinia";

export const useUserAccountData = defineStore('dashboard', {
    state: () => ({
        id: '',
        firstName: '',
        lastName: '',
        balance: 0,
        cardNumber: '',
        score: null,
        upcomingInstalment: null,
        transactionTable: []
    }),
    actions: {
        async getUserAccount() {
            const userAccountData = await getDepositAccountdata()
            try {
                this.id = userAccountData.data.result.id
                this.firstName = userAccountData.data.result.firstName
                this.lastName = userAccountData.data.result.lastName
                this.balance = userAccountData.data.result.balance
                this.cardNumber = userAccountData.data.result.cardNumber
                this.score = userAccountData.data.result.score
                this.upcomingInstalment = userAccountData.data.result.upcomingInstalment
            } catch (err) {
                return Promise.reject(err)
            }
        },
        async exit(id) {
            const userAccountData = await exitAccount(id)
            try {
                this.$reset()
                toast.success('حذف حساب بانکی با موفقیت انجام شد')
            }
            catch (err) {
                return Promise.reject(err)
            }
        },
        async getTransActionTableData() {
            const userTransactionsAccountData = await getTransActionsData()
            try {
                this.transactionTable = userTransactionsAccountData.data.results
            }
            catch (err) {
                return Promise.reject(err)
            }
        },
    },
})