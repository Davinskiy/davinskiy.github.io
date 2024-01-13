import { defineStore } from 'pinia'
import { portfolios } from '@/01_shared/data/portfolios-list'
import { type IPortfolio } from '@/01_shared/data/portfolios-list'

interface State {
  portfolios: IPortfolio[]
  selectedTags: string[]
}

export const storeApp = defineStore('app', {
  state: (): State => ({
    portfolios,
    selectedTags: [],
  }),
  getters: {
    getAllTags() {
      const tags: any = new Set(this.portfolios.map((p) => p.tags).flat())

      return [...tags]
    }
  },
  actions: {
    isTagChecked(tag: string) {
      return this.selectedTags.includes(tag)
    },

    toggleTag(tag: string) {
      if (this.isTagChecked(tag)) {
        this.selectedTags = this.selectedTags.filter((_tag: string) => _tag != tag)
      } else {
        this.selectedTags.push(tag)
      }
    },
  }
})
