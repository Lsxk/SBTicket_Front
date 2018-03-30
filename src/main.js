// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ticketList from 'components/ticketList/ticketList'
import preOrder from 'components/preOrder/preOrder'
import index from 'components/index/index'
import pay from 'components/pay/pay'
import App from './App'

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.config.productionTip = false

const routes = [
  {path: '/', component: index},
  {name: 'tickets', path: '/tickets', component: ticketList},
  {name: 'preOrder', path: '/preOrder', component: preOrder},
  {name: 'pay', path: '/pay', component: pay}
]
const router = new VueRouter({
  mode: 'history',
  routes: routes,
  linkActiveClass: 'active'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
}).$mount('#app')
