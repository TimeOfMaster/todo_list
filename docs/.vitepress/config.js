import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'ToDo List Manager',
  description: 'An interactive command-line ToDo list manager.',
  head: [
    ['link', { rel: 'stylesheet', href: '/theme/custom.css' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' }
        ]
      }
    ]
  }
});
