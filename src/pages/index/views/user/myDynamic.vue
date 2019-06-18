<template>
	<div>
		<tophead></tophead>
		<div class="dysxboxd">
			<div class="dysxbox">
				<el-select @change="sxFn" v-model="value" placeholder="请选择">
					<el-option 
					  v-for="item in options"
					  :key="item.value"
					  :label="item.label"
					  :value="item.value">
					</el-option>
				  </el-select>
			</div>
		</div>
		<div class="csBox mygzBox">
			<list :config="data" ref="listDom">
				<template v-slot:todo="{ todo }">
					<box_a :el="setData(todo)"></box_a>
					<div v-if="todo.like_user" class="tjname">{{todo.like_user.username+' 推荐过'}}</div>
				</template>			
			</list>	
		</div>
	</div>
</template>
<script>
import tophead from './myHead2';
import list from '../../components/list';
import box_a from '../../components/box_a';
export default {
	components:{tophead,box_a,list},
	data(){
		return{
			data:{
				ajax:{
					url:'dynamic',					
				},
				pr:{type:1}
			},	
			options:[
				{value:1,label:'关注人发布的'},
				{value:2,label:'关注人推荐的'}
			],
			value:1,
		}
	},
	methods: {
		sxFn(on){	
			this.data.pr.type=this.value;			
			this.$refs.listDom.sxfn();
		},
		setData(da){
			let p = da.work;			
			return p;
		}
	}
}
</script>

<style>
.mygzBox li{
	position: relative;
}
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
.tjname{
    
    position: absolute;
	top: 192px;
    left: 10px;
    height: 31px;
    background: rgba(0,0,0,.5);
    border-radius: 20px;

    font-size: 14px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(255,255,255,1);
    line-height: 31px;
    padding: 1px 15px;
	
}
</style>
