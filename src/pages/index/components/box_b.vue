<template>
	<div class="box_22_x">
		<img class="pend" @click="goFans('/works',el.open_id)" :src="el.avatar">
		<div class="i_listd2_1">
			<div class="pend" @click="goFans('/works',el.open_id)">{{el.username}}</div>
			<div>{{el.province}} | {{el.city}}</div>
			<div class="i_listd2_d">
				<span class="pend" @click="goFans('/followFans',el.open_id)">粉丝<span>{{el.fans_num}}</span></span>
				<span>人气<span>{{el.popular_num}}</span></span>
				<span class="pend" @click="goFans('/works',el.open_id)">创作<span>{{el.work_num}}</span></span>
			</div>
			<div>{{el.personal_sign?todo.personal_sign:'这个人很懒，什么都没说~'}}</div>
			<div class="btns_foll">
				<span @click="showFpllwodel(el)" v-if="el.follow_flag==2">互相关注</span>
				<span @click="showFpllwodel(el)" v-else-if="el.follow_flag==1">已关注</span>
				<span class="jsBtn" @click="Follow_add(el)" v-else>关注</span>
				<span @click="gosx(el)">私信</span>
			</div>
		</div>
		<div class="lunbox">			
			<ul v-if="el.works.length>0">
				<li v-if="index2<3" v-for="(el2,index2) in el.works" :key="index2"><img @click="openxq(el2.work_id)" :src="el2.face_pic"></li>							
			</ul>			
		</div>
	</div>
	
</template>

<script>
import {Message} from 'element-ui'
export default {
	props:{
		el:{
			type:Object,
			default:{}
		}
	},
	data(){
		return{
			follwTyle:'',
		}
	},
	methods: {
		openxq(on){			
			window.open('#/cont?id='+on)
		},
		gosx(el){
			let pr = {
				open_id:el.open_id,
				avatar:el.avatar,
				username:el.username,
				city:el.city,
				vocation:el.vocation,
			};
			this.$router.push({path:'/chat',query:pr});
		},
		goFans(d,id){
			this.$router.push({path:d,query:{id:id}});
		},
		showFpllwodel(el){
		
			this.$parent.$parent.setSQ(el);
		},
		Follow_del(el){
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				follow_id:el.open_id
			};
			this.api.Follow_del(pr).then((da)=>{
				if(da=='error'){
					this.follwTyle=0;
					return
				}
				this.follwTyle=0;
				Message({message: '取消关注成功'});
				el.follow_flag=0;
			}).catch(()=>{
				this.follwTyle = 0;		
			});
		},
		Follow_add(el){
			if(!window.userInfo){
				this.$router.push({path: '/login'})
				return
			}
			if(this.follwTyle==1){
				return
			}
			this.follwTyle=1;
			let pr = {
				follow_id:el.open_id
			};
			this.api.Follow_add(pr).then((da)=>{
				this.follwTyle=0;
				if(da=='error'){
					return
				}
				el.follow_flag = da.follow_flag;
				Message({message: '关注成功'});
			}).catch(()=>{
				this.follwTyle = 0;		
			});
		},
	}
}
</script>
<style>
.box_22_x{
	text-align: left;
    display: block;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-top: 30px;
    background: #FFFFFF;
    -webkit-box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
    width: 1300px;
    height: 215px;
    margin: 0 auto 20px;
}
.box_22_x>img{
	display: inline-block;
    margin: 0 20px 0 30px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
}
</style>
