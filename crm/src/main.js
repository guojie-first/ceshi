import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//import 导入css只能导入本地样式，不能导入在线的，

Vue.config.productionTip = false
Vue.use(ElementUI);

//console.log(store);
//前置守卫
router.beforeEach((to, from, next) => {
  //根据是否登录来判断 能否进入后续的页面
 // if(to.name =='login'){
   if(to.path =='/login'){
    //若我们要跳转的本身就是login页 就 不用走下边的判断了
    next();
    return;
  }
  if (store.state.userInfo.userName) {
    next();
  } else {
   // debugger
    next('/login');
  }
  /* console.log(to,from);
  next(); */
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
