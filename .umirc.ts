import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: 'My Documents',
    menuFooterRender: false,
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      access: 'canVisitHome',
    },
    {
      name: '登陆',
      path: '/login',
      component: './Login',
      layout: false
    },
    {
      name: '文档',
      path: '/doc',
      component: './Doc',
    },{
      name: '文档详情',
      path: '/doc/:uuid',
      component: './Doc/detail',
      // 不显示在菜单中
      hideInMenu: true,
    },
    {
      name: '库',
      path: '/book/:uuid',
      component: './Book',
      layout: false,
      routes: [
        {
          path: '/book/:uuid/doc/:docUuid',
          component: './Book/Doc',
        },
        {
          path: '/book/:uuid/new',
          component: './Editor',
        }
      ]
    }
  ],
  npmClient: 'pnpm',
});

