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



import myWorksCom from './views/user/myWorksCom.vue'

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
import setSkill from './views/set/skill.vue'
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
import pt_qtsy from './views/profit/qtsy.vue'

import notify from './views/message/notify.vue'
import comment from './views/message/comment.vue'
import chat from './views/message/chat.vue'

import searchUser from './views/search/searchUser.vue'
import searchWorks from './views/search/searchWorks.vue'

import tx_index from './views/message/text.vue'

import lg_index from './views/login/index.vue'
import lg_login from './views/login/login.vue'
import lg_register from './views/login/register.vue'
import lg_modifyPassword from './views/login/modifyPassword.vue'
import lg_userme from './views/login/userme.vue'
import lg_userme2 from './views/login/userme2.vue'

import pr_index from './views/project/index.vue'
import pr_cents from './views/project/cents.vue'

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
			{path: '/myAll',name: 'myAll',component:myWorksCom},
			{path: '/myExamine',name: 'myExamine',component:myWorksCom},
			{path: '/myNotPass',name: 'myNotPass',component:myWorksCom},
			{path: '/myPass',name: 'myPass',component:myWorksCom},
			{path: '/myDraft',name: 'myDraft',component:myWorksCom},
			
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
			
			{path: '/cont',name: 'cont',component:content,},
			{path: '/conts',name: 'conts',component:contents,},
			
			{path: '/myDynamic',name: 'myDynamic',component:myDynamic},
			{path: '/myCreators',name: 'myCreators',component:myCreators},
			{path: '/myFans',name: 'myFans',component:myFans},
			
			{path: '/setUser',name: 'setUser',component:set_user},
			// {path: '/setSkill',name: 'setSkill',component:setSkill},
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
					{path: '/qtsy',name: 'qtsy',component:pt_qtsy},												
				]				
			},
			{path: '/noIs',name: 'noIs',component:pt_noRz},
			{path: '/notify',name: 'notify',component:notify},
			{path: '/comment',name: 'comment',component:comment},
			{path: '/chat',name: 'chat',component:chat},
			{path: '/searchUser',name: 'searchUser',component:searchUser},
			{path: '/searchWorks',name: 'searchWorks',component:searchWorks},
						
			{path: '/about',name: 'about',component:tx_index},
			{path: '/userProtocol',name: 'userProtocol',component:tx_index},
			{path: '/authorization',name: 'authorization',component:tx_index},
			{path: '/help',name: 'help',component:tx_index},
			
			// {path: '/project',name: 'project',component:pr_index},
			// {path: '/prcent',name: 'prcent',component:pr_cents},
			
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


function setTitle(t){
	let str = '';
	switch (t){
		case '/index':str = '狮圈儿-创作者平台（Zoocreators）-让创意更有价值，让生活更加自在';
			break;
		case '/login':
		case '/register':
			  str = '注册登录-狮圈儿（Zoocreators）';
			break;
		case '/userme':
		case '/userme2':
			  str = '完善资料-狮圈儿（Zoocreators）';
			break;
		case '/searchWorks':
		case '/searchUser':
			  str = '搜索-狮圈儿（Zoocreators）';
			break;
		case '/notify':
		case '/comment':
		case '/chat':	
			  str = '消息--狮圈儿（Zoocreators）';
			break;
		case '/upload':	
			  str = '上传作品页-狮圈儿（Zoocreators）';
			break;	
		case '/conts':	
			  str = '作品预览--狮圈儿（Zoocreators）';
			break;	
		case '/activvity':	
			  str = '活动-狮圈儿（Zoocreators）';
			break;	
		case '/myAll':	
		case '/myExamine':
		case '/myPass':
		case '/myNotPass':
		case '/myDraft':		
			  str = '我的创作-狮圈儿（Zoocreators）';
			break;	
		case '/myDynamic':	
		case '/myCreators':
		case '/myFans':
			  str = '我的关注-狮圈儿（Zoocreators）';
			break;	
		case '/profit':	
		case '/fcsy':	
		case '/money':	
		case '/noIs':	
			  str = '我的收益-狮圈儿（Zoocreators）';
			break;	
		case '/setUser':
		case '/setSecurity':
			  str = '账号设置-狮圈儿（Zoocreators）';
			  break;
		case '/setPersonal':
		case '/setEnterprise':
			  str = '平台供稿人认证-狮圈儿（Zoocreators）';
			  break;
		case '/about':
		case '/userProtocol':
		case '/authorization':
		case '/help':
			  str = '文档服务中心-狮圈儿（Zoocreators）';		
			
		// default:str = '狮圈儿-创作者平台（Zoocreators）-让创意更有价值，让生活更加自在';
			break;
	}
	if(str){
		document.title=str;
	}
	
}


router.beforeEach((to, from, next) => {
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		window.location.href = location.origin+"/aindex.html#/";
		return
	}

	setTitle(to.path)
	
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