import Vue from 'vue'
import App from './App.vue'
import router from './router'
import init from 'common/app.init.js'

init(() => {
	new Vue({
		router,
		render: h => h(App)
	}).$mount('#app')
})