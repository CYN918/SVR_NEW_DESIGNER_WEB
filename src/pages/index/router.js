import Vue from 'vue'
import Router from 'vue-router'
import {Message} from 'element-ui'
import Index from './views/index.vue'
import special_first from './views/special/first.vue'
import Home from './views/home.vue'
import Tip from './views/activvityPage/tip.vue'
import Ac_v1 from './views/activvityPage/ac_v1.vue'
import Ac_v2 from './views/activvityPage/ac_v2.vue'
import Ac_v3 from './views/activvityPage/ac_v3.vue'
import Ac_v4 from './views/activvityPage/ac_v4.vue'
import Ac_v5 from './views/activvityPage/ac_v5.vue'
import upload from './views/upload/upload.vue'

import myWorksCom from './views/user/myWorksCom.vue'
import myProjectCom from './views/user/myProjectCom.vue'

import av_list from './views/activvity/list.vue'
import av_com from './views/activvity/com.vue'
import av_detailed from './views/activvity/detailed.vue'
import av_into from './views/activvity/into.vue'
import av_admission from './views/activvity/admission.vue'

import content from './views/works/content.vue'

import myDynamic from './views/user/myDynamic.vue'
import myCreators from './views/user/myCreators.vue'
import myFans from './views/user/myFans.vue'

import Errors from './views/commd/error.vue'

import setIndex from './views/set/setIndex.vue'


import set_rzCom from './views/set/rzCom.vue'
import set_personal from './views/set/personal.vue'
import set_enterprise from './views/set/enterprise.vue'
import set_personaleid from './views/set/personaleid.vue'
import set_enterpriseeid from './views/set/enterpriseeid.vue'

import messgeCl from './views/messgeCl/index.vue'

import pt_index from './views/profit/index.vue'
// import pt_works from './views/profit/works.vue'
import pt_projects from './views/profit/projects.vue'
import pt_divided from './views/profit/divided.vue'
import pt_money from './views/profit/money.vue'
// import pt_fcsy from './views/profit/fcsy.vue'
import pt_noRz from './views/profit/noRz.vue'
import pt_qtsy from './views/profit/qtsy.vue'


import messegas from './views/message/messga.vue'
import notify from './views/message/notify.vue'
import comment from './views/message/comment.vue'
import chat from './views/message/chat.vue'

import searchUser from './views/search/searchUser.vue'
import searchWorks from './views/search/searchWorks.vue'
import searchProject from './views/search/searchProject.vue'

import tx_index from './views/message/text.vue'

import lg_index from './views/login/index.vue'
import lg_login from './views/login/login.vue'
import lg_register from './views/login/register.vue'
import lg_modifyPassword from './views/login/modifyPassword.vue'
import lg_userme from './views/login/userme.vue'
import lg_userme2 from './views/login/userme2.vue'

import pr_index from './views/project/index.vue'
import pr_cents from './views/project/cents.vue'
import pr_presentation from './views/project/presentation.vue'

import Work_i from './views/works/index.vue'
import email from './views/commd/email.vue'
import img_list from './components/img_list2.vue'

import personalCenter from './views/personalCenter/index.vue'

import tolt from './views/tool/home.vue'
import toltIndex from './views/tool/index.vue'
import pushTool from './views/tool/tool/pushTool.vue'

import syPage from './adPage/syDown.vue'
import toluser from './views/tool/user/user.vue'

Vue.use(Router)
const router = new Router({
  routes:[] 
})
let wb = [
	{path: '/error',name: 'erro1',component: Errors},	
	{path: '/404',name: 'erro2',component: Errors},	
	{path: '/Ac_v',name: 'Ac_v',component: Ac_v1},	
	{path: '/Ac_v2',name: 'Ac_v2',component: Ac_v2},	
	{path: '/Ac_v3',name: 'Ac_v3',component: Ac_v3},		
	{path: '/Ac_v4',name: 'Ac_v4',component: Ac_v4},
	{path: '/Ac_v5',name: 'Ac_v5',component: Ac_v5},
	{path: '/pushTool',name:'pushTool',component: pushTool},
	{path: '/syPage',name:'syPage',component: syPage},
	{path: '/toluser',redirect: {name:'toluser'},component: toltIndex,children:[
		{path: '/toluser',name:'toluser',component: toluser},
	]},
	{
		path: '/',
		redirect: '/index',
		name: 'index',
		component: Index,
		children:[
			{path: '/tolt',name:'tolt',component: tolt},
			{path: '/img_list',name: 'img_list',component: img_list},
			{path: '/email',name: 'email',component: email},	
		
			{path: '/Work_i',name: 'Work_i',component: Work_i},	
			{path: '/special_first',name: 'special_first',component: special_first},						
			{path: '/index',name: 'home',component: Home},
			{path: '/tip',name: 'tip',component: Tip},	
				
				
			{path: '/upload',name: 'upload',component: upload},
			
			{path: '/works',name: 'pe_works',component: personalCenter},
			{path: '/recommend',name: 'pe_recommend',component: personalCenter},
			{path: '/follow',name: 'pe_follow',component: personalCenter},
			{path: '/followFans',name: 'pe_fans',component: personalCenter},
			{path: '/info',name: 'pe_info',component: personalCenter},		
			{path: '/myAll',name: 'myAll',component:myWorksCom},
			{path: '/myExamine',name: 'myExamine',component:myWorksCom},
			{path: '/myNotPass',name: 'myNotPass',component:myWorksCom},
			{path: '/myPass',name: 'myPass',component:myWorksCom},
			{path: '/myDraft',name: 'myDraft',component:myWorksCom},
			
			{path: '/projectAll',name: 'projectAll',component:myProjectCom},
			{path: '/projectBm',name: 'projectBm',component:myProjectCom},
			{path: '/projectZz',name: 'projectZz',component:myProjectCom},
			{path: '/projectYs',name: 'projectYs',component:myProjectCom},
			
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
			{path: '/conts',name: 'conts',component:content,},
			
			{path: '/myDynamic',name: 'myDynamic',component:myDynamic},
			{path: '/myCreators',name: 'myCreators',component:myCreators},
			{path: '/myFans',name: 'myFans',component:myFans},
			
			{path: '/setUser',name: 'setUser',component:setIndex},
			{path: '/setSkill',name: 'setSkill',component:setIndex},
			{path: '/setSecurity',name: 'setSecurity',component:setIndex},
			{
				path: '/setRz',
				name: 'setRz',
				redirect: '/setPersonal',
				component:set_rzCom,
				children:[
					{path: '/setPersonal',name: 'setPersonal',component:set_personal},
					{path: '/setEnterprise',name: 'setEnterprise',component:set_enterprise},
					{path: '/setPersonaleid',name: 'setPersonal',component:set_personaleid},
					{path: '/setEnterpriseeid',name: 'setEnterprise',component:set_enterpriseeid},					
										
				]
			},
	
			{path: '/message',name: 'message',component:messgeCl},
			
			{
				path: '/profit',
				redirect: {
				    name: 'profit'
				},
				component:pt_index,
				children:[
					// {path: '/profit',name: 'profit',component:pt_works},
					{path: '/profit',name: 'profit',component:pt_projects},	
					{path: '/divided',name: 'divided',component:pt_divided},			
					{path: '/money',name: 'money',component:pt_money},
					// {path: '/fcsy',name: 'fcsy',component:pt_fcsy},		
					{path: '/qtsy',name: 'qtsy',component:pt_qtsy},												
				]				
			},
			{path: '/noIs',name: 'noIs',component:pt_noRz},
			{path: '/notify',name: 'notify',component:messegas},
			{path: '/comment',name: 'comment',component:messegas},
			{path: '/chat',name: 'chat',component:messegas},
			{path: '/searchUser',name: 'searchUser',component:searchUser},
			{path: '/searchWorks',name: 'searchWorks',component:searchWorks},
			{path: '/searchProject',name: 'searchProject',component:searchProject},			
								
			{path: '/about',name: 'about',component:tx_index},
			{path: '/userProtocol',name: 'userProtocol',component:tx_index},
			{path: '/authorization',name: 'authorization',component:tx_index},
			{path: '/help',name: 'help',component:tx_index},
			
			{path: '/project',name: 'project',component:pr_index},
			{path: '/prcent',name: 'prcent',component:pr_cents},
			{path: '/presentation',name: 'pr_presentation',component:pr_presentation},						
		],	
	},
	/*login_*/	
	{
		path: '/login',
		redirect: {
		    name: 'login'
		},
		component:lg_index,
		children:[
			{path: '/login',name: 'login',component:lg_login},
			{path: '/register',name: 'register',component:lg_register},
			{path: '/modifyPassword',name: 'modifyPassword',component:lg_modifyPassword},			
		],	
	},	
	{path: '/userme',name: 'userme',component:lg_userme},
	{path: '/userme2',name: 'userme2',component:lg_userme2},
	{path:'*',redirect: '/404',}
];
router.addRoutes(wb);
//自动登录
let token = localStorage.getItem('userT');
if(token){
	try{window.userInfo = JSON.parse(token);}catch(e){}
}
window.dwzFn = function(){
	event.preventDefault();
};

function setTitle(t){
	let str = '';
	switch (t){
		case '/index':
			str = '狮圈儿-创作者平台（Zoocreators）-让创意更有价值，让生活更加自在';
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
		case '/project':
			str = '项目-狮圈儿（Zoocreators）';
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
			break;
		default:str = '狮圈儿-创作者平台（Zoocreators）-让创意更有价值，让生活更加自在';
			break;
	}
	if(str){
		document.title=str;
	}
}
router.beforeEach((to, from, next) => {
	document.body.style = "";
	let isqh = sessionStorage.getItem('isqh');	
	if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
		if(!isqh || isqh==null){
			if(to.path== "/prcent" && !to.query.type){				
				window.location.href = location.origin+"/aindex.html#/conta?id="+to.query.id;
				return
			}			
			window.location.href = location.origin+"/aindex.html#/";
			return
		}
	} 	
	setTitle(to.path)
	/*是否填写信息*/
	if(window.userInfo && (to.fullPath=='/setEnterprise' || to.fullPath=='/setPersonal')){
		console.log(window.userInfo.is_contributor);
		if(window.userInfo.is_contributor){
			Message({message: '你已经是平台供稿人'});
			next('/index');
			return 
		}
		
		if(window.userInfo.contributor_type  && window.userInfo.contributor_format_status==0){
			Message({message: '你的供稿人认证正在审核请耐心等待'});
			next('/index');
			return
		}
		next();
	}
	
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