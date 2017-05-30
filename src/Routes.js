
import Login from './Pages/Login';
import Main from './Pages/Main';
import Post from './Pages/Post';
import Test from './Pages/Test';
export default [
  {
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: Main,
    routeKey: 'home',
    logged: true,
    routes: [
      {
        path: '/post/new',
        routeKey: 'post-new',
        component: Post,
      },
      {
        path: '/test',
        routeKey: 'test',
        component: Test,
      },
    ]
  }
]