import { type DefaultTheme, defineConfig } from 'vitepress';

export default defineConfig({
  base: '/todo_list/',
  lang: 'en-US',
  title: 'ToDo List Manager',
  description: 'An interactive command-line ToDo list manager.',
  head: [
    ['link', { rel: 'stylesheet', href: '/theme/custom.css' }], 
    /* 
     * Icon from Lucide (https://lucide.dev/)
     * ISC License
     * Copyright (c) Lucide Contributors 2022
     */
    ['link', { rel: 'icon', href: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiM4ODM5ZWYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVhcmUtY2hlY2stYmlnLWljb24gbHVjaWRlLXNxdWFyZS1jaGVjay1iaWciPjxwYXRoIGQ9Ik0yMSAxMC42NTZWMTlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDEyLjM0NCIvPjxwYXRoIGQ9Im05IDExIDMgM0wyMiA0Ii8+PC9zdmc%2B', media: '(prefers-color-scheme: light)' }],
    ['link', { rel: 'icon', href: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYWE2ZjciIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zcXVhcmUtY2hlY2stYmlnLWljb24gbHVjaWRlLXNxdWFyZS1jaGVjay1iaWciPjxwYXRoIGQ9Ik0yMSAxMC42NTZWMTlhMiAyIDAgMCAxLTIgMkg1YTIgMiAwIDAgMS0yLTJWNWEyIDIgMCAwIDEgMi0yaDEyLjM0NCIvPjxwYXRoIGQ9Im05IDExIDMgM0wyMiA0Ii8+PC9zdmc%2B', media: '(prefers-color-scheme: dark)' }]
  ],
  themeConfig: {
    socialLinks: [
      { icon: 'github', link: 'https://github.com/TimeOfMaster/todo_list' }
    ],
    nav: nav(),
    sidebar: {
      '/guide/': { base: '/guide/', items: sidebarGuide() },
      '/reference/': { base: '/reference/', items: sidebarReference() },
      '/licenses_credits/': {base: '/licenses_credits/', items: sidebarLicense() },
    },
    footer: {
      message: "",
      copyright: "",
    },
  }
});

function nav(): DefaultTheme.NavItem[] {
  return [
    { text: 'Guide', link: '/guide/getting-started' },
    { text: 'Reference', link: '/reference/components-border' },
    { text: 'License & Credits', link: '/licenses_credits/license' },
  ];
}

function sidebarGuide(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'Getting Started', link: '/guide/getting-started' },
  ];
}

function sidebarLicense(): DefaultTheme.SidebarItem[] {
  return [
    { text: 'License', link: 'license' },
    {
      text: 'Credits',
      collapsed: false,
      base: '/licenses_credits/',
      items: [
        { text: 'Lucide', link: 'lucide_credits' },
      ]
    }
  ];
}

function sidebarReference(): DefaultTheme.SidebarItem[] {
  return [
    {
      text: 'Components',
      collapsed: false,
      base: '/reference/components-',
      items: [
        { text: 'Border', link: 'border' },
      ]
    }
  ];
}
