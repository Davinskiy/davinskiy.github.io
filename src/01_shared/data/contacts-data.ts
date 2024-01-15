export interface ILinkItem {
  img: string
  href: string
  label: string
}

export interface IContactsDataItem {
  caption: string
  links: ILinkItem[]
}

export const contactsData: IContactsDataItem[] = [
  {
    caption: 'Соц. сети',
    links: [
      {
        img: 'vk.svg',
        href: 'https://vk.com/jhasuev',
        label: 'vk.com/jhasuev',
      },
      {
        img: 'instagram.svg',
        href: 'https://www.instagram.com/jhasuev',
        label: 'instagram.com/jhasuev',
      },
    ],
  },
  {
    caption: 'Мессенджеры',
    links: [
      {
        img: 'whatsapp.svg',
        href: 'whatsapp://send?phone=+79286873132',
        label: 'WhatsApp (+7 (928) 687-31-32)',
      },
      {
        img: 'tg.svg',
        href: 'tg://resolve?domain=jhasuev',
        label: 'Telegram (@jhasuev)',
      },
    ],
  },
  {
    caption: 'Другие способы',
    links: [
      {
        img: 'email.svg',
        href: 'mailto:jhasuev@mail.ru',
        label: 'jhasuev@mail.ru',
      },
      {
        img: 'phone.svg',
        href: 'tel:+79286873132',
        label: '+7 (928) 687-31-32',
      },
    ],
  },
]