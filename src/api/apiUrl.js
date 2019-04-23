export default {
/*需求相关*/
	/*登录*/
// 	login:{
// 		url:'/Passport/User/login',method:'post',baseURL:0,
// 	},
	logout:{
		url:'/Api/User/logout',method:'post',baseURL:0
	},
	
/*获取用户信息*/
	getSelfInfo:{
		url:'/Api/User/getSelfInfo',method:'post',baseURL:0
	},
	/*新登录*/
	login:{
		url:'/Api/User/login',method:'post',baseURL:0,
	},
	
	/*注册*/
	register:{
		url:'/Passport/User/register',method:'post',baseURL:0,
	},
	/*短信*/
	sendVerifyCode:{
		url:'/Passport/User/sendVerifyCode',method:'post',baseURL:0,
	},
	/*密码*/
	modifyPassword:{
		url:'/Passport/User/modifyPassword',method:'post',baseURL:0,
	},
	
	addSelfInfo:{
		url:'/Api/User/addSelfInfo',method:'post',baseURL:0,
	},
	File:{
		url:'/File/File/insert',method:'post',baseURL:0,Type:'multipart/form-data',
	},
	
	
	getBanner:{
		url:'/Api/Home/banner',method:'post',baseURL:0,
	},
	getHList:{
		url:'/Api/Home/list',method:'post',baseURL:0,
	},

	
	getFList:{
		url:'/File/File/getList',method:'post',baseURL:0,
	},
	
	deleteFile:{
		url:'/File/File/delete',method:'post',baseURL:0,Type:'multipart/form-data',
	},
	
	insertFile:{
		url:'/File/File/insert',method:'post',baseURL:0,Type:'multipart/form-data',
	},
	
	
	/*获取作品ID*/
	getWorkId:{
		url:'/Api/Work/getWorkId',method:'post',baseURL:0,
	},
	/*记录作品*/
	saveWorks:{
		url:'/Api/Work/saveWork',method:'post',baseURL:0,
	},
	
	/*获取作品分类*/
	
	getClassify:{
		url:'/Api/Work/getClassify',method:'post',baseURL:0,
	},
	
	getWorkDetail:{
		url:'/Api/Work/getWorkDetail',method:'post',baseURL:0,
	},
	addComment:{
		url:'/Api/Work/addComment',method:'post',baseURL:0,
	},
	
	delComment:{
		url:'/Api/Work/delComment',method:'post',baseURL:0,
	},
	getCommentList:{
		url:'/Api/Work/getCommentList',method:'post',baseURL:0,
	},
	
	
	
	/*Activvity*/
	a_getList:{
		url:'/Api/Activity/getActivityList',method:'post',baseURL:0,
	},
	a_getInfo:{
		url:'/Api/Activity/getActivityInfo',method:'post',baseURL:0,
	},
	a_getInfo:{
		url:'/Api/Activity/getActivityInfo',method:'post',baseURL:0,
	},
	
	a_getWork:{
		url:'/Api/Activity/getActivityWork',method:'post',baseURL:0,
	},
	
	a_AttendActivity:{
		url:'/Api/Activity/AttendActivity',method:'post',baseURL:0,
	},
	/*删除评论*/
	delComment:{
		url:'/Api/Work/delComment',method:'post',baseURL:0,
	},
	/*xx*/
	
	addLike:{
		url:'/Api/Like/addLike',method:'post',baseURL:0,
	},
	delLike:{
		url:'/Api/Like/delLike',method:'post',baseURL:0,
	},	
	getPersonalWorkList:{
		url:'/Api/Activity/getPersonalWorkList',method:'post',baseURL:0,
	},
	
	Follow_add:{
		url:'/Api/Follow/add',method:'post',baseURL:0,
	},
	Follow_del:{
		url:'/Api/Follow/del',method:'post',baseURL:0,
	},
	
	/*个人中心*/
	getUserDetail:{
		url:'/Api/User/getUserDetail',method:'post',baseURL:0,
	},
	getUserWorkList:{
		url:'/Api/Work/getUserWorkList',method:'post',baseURL:0,
	},
	likeList:{
		url:'/Api/like/likeList',method:'post',baseURL:0,
	},
	changeUserCenterBanner:{
		url:'/Api/User/changeUserCenterBanner',method:'post',baseURL:0,
	},
	
	followList:{
		url:'/Api/Follow/followList',method:'post',baseURL:0,
	},
	fansList:{
		url:'/Api/Follow/fansList',method:'post',baseURL:0,
	},
	getSelfWorkList:{
		url:'/Api/Work/getSelfWorkList',method:'post',baseURL:0,
	},
	delWork:{
		url:'/Api/Work/delWork',method:'post',baseURL:0,
	},
	
	dynamic:{
		url:'/Api/Follow/dynamic',method:'post',baseURL:0,
	},
	
	Userupdate:{
		url:'/Api/User/update',method:'post',baseURL:0,
	},
	
}