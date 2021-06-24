// import { createApp } from 'vue'
import Vue from 'vue';
import App from './App.vue'

// createApp(App).mount('#app')
new Vue({
    // router,
    // store,
    render: h => h(App)
  }).$mount('#app')