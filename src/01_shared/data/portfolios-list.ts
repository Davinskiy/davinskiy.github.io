export interface IPortfolio {
  id: number
  title: string
  preview_img: string
  tags: string[]
  links: {
    demo: string
    code: string
  }
}

export const portfolios: IPortfolio[] = [
  {
    id: 1,
    title: 'Легкий wysiwyg редактор',
    preview_img: '/previews/wysiwyg.png',
    tags: ['vue', 'primevue', 'primeflex', 'primeicons', 'jest', 'sass', 'vue-i18n', 'vue-router', 'vuex', 'vuex-persist', 'app'],
    links: {
      demo: 'https://jhasuev.github.io/vue-light-wysiwyg/dist/index.html',
      code: 'https://github.com/jhasuev/vue-light-wysiwyg',
    },
  },
  {
    id: 2,
    title: 'Игра "Судоку"',
    preview_img: '/previews/suduku.png',
    tags: ['vue', 'game'],
    links: {
      demo: 'https://jhasuev.github.io/suduku-game/dist/index.html',
      code: 'https://github.com/jhasuev/suduku-game',
    },
  },
  {
    id: 3,
    title: 'Игра "Бласт"',
    preview_img: '/previews/blast.png',
    tags: ['vue', 'vuex', 'vue-router', 'mitt', 'sass', 'phaser', 'game'],
    links: {
      demo: 'https://jhasuev.github.io/blast/dist/index.html',
      code: 'https://github.com/jhasuev/blast',
    },
  },
  {
    id: 4,
    title: 'Игра "BlackJack"',
    preview_img: '/previews/blackjack.png',
    tags: ['vue', 'sass', 'vuex', 'game'],
    links: {
      demo: 'https://jhasuev.github.io/blackjack/dist/index.html',
      code: 'https://github.com/jhasuev/blackjack',
    },
  },
  {
    id: 5,
    title: 'Игра "Cosmo"',
    preview_img: '/previews/cosmo.png',
    tags: ['game', 'canvas'],
    links: {
      demo: 'https://jhasuev.github.io/cosmo/index.html',
      code: 'https://github.com/jhasuev/cosmo',
    },
  },
  {
    id: 6,
    title: 'Игра "Space Shooter"',
    preview_img: '/previews/space-shooter.png',
    tags: ['game', 'phaser'],
    links: {
      demo: 'https://jhasuev.github.io/space-shooter/index.html',
      code: 'https://github.com/jhasuev/space-shooter',
    },
  },
  {
    id: 7,
    title: 'Игра "Tanks"',
    preview_img: '/previews/tanks-game.png',
    tags: ['game', 'sass', 'webpack-cli', 'canvas'],
    links: {
      demo: 'https://jhasuev.github.io/tanks-game/',
      code: 'https://github.com/jhasuev/tanks-game',
    },
  },
  {
    id: 8,
    title: 'Блог SPA',
    preview_img: '/previews/blog-vue.png',
    tags: ['vue', 'sass', 'vue-router', 'vuex', 'blog', 'app'],
    links: {
      demo: 'https://jhasuev.github.io/blog-vue/dist',
      code: 'https://github.com/jhasuev/blog-vue/',
    },
  },
  {
    id: 9,
    title: 'Телефонна книжка',
    preview_img: '/previews/phonebook-vue.png',
    tags: ['vue', 'vuetify', 'vuex', 'sass', 'app'],
    links: {
      demo: 'https://jhasuev.github.io/phonebook-vue/dist/',
      code: 'https://github.com/jhasuev/phonebook-vue',
    },
  },
  {
    id: 10,
    title: 'Игра Flappy Bird',
    preview_img: '/previews/flappy-bird.png',
    tags: ['game', 'canvas'],
    links: {
      demo: 'https://jhasuev.github.io/flappy-bird/index.html',
      code: 'https://github.com/jhasuev/flappy-bird',
    },
  },
  {
    id: 11,
    title: 'Игра Flappy Bird',
    preview_img: '/previews/weather-react.png',
    tags: ['react', 'react-redux', 'app'],
    links: {
      demo: 'https://jhasuev.github.io/weather-react/build/index.html',
      code: 'https://github.com/jhasuev/weather-react',
    },
  },
]