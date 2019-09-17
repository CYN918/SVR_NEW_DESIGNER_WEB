import axios from 'axios'

import {Message} from 'element-ui'
let basrurl = 'http://139.129.221.123';
if(window.location.host=='shiquaner.zookingsoft.com'){
	basrurl = 'https://shiquaner-api.zookingsoft.com';
}
window.basrul = basrurl;
const generateApiMap = (map) => {
	let facade = {}
	for(let el in map){
		facade[el] = toMethod(map[el]);
	}
	return facade
};
const toMethod = (options) => {
	options.method = options.method || 'post'
	return (params = {}, attachedParams, config = {}) => {	
		return sendApiInstance(options.method, options.url, params, config,options.isType,options.baseURL,options.Type)
	}
}
// 创建axios实例
const createApiInstance = (config = {},on,Type) => {
	let ds = on?on:0;
	const _config = {
		withCredentials: true, // 跨域
		baseURL: basrurl,		
		headers:{
			'Authorization':'Bearer '+localStorage.getItem('token'),
			'Content-Type':Type?Type:'application/x-www-form-urlencoded'
		},
	}	
	config = Object.assign(_config, config);
	return axios.create(config)
}
function backFormData(d){
	let f = new FormData();
	for(let el in d){
		f.append(el,d[el]);				
	}	
	return f;
}
const sendApiInstance = (method, url, params, config = {},isType={},on,Type) => {
	
	if(method === 'post') {
		let token = localStorage.getItem('userT');
		if(token){
			try{
				window.userInfo = JSON.parse(token);
				params.access_token = window.userInfo.access_token;
			}catch(e){}
		}
		params = backFormData(params);
	}
	if(!url){return}		
	let instance = createApiInstance(config,on,Type)
	instance.interceptors.response.use(response => {
		let {result, msg, data} = response.data;		
		if(result==0){
			if(isType.suktip){
				Message({message: '操作成功',type: 'success'});
			}
			if(isType.reload){	
				location.reload();	
			}
			return data
		}else{			
			if(result=='104'){	
				window.frompath2 = location.href;
				localStorage.setItem('userT','');
				window.userInfo='';				
				window.location.href = '#/login';		
				return 'error';
			}
			Message({dangerouslyUseHTMLString:true,message: data});
			return 'error';
		}
	},error => {	  
		Message({message: '服务器故障',type: 'warning'});
		return Promise.reject(error).catch(() => {
		})
	});
	return instance[method](url, params, config)
}
export default {
	generateApiMap
}
