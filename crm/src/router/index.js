import Vue from 'vue'
import VueRouter from 'vue-router'


import routes from './route'

Vue.use(VueRouter)



const router = new VueRouter({
  mode: 'history',//hash 利用的就是路由hashchange；history需要后台配合
  base: process.env.BASE_URL,
  routes,
  linkActiveClass:'current',
  linkExactActiveClass:'exactCurrent' //精确匹配，不仅路径一样，参数也一样的时候 才会有这个类型
})



export default router
