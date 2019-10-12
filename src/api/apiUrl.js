export default {
/*需求相关*/
	/*登录*/
// 	login:{
// 		url:'/Passport/User/login',method:'post',baseURL:0,
// 	},

	thirdLogin:{
		url:'/Passport/user/thirdLogin',method:'get',baseURL:0
	},
	

	logout:{
		url:'/Api/User/logout',method:'post',baseURL:0
	},
	
/*获取用户信息*/
	getSelfInfo:{
		url:'/Api/User/selfInfo',method:'post',baseURL:0
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

	
	
	getBanner:{
		url:'/Api/Home/banner',method:'post',baseURL:0,
	},
	getHList:{
		url:'/Api/Home/list',method:'post',baseURL:0,
	},

	
	getFList:{
		url:'/File/File/list',method:'post',baseURL:0,
	},
	
	deleteFile:{
		url:'/File/File/delete',method:'post',baseURL:0,Type:'multipart/form-data',
	},
	
	/*文件上传*/
	pushFile:{
		url:'/File/File/insert',method:'post',baseURL:0,
	},
	
	
	/*获取作品ID*/
	getWorkId:{
		url:'/Api/Work/id',method:'post',baseURL:0,
	},
	/*记录作品*/
	saveWorks:{
		url:'/Api/Work/save',method:'post',baseURL:0,
	},
	
	/*获取作品分类*/
	
	getClassify:{
		url:'/Api/Work/classify',method:'post',baseURL:0,
	},
	
	getWorkDetail:{
		url:'/Api/Work/detail',method:'post',baseURL:0,
	},
	addComment:{
		url:'/Api/Comment/add',method:'post',baseURL:0,
	},
	getCommentList:{
		url:'/Api/Comment/list',method:'post',baseURL:0,
	},
	
	
	
	/*Activvity*/
	a_getList:{
		url:'/Api/Activity/list',method:'post',baseURL:0,
	},
	a_getInfo:{
		url:'/Api/Activity/info',method:'post',baseURL:0,
	},
	a_getWork:{
		url:'/Api/Activity/work',method:'post',baseURL:0,
	},
	
	a_AttendActivity:{
		url:'/Api/Activity/attend',method:'post',baseURL:0,
	},
	/*删除评论*/
	delComment:{
		url:'/Api/Comment/del',method:'post',baseURL:0,
	},
	/*xx*/
	
	addLike:{
		url:'/Api/Like/add',method:'post',baseURL:0,
	},
	delLike:{
		url:'/Api/Like/del',method:'post',baseURL:0,
	},	
	getPersonalWorkList:{
		url:'/Api/Activity/personalWorkList',method:'post',baseURL:0,
	},
	
	Follow_add:{
		url:'/Api/Follow/add',method:'post',baseURL:0,
	},
	Follow_del:{
		url:'/Api/Follow/del',method:'post',baseURL:0,
	},
	
	/*个人中心*/
	getUserDetail:{
		url:'/Api/User/userDetail',method:'post',baseURL:0,
	},
	getUserWorkList:{
		url:'/Api/Work/userWorkList',method:'post',baseURL:0,
	},
	likeList:{
		url:'/Api/like/list',method:'post',baseURL:0,
	},
	changeUserCenterBanner:{
		url:'/Api/User/changeUserCenterBanner',method:'post',baseURL:0,
	},
	
	followList:{
		url:'/Api/Follow/list',method:'post',baseURL:0,
	},
	fansList:{
		url:'/Api/Follow/fansList',method:'post',baseURL:0,
	},
	getSelfWorkList:{
		url:'/Api/Work/selfWorkList',method:'post',baseURL:0,
	},
	delWork:{
		url:'/Api/Work/del',method:'post',baseURL:0,
	},
	
	dynamic:{
		url:'/Api/Follow/dynamic',method:'post',baseURL:0,
	},
	
	Userupdate:{
		url:'/Api/User/update',method:'post',baseURL:0,
	},
	
	Bindbind:{
		url:'/Api/Bind/bind',method:'post',baseURL:0,
	},
	
	Verifycodeget:{
		url:'/Passport/Verifycode/get',method:'get',baseURL:0,
	},
	identifyAuth1:{
		url:'/Api/User/identifyAuth1',method:'post',baseURL:0,
	},
	identifyAuth:{
		url:'/Api/User/identifyAuth',method:'post',baseURL:0,
	},
	getCounter:{
		url:'/Api/Message/counter',method:'post',baseURL:0,
	},

    Report_getClassify:{
		url:'/Api/Report/classify',method:'post'
	},
	//添加举报
    Report_addReport:{
		url:'/Api/Report/add',method:'post'
	},
	//反馈类型
    Feedback_getClassify:{
		url:'/Api/Feedback/classify',method:'post'
	},
	//添加反馈
    Feedback_add:{
		url:'Api/Feedback/add',method:'post'
	},

	getMessgList:{
		url:'/Api/Message/list',method:'post',baseURL:0,
	},
	
	getNotice:{
		url:'/Api/Message/notice',method:'post',baseURL:0,
	},
	
	Messageread:{
		url:'/Api/Message/read',method:'post',baseURL:0,
	},
	getMessageList:{
		url:'/Api/Message/messageList',method:'post',baseURL:0,
	},
	addChatMessage:{
		url:'/Api/Message/addChatMessage',method:'post',baseURL:0,
	},
	getHotWords:{
		url:'/Api/Search/hotWords',method:'post',baseURL:0,
	},
	Searchsug:{
		url:'/Api/Search/sug',method:'post',baseURL:0,
	},
	
	Searchsearch:{
		url:'/Api/Search/search',method:'post',baseURL:0,
	},
	getChatDetail:{
		url:'/Api/Message/chatDetail',method:'post',baseURL:0,
	},
	
	delChat:{
		url:'/Api/Message/delChat',method:'post',baseURL:0,
	},

	contributorInfo:{
		url:'/api/user/contributorInfo',method:'post',baseURL:0,
	},
	
	
	
	/*收益*/
	Income_info:{
		url:'/Api/Income/info',method:'post',baseURL:0,
	},
	Income_hireworkList:{
		url:'/Api/Income/hireworkList',method:'post',baseURL:0,
	},
	Income_flowList:{
		url:'/Api/Income/flowList',method:'post',baseURL:0,
	},
	
	Income_applyList:{
		url:'/Api/Income/applyList',method:'post',baseURL:0,
	},
	
	Income_applyCash:{
		url:'/Api/Income/applyCash',method:'post',baseURL:0,
	},
	Income_applyCancel:{
		url:'/Api/Income/applyCancel',method:'post',baseURL:0,
	},
	recommendActivity:{
		url:'/api/activity/recommendActivity',method:'post',baseURL:0,
	},
	documentget:{
		url:'/Api/document/get',method:'post',baseURL:0,
	},
	
	bindExist:{
		url:'/Api/bind/bindExist',method:'post',baseURL:0,
	},
	
	pr_list:{
		url:'/api/project/list',method:'post',baseURL:0,
	},
	pr_classify:{
		url:'/api/project/classify',method:'post',baseURL:0,
	},
	pr_detail:{
		url:'/api/project/detail',method:'post',baseURL:0,
	},
	pr_check:{
		url:'/api/project/qualification',method:'post',baseURL:0,
	},

	pr_cancelSignup:{
		url:'/api/project/cancelSignup',method:'post',baseURL:0,
	},
	
	pr_signup:{
		url:'/api/project/signup',method:'post',baseURL:0,
	},
	
	pr_delivery:{
		url:'/api/project/delivery',method:'post',baseURL:0,
	},
	
	pr_revokeDelivery:{
		url:'/api/project/revokeDelivery',method:'post',baseURL:0,
	},
	
	pr_deliveryList:{
		url:'/api/project/deliveryList',method:'post',baseURL:0,
	},
	
	pr_terminate:{
		url:'/api/project/terminate',method:'post',baseURL:0,
	},
	
	pr_question:{
		url:'/api/project/question',method:'post',baseURL:0,
	},
	
	pr_evaluate:{
		url:'/api/project/evaluate',method:'post',baseURL:0,
	},
	
	pr_gtreport:{
		url:'/api/project/report',method:'post',baseURL:0,
	},
	
	pr_personalList:{
		url:'/api/project/personalList',method:'post',baseURL:0,
	},
	
	saveSkill:{
		url:'/api/user/saveSkill',method:'post',baseURL:0,
	},
	
	pr_recommend:{
		url:'/api/project/recommend',method:'post',baseURL:0,
	},
	
	pr_classifyInfo:{
		url:'/api/project/classifyInfo',method:'post',baseURL:0,
	},
	
	
}