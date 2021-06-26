// import { createApp } from 'vue'
import Vue from 'vue';
import App from './App.vue'
// console.log(import.meta.env) // dot env variables
// createApp(App).mount('#app')
new Vue({
    // router,
    // store,
    render: h => h(App)
  }).$mount('#app')