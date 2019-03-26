import Vue from 'vue'
import Router from 'vue-router'
import api from './api/index'
Vue.use(Router)
const router = new Router({
  routes:[] 
})
let wb = [
	{
			path: '/',
			name: 'index',
			component: () => import('./views/index.vue'),
			children:[
				{
					path: '/index',
					name: 'home',
					component: () => import('./views/home.vue')
				},
				{
					path: '/event',
					name: 'event',
					component: () => import('./views/event.vue')
				}
				
			],
	},
	{
			path: '/login',
			name: 'login',
			component: () => import('./views/login/index.vue'),
			children:[
				{
					path: '/login',
					name: 'login',
					component: () => import('./views/login/login.vue')
				},
				{
					path: '/login2',
					name: 'login2',
					component: () => import('./views/login/login2.vue')
				},
				{
					path: '/register',
					name: 'register',
					component: () => import('./views/login/register.vue')
				},
				{
					path: '/modifyPassword',
					name: 'modifyPassword',
					component: () => import('./views/login/modifyPassword.vue')
				},
				
				
			],
	},
		{
			path: '/userme',
			name: 'userme',
			component: () => import('./views/login/userme.vue')
			
		}
];
router.addRoutes(wb);


let token = localStorage.getItem('userT');
let userType = localStorage.getItem('userType');


router.beforeEach((to, from, next) => {
	/*登录过期*/
// 	if(+localStorage.getItem('logintime')+(24*60*60*1000)<=Date.parse(new Date())){
// 		localStorage.setItem("token","");
// 		tonek=false;
// 	}
	if(!token){//未登录
		next();
		return
	}
	if(!userType){
		let pr = {
			access_toke:token
		};
		api.getSelfInfo(pr).then((data)=>{					
			console.log(data)
		}).catch(()=>{
			
		});	
	}
	
	
	if(['/login','/login2','/register','/modifyPassword'].indexOf(to.fullPath)!=-1){
		next('/index');	
		return
	}	
	next();	
	return	
})
export default router