import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

// Sample components
import LandingPage from './components/LandingPage.vue'
import MainHome from './components/MainHome.vue'
import MainAdmin from './components/MainAdmin.vue'
import MainQuotation from './components/MainQuotation.vue'


// Set up router
const routes = [
  { path: '/', component: LandingPage },
    { path: '/cameras', component: MainHome },
  { path: '/quote', component: MainQuotation },
  { path: '/admin', component: MainAdmin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Create app
const app = createApp(App)
app.use(router)
app.mount('#app')
