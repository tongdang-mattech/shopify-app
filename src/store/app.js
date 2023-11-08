import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    // name of step is the route name
    nextStepAble: {
        pickLocation: false,
        home: false
    },

    selectedLocations: []
  }),
  getters: {
    getNextStep: (state) => {
        return (step) => {
            const steps = Object.keys(state.nextStepAble)
            const idx = steps.indexOf(step)
            if (idx < 0 || idx > steps.length - 1) {
                return null
            }
    
            return steps[idx + 1]
        }
    }
  },
  actions: {}
})
