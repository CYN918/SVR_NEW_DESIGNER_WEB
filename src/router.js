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
				path: '/upload',
				name: 'upload',
				component: () =>import('./views/upload/upload.vue'),
			
			},
			{
				path: '/recommend',
				name: 'recommend',
				component: () => import('./views/user/recommend.vue')
			},
			{
				path: '/info',
				name: 'info',
				component: () => import('./views/user/info.vue')
			},
			{
				path: '/works',
				name: 'works',
				component: () => import('./views/user/works.vue')
			},
			{
				path: '/myAll',
				name: 'myAll',
				component: () => import('./views/user/myAll.vue')
			},
			{
				path: '/myExamine',
				name: 'myExamine',
				component: () => import('./views/user/myExamine.vue')
			},
			{
				path: '/myNotPass',
				name: 'myNotPass',
				component: () => import('./views/user/myNotPass.vue')
			},
			{
				path: '/myPass',
				name: 'myPass',
				component: () => import('./views/user/myPass.vue')
			},
			{
				path: '/myDraft',
				name: 'myDraft',
				component: () => import('./views/user/myDraft.vue')
			},
			{
                path: '/follow',
                name: 'follow',
                component: () => import('./views/user/follow.vue')
            },
			{
			    path: '/followFans',
			    name: 'followFans',
			    component: () => import('./views/user/fans.vue')
			},
			{
				path: '/activvity',
				name: 'activvity',
				component: () => import('./views/activvity/list.vue'),
				
			},
			{
				path: '/detailed',
				name: 'detailed',
				component: () => import('./views/activvity/com.vue'),
				children:[
					{path: '/detailed',
					name: 'detailed_detailed',
					component: () => import('./views/activvity/detailed.vue'),},
					{path: '/detailed/into',
					name: 'detailed_into',
					component: () => import('./views/activvity/into.vue'),},
					{path: '/detailed/admission',
					name: 'detailed_admission',
					component: () => import('./views/activvity/admission.vue'),},
				]
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
			{
				path: '/myDynamic',
				name: 'myDynamic',
				component: () => import('./views/user/myDynamic.vue')
			},
			{
				path: '/myCreators',
				name: 'myCreators',
				component: () => import('./views/user/myCreators.vue')
			},
			{
				path: '/myFans',
				name: 'myFans',
				component: () => import('./views/user/myFans.vue')
			},
			{
				path: '/setUser',
				name: 'setUser',
				component: () => import('./views/set/user.vue')
			},
			{
				path: '/setSecurity',
				name: 'setSecurity',
				component: () => import('./views/set/security.vue')
			},
			{
				path: '/setPersonal',
				name: 'setPersonal',
				component: () => import('./views/set/personal.vue')
			},
			{
				path: '/setEnterprise',
				name: 'setEnterprise',
				component: () => import('./views/set/enterprise.vue')
			},
			{
				path: '/message',
				name: 'message',
				component: () => import('./views/messgeCl/index.vue'),
				
			},
			{
				path: '/profit',
				name: 'profit',
				component: () => import('./views/profit/index.vue'),
				
			},
			{
				path: '/notify',
				name: 'notify',
				component: () => import('./views/message/notify.vue'),
				
			},
			{
				path: '/comment',
				name: 'comment',
				component: () => import('./views/message/comment.vue'),
				
			},
			{
				path: '/chat',
				name: 'chat',
				component: () => import('./views/message/chat.vue'),
				
			},
			{
				path: '/searchUser',
				name: 'searchUser',
				component: () => import('./views/search/searchUser.vue'),
				
			},
			{
				path: '/searchWorks',
				name: 'searchWorks',
				component: () => import('./views/search/searchWorks.vue'),
				
			},
            {
                path: '/documentCenter',
                name: 'document-center',
                component: () => import('./views/message/DocumentCenter.vue'),

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
		
	},
	{
		path: '/userme2',
		name: 'userme2',
		component: () => import('./views/login/userme2.vue')		
	}	
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
	/*重定向首页*/
	if(to.fullPath=='/'){
		next('/index');	
		return
	}
	/*未登录*/
	if(!window.userInfo){
		/*自动登录*/
		if(window.passIn){
			next('/login');	
			return
		}
		/*未登录不可进入页面*/
		if(['/upload'].indexOf(to.fullPath)!=-1){
			next('/index');	
			return
		}
		next();
		return
	}
	/*是否填写信息*/
	if(window.userInfo.is_detail==0){
		
		if(!window.userInfo.mobile || window.userInfo.mobile=='null'){
			if(to.fullPath!='/userme2'){
				next('/userme2');	
				return
			}
			next();
			return
		}
		if(to.fullPath!='/userme'){
			next('/userme');	
			return
		}
		next();
		return
	}
	
	/*排除已登录不可进入页面*/
	if(window.userInfo.is_detail==1 && ['/login','/login2','/register','/modifyPassword','/userme'].indexOf(to.fullPath)!=-1){
		next('/index');	
		return
	}
	next();	
	return	
})
export default router