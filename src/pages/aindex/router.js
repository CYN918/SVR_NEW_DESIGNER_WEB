import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/index.vue'
import Home from './views/home/index.vue'
import HomeIn from './views/home/home.vue'
import Act from './views/home/activvity.vue'
import Cont from './views/cont.vue'
import Conta from './views/conta.vue'
import Uinde from './views/user/index.vue'
import Uwor from './views/user/works.vue'
import Uinfo from './views/user/info.vue'

Vue.use(Router)
const router = new Router({
  routes:[] 
})
let wb = [
	{
		path: '/',
		redirect: '/index',
		name: 'index',
		component: Index,
		children:[
			{
				path: '/index',
				name: 'home',
				component: Home,
				children:[
					{
						path: '/index',
						name: 'home',
						component:HomeIn,
					},
					{
						path: '/activvity',
						name: 'activvity',
						component: Act,
					}
				]
			},
			{
				path: '/cont',
				name: 'cont',
				component:Cont,
			},
			{
				path: '/conta',
				name: 'conta',
				component:Conta,
			},
			{
				path: '/user',
				name: 'user',
				component:Uinde,
				children:[
					{
						path: '/user',
						name: 'user',
						component:Uwor,
					},
					{
						path: '/info',
						name: 'info',
						component:Uinfo,
					},
					
				]
				
			}
		],	
	},
];
router.addRoutes(wb);
//自动登录
let token = localStorage.getItem('userT');
if(token){
	try{window.userInfo = JSON.parse(token);}catch(e){}
}
let passd = localStorage.getItem('pass');
if(passd){		
	try{window.passIn = JSON.parse(passd);}catch(e){}
}
router.beforeEach((to, from, next) => {
	if(!/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		window.location.href = location.origin+"/#/";
		return
	}
	window.scrollTo(0,0);	
	next();	
})
export default router