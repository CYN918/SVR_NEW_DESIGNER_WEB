<template>
	<div>
		<tophead></tophead>
		<div class="dysxboxd">
		<div class="dysxbox">
			<el-select @change="getCsData" v-model="value" placeholder="请选择">
				<el-option 
				  v-for="item in options"
				  :key="item.value"
				  :label="item.label"
				  :value="item.value">
				</el-option>
			  </el-select>
		</div>
		</div>
		<div class="mygzBox">
		<ul class="i_listd" v-if="List.length>0">
			<li  v-for="(el,index) in List" :key="index">
				<div @click="openxq(index)" class="i_listd1x1"><img class="i_listd1" :src="el.work.face_pic"> <div v-if="el.like_user" class="whotj">{{el.like_user.username.slice(0,10)}}<span>推荐过</span></div></div>
				
				<div class="i_listd2">
					<div @click="openxq(index)" class="i_listd2_1"><span :title="el.work.work_name">{{el.work.work_name.slice(0,10)}}</span> <img v-if="el.work.is_recommend==1" src="/imge/zs_icon_tj.png" alt=""></div>
					<div @click="openxq(index)" class="i_listd2_2"><span>{{el.work.classify_1_name+'-'+el.work.classify_2_name}}</span><span>{{backtime(el.work.create_time)}}</span></div>
					<div class="i_listd2_3">
						<span><img @click="goUser(index)" :src="el.work.user_info.avatar" alt=""></span>
						
						<div class="i_listd2_3x1" @click="openxq(index)">
							<span class="pend"><img src="/imge/icon/zs_icon_gk.png">{{el.work.view_num}}</span>
							<span class="pend"><img src="/imge/icon/zs_icon_dz.png">{{el.work.like_num}}</span>
							<span class="pend"><img src="/imge/icon/zs_icon_xx.png">{{el.work.comment_num}}</span>
						</div>
					</div>
				</div>
			</li>
		</ul>
		<div class="pagesddd wsjzt" v-if="List.length==0"><img  class="wusj2" src="/imge/wsj2.png" alt=""></div>
		<el-pagination v-if="List.length>0" class="pagesddd"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page"
		:page-sizes="[40, 80, 120, 160]"
		:page-size="limit"
		layout="prev,pager, next,sizes, jumper"
		:total="total">   
		</el-pagination>
		</div>
	</div>
</template>

<script>
import { Loading } from 'element-ui';
import tophead from './myHead2';

export default {
	components:{tophead},
	data(){
		return{
			List:[],
			options:[
				{value:1,label:'关注人发布的'},
				{value:2,label:'关注人推荐的'}
			],
			value:1,
			page:1,
			limit:40,
			total:0,
			loading: '',
		}
	},
	mounted: function () {	
		
		this.getHList();
		
	}, 
	methods: {
		goUser(on){
			
			this.$router.push({path: '/works',query:{id:this.List[on].work.user_info.open_id}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	
		opend(ur){
			if(!ur){return}
			window.open(ur);
		},
		openxq(on){
			window.open('#/cont?id='+this.List[on].work_id)
		},
		getCsData(){
			
			this.page=1;
			this.limit=40;
			this.getHList();
		},
		getHList(){
			let params = {
				page:this.page,
				limit:this.limit,
				access_token:window.userInfo.access_token,
				type:this.value,
			}
			this.loading = Loading.service({ fullscreen: true });
			this.api.dynamic(params).then((da)=>{
				if(!da){
					return
				}
				this.List = da.data;
			
				this.total = da.total;
				document.documentElement.scrollTop =0;
				document.body.scrollTop =0;
				this.loading.close();
			})
		},
		handleSizeChange(val) {
			this.limit = val;
			this.getHList();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getHList();
		}
	}
	
	
	
	
}
</script>

<style>
.mygzBox{
	padding-top: 20px;
}
.dysxboxd{
	position: relative;
	width: 1300px;
	margin: 0 auto;
}
.dysxbox{
	position: absolute;
	top: -60px;
	right: 1px;
}
.dysxbox input{
	border: none;
	width: 120px;
	font-size: 14px;
	color: #999999;
}
.mygzBox .i_listd{
	min-height: 507px;
}
.mygzBox .i_listd1x1{
	position: relative;
}
.whotj{
    position: absolute;
    bottom: 10px;
    left: 10px;
    background: rgba(0,0,0,.5);
    font-size: 14.22px;
    color: #FFFFFF;
    line-height: 30.5px;
    width: 132.1px;
    text-align: center;
    border-radius: 20px;
}
.whotj>span{
	margin-left: 10px;
}
.wsjzt{
	min-height: 602px;
}
</style>
