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
				component: () => import('./views/home.vue')
			},
			{
				path: '/tip',
				name: 'tip',
				component: () => import('./views/tip.vue'),
				
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
				path: '/setRz',
				name: 'setRz',
				redirect: '/setPersonal',
				component: () => import('./views/set/rzCom.vue'),
				children:[
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
					
				]
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
				children:[
					{
						path: '/profit',
						name: 'profit',
						component: () => import('./views/profit/works.vue'),
						
					},
					{
						path: '/money',
						name: 'money',
						component: () => import('./views/profit/money.vue'),
						
					},
					{
						path: '/fcsy',
						name: 'fcsy',
						component: () => import('./views/profit/fcsy.vue'),
						
					},
					
				]
				
			},
			{
				path: '/noIs',
				name: 'noIs',
				component: () => import('./views/profit/noRz.vue'),
				
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
			{
			    path: '/text',
				redirect: '/text/about',
			    name: 'text',
			    component: () => import('./views/message/text.vue'),
				
				children:[
					{
					    path: '/text/about',
					    name: 'about',
					    component: () => import('./views/message/about.vue'),
					
					},
					{
					    path: '/text/userProtocol',
					    name: 'userProtocol',
					    component: () => import('./views/message/userProtocol.vue'),
					
					},
					{
					    path: '/text/authorization',
					    name: 'authorization',
					    component: () => import('./views/message/authorization.vue'),
					
					},
					{
					    path: '/text/help',
					    name: 'help',
					    component: () => import('./views/message/help.vue'),
					
					},
				],
			},
			
			
		],	
	},
	/*login_*/	
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
	}	,
	{
		path:'*',
		redirect: '/index',
	}
];
router.addRoutes(wb);
//自动登录
let token = localStorage.getItem('userT');
if(token){
	try{window.userInfo = JSON.parse(token);}catch(e){}
}
router.beforeEach((to, from, next) => {
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		window.location.href = "http://dev-web-ndesigner.idatachain.cn/aindex.html#/";
		return
	}
	window.scrollTo(0,0);
	/*是否填写信息*/
	if(window.userInfo && window.userInfo.is_detail==0){		
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
	next();	
	return	
})
export default router