import { defineStore } from 'pinia'

export const useAccountDepositCreationStore = defineStore('accountDepositCreationData', {
  state: () => ({
    firstName: '',
    lastName: '',
    postalCode: '',
    address: '',
    isLoading: false
  }),
  actions: {
    setData({ firstName, lastName, postalCode, address }) {
      this.firstName = firstName
      this.lastName = lastName
      this.postalCode = postalCode
      this.address = address
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'accountDepositCreationData',
        storage: localStorage
      }
    ]
  }
})