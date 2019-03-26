export default {
/*需求相关*/
	/*登录*/
	login:{
		url:'/Passport/User/login',method:'post',baseURL:0,
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
	getSelfInfo:{
		url:'/Api/User/getSelfInfo',method:'post',baseURL:0
	},
	
	
}