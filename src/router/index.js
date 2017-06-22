import Vue from 'vue'
import Router from 'vue-router'


const Hello = r => require.ensure([], () => r(require('@/components/Hello')), 'hello')
const NodeJs = r => require.ensure([], () => r(require('@/views/nodejs')), 'nodejs')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Hello,
      
    },
    {
      path: '/nodejs',
      component: NodeJs,
      // children:[
      //   { path: 'nodejs', component: NodeJs }
      // ]
    }
  ]
})
