<template>
	
</template>

<script>
export default {

	name: 'xxx',
	data(){
		return{
			chatData:{},
		}
	},
	props: {
		tcData:Object,
		default:{
			img:'/imge/nav_tx.png',
			name:'未知的',
			ad:'未知',
			zy:'',
			fs:0,
			rq:0,
			cz:0,
			follwTyle:0,
		}
	},
	
	mounted: function () {	
		this.chatData = {
			open_id:this.tcData.user_info.open_id,
			avatar:this.tcData.user_info.avatar,
			username:this.tcData.user_info.username,
			city:this.tcData.user_info.city,
			vocation:this.tcData.user_info.vocation,
		};
	}, 
	
	methods: {

		gosx(){
			this.$router.push({path:'/chat',query:{openid:this.tcData.user_info.open_id,avatar:this.tcData.user_info.avatar,username:this.tcData.user_info.username}});
		},



	}
}
</script>

<style>

</style>
