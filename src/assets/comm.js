export default {
	phone_encryption:function(val){
		if(!val){return}
		return val.substring(0, 3) + '****' + val.substring(7, 11);
	},
	email_encryption:function(val){
		if(!val){return}
		let str = val.split('@');
		if(str.length == 1) {
			return str[0];
		}
		return str[0].substring(0, 1) + '****' + str[0].substr(-1, 1) + '@' + str[1];
	},		
	money_deiv:function(val){
		let str = ''+val;
		return  str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
	},
	checkWz:function(da){
		if(!da && da!=0){
			return true;
		}
		if(da.trim().length==0){
			return true;
		}
		return false;
	},
}
