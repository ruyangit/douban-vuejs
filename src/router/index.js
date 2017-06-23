import Vue from 'vue'
import Router from 'vue-router'


const Hello = r => require.ensure([], () => r(require('@/components/Hello')), 'hello')
const Layout = r => require.ensure([], () => r(require('@/views/layout')), 'douban')
const Movie = r => require.ensure([], () => r(require('@/views/movie')), 'douban')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // component: Hello,
      redirect:'/douban/movie'
    },
    {
      path: '/douban',
      component: Layout,
      children: [
        { path: 'movie', component: Movie }
      ]
    }
  ]
})
