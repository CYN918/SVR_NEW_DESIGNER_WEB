export default {
/*需求相关*/
	/*登录*/
// 	login:{
// 		url:'/Passport/User/login',method:'post',baseURL:0,
// 	},
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
	
	
}