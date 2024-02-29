import { defineStore } from 'pinia'

export const useTaskStore = defineStore('task', {
  state: () => ({
    alertVariant: 'success',
    alertMessage: ''
  }),

  actions: {
    updateAlert(message: string, variant: string) {
      this.alertMessage = message
      this.alertVariant = variant
    }
  }
})
