export interface IPortfolio {
  title: string
  preview_img: string
  tags: string[]
}

export const portfolios: IPortfolio[] = [
  {
    title: 'Calculator',
    preview_img: '',
    tags: ['vue', 'primevue'],
  },
  {
    title: 'Todo',
    preview_img: '',
    tags: ['nuxt', 'primevue', 'php'],
  },
]