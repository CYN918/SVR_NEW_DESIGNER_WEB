import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
const generateApiMap = (map) => {
	let facade = {}
	for(let el in map){
		facade[el] = toMethod(map[el]);
	}
	return facade
};
// PASSPORT_HOST = 139.129.221.123;
// API_HOST = 139.129.221.123;
// UPLOAD_HOST = 139.129.221.123 ;
const baseURLs = ['http://139.129.221.123',];
const toMethod = (options) => {
	options.method = options.method || 'post'
	return (params = {}, attachedParams, config = {}) => {	
		return sendApiInstance(options.method, options.url, params, config,options.isType,options.baseURL)
	}
}
// 创建axios实例
const createApiInstance = (config = {},on,Type) => {
	let ds = on?on:0;
	const _config = {
		withCredentials: true, // 跨域
		baseURL: baseURLs[ds],		
		headers:{
			'Authorization':'Bearer '+localStorage.getItem('token'),
			'Content-Type':Type?Type:'application/x-www-form-urlencoded'
		},
	}	
	config = Object.assign(_config, config);
	return axios.create(config)
}
const sendApiInstance = (method, url, params, config = {},isType={},on) => {
	params = qs.stringify(params);
	if(!url){return}		
	let instance = createApiInstance(config,on)
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
			Message({dangerouslyUseHTMLString:true,message: msg});
		}
	},error => {	  
		Message({message: '服务器故障',type: 'warning'});
		return Promise.reject(error).catch(() => {
		})
	});
	if (method === 'get') {
//     params = {
//       params: params
//     }
	}
	return instance[method](url, params, config)
}
export default {
	generateApiMap
}
