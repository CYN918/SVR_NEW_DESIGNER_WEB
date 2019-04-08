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
		return sendApiInstance(options.method, options.url, params, config,options.isType,options.baseURL,options.Type)
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
const sendApiInstance = (method, url, params, config = {},isType={},on,Type) => {
	
	if (method === 'post') {
		params = qs.stringify(params);
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
				localStorage.setItem('userT','');
				let	pass = localStorage.getItem('pass');
				window.userInfo='';
				
				if(pass){
					axios({
						method: 'post',
						url: '/user/12345',
						data:JSON.stringify(pass)
					}).then((da)=>{				
						localStorage.setItem('userT',JSON.stringify(da));				
						if(da.is_detail==0){
							window.location.href = '#/userme';	
							return
						}
						window.location.href = '#/';																	
					}).catch(()=>{	
						window.passIn='';
						localStorage.setItem('pass','');
						window.location.href = '#/login';			
					});						
				}				
				window.location.href = '#/login';		
				return
			}
			Message({dangerouslyUseHTMLString:true,message: data});
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
