import Vue from 'vue'
import Router from 'vue-router'


import Index from './views/index.vue'
import special_first from './views/special/first.vue'
import Home from './views/home.vue'
import Tip from './views/tip.vue'
import upload from './views/upload/upload.vue'

import userCom from './views/user/userCom.vue'
import works from './views/user/works.vue'
import recommend from './views/user/recommend.vue'
import follow from './views/user/follow.vue'
import followFans from './views/user/fans.vue'
import info from './views/user/info.vue'


import myAll from './views/user/myAll.vue'
import myExamine from './views/user/myExamine.vue'
import myNotPass from './views/user/myNotPass.vue'
import myPass from './views/user/myPass.vue'
import myDraft from './views/user/myDraft.vue'


import av_list from './views/activvity/list.vue'
import av_com from './views/activvity/com.vue'
import av_detailed from './views/activvity/detailed.vue'
import av_into from './views/activvity/into.vue'
import av_admission from './views/activvity/admission.vue'

import content from './views/content.vue'
import contents from './views/contents.vue'

import myDynamic from './views/user/myDynamic.vue'
import myCreators from './views/user/myCreators.vue'
import myFans from './views/user/myFans.vue'

import set_user from './views/set/user.vue'
import set_security from './views/set/security.vue'
import set_rzCom from './views/set/rzCom.vue'
import set_personal from './views/set/personal.vue'
import set_enterprise from './views/set/enterprise.vue'

import messgeCl from './views/messgeCl/index.vue'

import pt_index from './views/profit/index.vue'
import pt_works from './views/profit/works.vue'
import pt_money from './views/profit/money.vue'
import pt_fcsy from './views/profit/fcsy.vue'
import pt_noRz from './views/profit/noRz.vue'


import notify from './views/message/notify.vue'
import comment from './views/message/comment.vue'
import chat from './views/message/chat.vue'

import searchUser from './views/search/searchUser.vue'
import searchWorks from './views/search/searchWorks.vue'

import tx_index from './views/message/text.vue'
import tx_about from './views/message/about.vue'
import tx_userProtocol from './views/message/userProtocol.vue'
import tx_authorization from './views/message/authorization.vue'
import tx_help from './views/message/help.vue'

import lg_index from './views/login/index.vue'
import lg_login from './views/login/login.vue'
import lg_register from './views/login/register.vue'
import lg_modifyPassword from './views/login/modifyPassword.vue'
import lg_userme from './views/login/userme.vue'
import lg_userme2 from './views/login/userme2.vue'


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
			{path: '/special_first',name: 'special_first',component: special_first},						
			{path: '/index',name: 'home',component: Home},
			{path: '/tip',name: 'tip',component: Tip},		
			{path: '/upload',name: 'upload',component: upload},
			{
				path: '/userd',
				name: 'userd',
				component:userCom,
				children:[
					{path: '/works',name: 'works',component: works},
					{path: '/recommend',name: 'recommend',component:recommend},
					{path: '/follow',name: 'follow',component:follow},
					{path: '/followFans',name: 'followFans',component:followFans},
					{path: '/info',name: 'info',component:info},
				],
			},		
			{path: '/myAll',name: 'myAll',component:myAll},
			{path: '/myExamine',name: 'myExamine',component:myExamine},
			{path: '/myNotPass',name: 'myNotPass',component:myNotPass},
			{path: '/myPass',name: 'myPass',component:myPass},
			{path: '/myDraft',name: 'myDraft',component:myDraft},
			
			{path: '/activvity',name: 'activvity',component:av_list},			
			{
				path: '/detailed',
				name: 'detailed',
				component:av_com,
				children:[
					{path: '/detailed',name: 'detailed_detailed',component:av_detailed},
					{path: '/detailed/into',name: 'detailed_into',component:av_into},
					{path: '/detailed/admission',name: 'detailed_admission',component:av_admission},
				]
			},
			
			{path: '/cont',name: 'conts',component:content,},
			{path: '/conts',name: 'cont',component:contents,},
			
			{path: '/myDynamic',name: 'myDynamic',component:myDynamic},
			{path: '/myCreators',name: 'myCreators',component:myCreators},
			{path: '/myFans',name: 'myFans',component:myFans},
			
			{path: '/setUser',name: 'setUser',component:set_user},
			{path: '/setSecurity',name: 'setSecurity',component:set_security},
			{
				path: '/setRz',
				name: 'setRz',
				redirect: '/setPersonal',
				component:set_rzCom,
				children:[
					{path: '/setPersonal',name: 'setPersonal',component:set_personal},
					{path: '/setEnterprise',name: 'setEnterprise',component:set_enterprise},					
				]
			},
	
			{path: '/message',name: 'message',component:messgeCl},
			
			{
				path: '/profit',
				name: 'profit',
				component:pt_index,
				children:[
					{path: '/profit',name: 'profit',component:pt_works},
					{path: '/money',name: 'money',component:pt_money},
					{path: '/fcsy',name: 'fcsy',component:pt_fcsy},					
				]				
			},
			{path: '/noIs',name: 'noIs',component:pt_noRz},
			{path: '/notify',name: 'notify',component:notify},
			{path: '/comment',name: 'comment',component:comment},
			{path: '/chat',name: 'chat',component:chat},
			{path: '/searchUser',name: 'searchUser',component:searchUser},
			{path: '/searchWorks',name: 'searchWorks',component:searchWorks},
			{
			    path: '/text',
				redirect: '/text/about',
			    name: 'text',
			    component:tx_index,				
				children:[
					{path: '/text/about',name: 'about',component:tx_about,},
					{path: '/text/userProtocol',name: 'userProtocol',component:tx_userProtocol},
					{path: '/text/authorization',name: 'authorization',component:tx_authorization},
					{path: '/text/help',name: 'help',component:tx_help},
				],
			},
		],	
	},
	/*login_*/	
	{
		path: '/login',
		name: 'login',
		component:lg_index,
		children:[
			{path: '/login',name: 'login',component:lg_login},
			{path: '/register',name: 'register',component:lg_register},
			{path: '/modifyPassword',name: 'modifyPassword',component:lg_modifyPassword},			
		],	
	},	
	{path: '/userme',name: 'userme',component:lg_userme},
	{path: '/userme2',name: 'userme2',component:lg_userme2},
	{path:'*',redirect: '/index',}
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