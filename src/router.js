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
				path: '/',
				name: 'home',
				component: () => import('./views/home.vue')
			},
			{
				path: '/event',
				name: 'event',
				component: () => import('./views/event.vue')
			},
			{
				path: '/upload',
				name: 'upload',
				component: () =>import('./views/upload/upload.vue'),
			
			},
			{
				path: '/conts',
				name: 'conts',
				component: () =>import('./views/contents.vue'),
			
			},
			{
				path: '/cont',
				name: 'cont',
				component: () =>import('./views/content.vue'),
			
			},
			
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






function checkUserType(){
	
	if(usermessg){
		api.login(JSON.parse(usermessg)).then((response)=>{					
			localStorage.setItem('userT',response.access_token);
			api.getSelfInfo({access_token:response.access_token}).then((data)=>{					
				localStorage.setItem('userType',data.is_detail);	
				if(data.is_detail==0){
					next('/userme');					
					return
				}
				next();				
			}).catch(()=>{
				next();	
			});	
			return																			
		}).catch(()=>{			
			next('/login');			
		});	
		return
	}
}

//自动登录
router.beforeEach((to, from, next) => {
	/*登录过期*/
// 	if(+localStorage.getItem('logintime')+(24*60*60*1000)<=Date.parse(new Date())){
// 		localStorage.setItem("token","");
// 		tonek=false;
// 	}
let token = localStorage.getItem('userT');
let	pass = localStorage.getItem('pass');
	if(!token){//未登录
		if(pass){
			api.login(JSON.parse(pass)).then((da)=>{				
				localStorage.setItem('userT',JSON.stringify(da));				
				if(da.is_detail==0){
					next('/userme');	
					return
				}
				next('/');	
				return																			
			}).catch(()=>{	
				localStorage.setItem('pass','');
				next('/login');			
			});	
			return
		}
		if(['/upload'].indexOf(to.fullPath)!=-1){
			next('/');	
			return
		}
		next();
		return
	}
	if(JSON.parse(token).is_detail==0){
		next('/userme');
		return
	}
	if(['/login','/login2','/register','/modifyPassword'].indexOf(to.fullPath)!=-1){
		next('/');	
		return
	}
	next();	
	return	
})
export default router