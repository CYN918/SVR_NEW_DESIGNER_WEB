import Vue from 'vue';
import Main from './login.vue';
let Logind = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Login = function(options) {
	instance = new Logind({
	   data: options
	});
	instance.vm = instance.$mount();
	document.body.appendChild(instance.vm.$el);
	console.log(instance);
	instance.vm.config = {
		num:1
	};

	instance.dom = instance.vm.$el;
	return instance.vm;
};



export default Login();