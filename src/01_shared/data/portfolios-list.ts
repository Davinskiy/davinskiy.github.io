export interface IPortfolio {
  id: number
  title: string
  preview_img: string
  tags: string[]
}

export const portfolios: IPortfolio[] = [
  {
    id: 1,
    title: 'Calculator',
    preview_img: 'https://picsum.photos/200/200',
    tags: ['vue', 'primevue'],
  },
  {
    id: 2,
    title: 'Todo',
    preview_img: 'https://picsum.photos/200/150',
    tags: ['nuxt', 'primevue', 'php'],
  },
  {
    id: 3,
    title: 'Calculator react',
    preview_img: 'https://picsum.photos/200/200',
    tags: ['react'],
  },
  {
    id: 4,
    title: 'Todo',
    preview_img: 'https://picsum.photos/200/100',
    tags: ['react', 'html', 'php', 'vue'],
  },
]