import { ListPage, PostPage, InputPage } from 'pages';

export default [
  {
    path: '/',
    exact: true,
    component: ListPage
  },
  {
    path: '/post/:id',
    component: PostPage
  },
  {
    path: '/page/:page',
    component: ListPage
  },
  {
    path: '/tag/:tag/:page?',
    component: ListPage
  },
  {
    path: '/input',
    component: InputPage
  }
];