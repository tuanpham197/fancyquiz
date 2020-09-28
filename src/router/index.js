import Vue from 'vue'
import Router from 'vue-router'
import App from '../App.vue'
// import Header from '../components/Header.vue'
import History from '../components/History.vue'
import StartPage from '../components/StartPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'home',
      path: '/',
      component: StartPage
    },
    {
      name: 'start',
      path: '/start',
      component: App
    },
    {
      name: 'history',
      path: '/history',
      component: History
    }
  ]
})
