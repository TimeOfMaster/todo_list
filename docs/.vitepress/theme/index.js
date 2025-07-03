import DefaultTheme from 'vitepress/theme';
import './custom.css';
import Layout from './Layout.vue';

export default {
  ...DefaultTheme,
  Layout: Layout,
  // You can add custom components or logic here if needed
};
