import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({
  routes:[] 
})
let wb = [
	{
		path: '/',
		redirect: '/index',
		name: 'index',
		component: () => import('./views/index.vue'),
		children:[
			{
				path: '/index',
				name: 'home',
				component: () => import('./views/home/index.vue'),
				children:[
					{
						path: '/index',
						name: 'home',
						component: () => import('./views/home/home.vue'),
					},
					{
						path: '/activvity',
						name: 'activvity',
						component: () => import('./views/home/activvity.vue'),
					}
				]
			},
			{
				path: '/cont',
				name: 'cont',
				component: () => import('./views/cont.vue'),
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
	window.scrollTo(0,0);	
	next();	
})
export default router