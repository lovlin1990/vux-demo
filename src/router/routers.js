import index from '@/page/index/index'
import user from '@/page/user/index'

export default [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/user/index',
    name: 'user',
    component: user
  }
]
