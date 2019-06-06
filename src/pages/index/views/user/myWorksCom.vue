<template>
	<div>
		<tophead></tophead>
		<div class="csBox opodd">
			<list :config="data" ref="listDom">
				<template v-slot:todo="{ todo }">
					<div class="mylists">
						<div @click="openxq(todo)" class="myListBox_1">
							<img class="myListBox_1_1" :src="todo.face_pic">
							<div v-if="todo.status!=2" :class="['myListBox_1_2',todo.status==-2?'wtg':'balck']">{{todo.status==0?'待审核':todo.status==-2?'未通过':'草稿'}}</div>
						</div>
						<div @click="openxq(todo)" class="myListBox_2">
							<span class="myListBox_2_1" :title="todo.work_name">{{todo.work_name}}</span>
							<img v-if="todo.is_recommend==1" class="myListBox_2_2" src="/imge/zs_icon_tj.png">
						</div>
						
						<div @click="openxq(todo)" class="myListBox_3">
							<span class="myListBox_3_1">{{todo.classify_1_name+'-'+todo.classify_2_name}}</span>
							<span class="myListBox_3_2">{{backtime(todo.create_time)}}</span>
						</div>
						<div class="myListBox_4">
						
							<span class="myListBox_4_1" @click="showissetDatasXX(todo.work_id,todo.status)" v-if="todo.status==2">修改设置</span>
							<span @click="updata(todo.work_id)" class="myListBox_4_1" v-else-if="todo.status!=0">编辑</span>
						
							<span class="myListBox_4_2" @click="showTopc('delet',todo)">删除</span>
						</div>			
					</div>
				</template>			
			</list>
		</div>
		<div v-show="istopc" class="myListBox_6">
			<div class="myListBox_6_1">
				<img @click="hindTopc" class="myListBox_6_2" src="/imge/cj_00.png" alt="">
				<div v-if="topcType=='set'" class="myListBox_6_3">修改作品设置提交，平台审核通过后即可修改成功</div>
				<div v-if="topcType=='set'" class="myListBox_6_3">确定修改作品设置？</div>
				<div v-if="topcType=='delet'" class="myListBox_6_3">确定删除该作品？</div>
				<div class="myListBox_6_4">
					<span @click="hindTopc">取消</span>
					<span v-if="topcType=='delet'" @click="delWork()" class="myListBox_6_4_2">确定</span>
					<span v-if="topcType=='set'" class="myListBox_6_4_2">确定</span>
				</div>
			</div>
		</div>			
		<div v-show="issetDatasXX" class="setDatasXX">
			<div class="setDatasXX_1">
				<img  @click="hindissetDatasXX" class="myListBox_6_2" src="/imge/cj_00.png" alt="">
				<div class="setDatasXX_3">作品修改设置：{{form.work_name}}</div>
				<div class="setDatasXX_4">
					
					<div class="setDatasXX_4_2">
						<div class="setDatasXX_4_1">作品标签<span>标签可以将作品自动推荐给可能感兴趣的人</span></div>
						<div><Input class="setDatasXX_4_3" v-model="tags" :keyup="keydown"  :oType="'max'" :max="10"   :type="'text'" :placeholder="'输入标签，回车添加标签'" ref="tageds"></Input>还可添加{{5-form.labels.length}}个标签</div>
						<div class="setDatasXX_4_4">
							<span v-for="(el,index) in form.labels" :key="index">{{el}}<span @click="deletTage(todo)" class="iconfont pend">&#xe619;</span></span>
						</div>
					</div>
				</div>
				<div class="setDatasXX_5">
					<div class="setDatasXX_5_1">
						<div class="setDatasXX_5_1_1">作品类型<span class="setDatasXX_5_2_2"></span></div>
						<div class="setDatasXX_5_1_2">
							<el-cascader 
							:options="page2.classify"
							v-model="selectedOptions"
							>
							</el-cascader>
						</div>
					</div>
					<div class="setDatasXX_5_2">
						<div class="setDatasXX_5_1_1">版权说明<span class="setDatasXX_5_2_2"></span></div>
						<div class="setDatasXX_5_2_3">
							<el-select v-model="form.copyright" placeholder="请选择">
								<el-option
								v-for="item in bqList"
								:key="item.label"
								:label="item.label"
								:value="item.label">
								</el-option>
							</el-select>
							
						</div>
					</div>
				</div>
				<div class="setDatasXX_6">
					<div class="setDatasXX_6_1">是否设为平台投稿作品<span class="setDatasXX_6_2"></span><span class="setDatasXX_6_3">设置后，若该作品符合平台需求，则平台客服会联系创作者进行商业洽谈</span></div>
					<div class="setDatasXX_6_4">
						<label>
							<div :class="form.is_platform_work==1?'chekdOn':''"><div></div>
							<input class="page2_1_4file" v-model="form.is_platform_work" value="1" type="radio" name="isme" ></div>是
						</label>
						<label>
							<div :class="form.is_platform_work==0?'chekdOn':''"><div></div>
							<input class="page2_1_4file" v-model="form.is_platform_work" value="0" type="radio" name="isme" ></div>否
						</label>
					</div>
				</div>
				<div class="setDatasXX_7">
					<span @click="hindissetDatasXX">取消</span><span @click="upDataSet">确定</span>
				</div>
			</div>
		</div>
		
	</div>
</template>
<script>
import tophead from './myHead';
import {Message} from 'element-ui'
import Input from '../../components/input'
import list from '../../components/list';
export default {
	props:['isType'],
	components:{tophead,Input,list},
	name: 'myAll',
	data(){
		return {
			form:{labels:[]},
			selectedOptions:[],
			page2:{
				classify:[],
				classify_1:0,
				classify_2:0,
				classify_3:0,
			},
			tags:'',
			bqList:[{label:'禁止匿名转载；禁止商业使用；禁止个人使用。'},{label:'禁止匿名转载；禁止商业使用。'},{label:'不限制用途。'}],
			issetDatasXX:false,
			istopc:false,
			topcType:'',
			worksType:'',


			deletWorkid:'',
			setDataOn:'',
			setDataData:{},
			
			data:{
				ajax:{
					url:'getSelfWorkList',
				},
				pr:{},

			},
			
		}
	},
	created(){
		this.init();
	},	
	
	methods: {
		init(){
			this.data.pr.status = this.$parent.isType;
		},
		upDataSet(){		
			if(!window.userInfo){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}	
			let pr = this.form;
			pr.is_publish = 1;
			pr.step = 1;
			pr.access_token = window.userInfo.access_token;		
			pr.labels = JSON.stringify(pr.labels);
			this.api.saveWorks(pr).then((da)=>{
				if(!da){
					return
				}
				this.hindissetDatasXX();	
				Message({message:'修改成功正在审核'});							
			});		
		},
		showissetDatasXX(id){
			let pr = {
				access_token:window.userInfo.access_token,
				work_id:id,
				is_draft:0
			};
			this.api.getWorkDetail(pr).then((da)=>{
				if(!da){
					return
				}
				this.issetDatasXX = true;
				this.setDataOn = da;
				this.form = da;
				
				try{
					this.form.labels = JSON.parse(this.form.labels);
				}catch(e){}
				
				this.selectedOptions = [this.form.classify_1,this.form.classify_2,this.form.classify_3];
				if(this.page2.classify.length>0){
					return;
				}
				this.getClassify();				
			})
			
		},
		hindissetDatasXX(){
			this.issetDatasXX = false;
			this.setDataOn = '';
			this.form = {labels:[]};
			this.selectedOptions = [];
		},
		deletTage(on){
		
			this.form.labels.splice(on,1);
		},
		keydown(){
			if(!this.tags){
				return
			}
			if(this.form.labels.indexOf(this.tags)!=-1){
				Message({message: '该标签已添加'});
				return
			}
			if(this.form.labels.length===5){
				Message({message: '最多填写5个标签'});
				return
			}
			this.form.labels.push(this.tags);
			this.tags = '';
			this.$refs.tageds.clearValue();
		},
		getClassify(){
			
			if(!window.userInfo){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}
			let pr ={
				access_token:window.userInfo.access_token,
			};
			
			this.api.getClassify(pr).then((da)=>{
				if(!da){
					return
				}
				let p = JSON.stringify(da);
				p = p.replace(/classify_name/g,"label");
				p = p.replace(/id/g,"value");
				p = p.replace(/sub_data/g,"children");
				this.page2.classify = JSON.parse(p);
			})
		},
		updata(id){
			if(!id){
				return
			}
			this.$router.push({path: '/upload',query:{id:id}});	
		},
		showTopc(type,on){
			this.deletWorkon = on.work_id;
			this.topcType = type;
			this.istopc = true;
		},
		hindTopc(){
			this.topcType = '';
			this.deletWorkon = '';
			this.istopc = false;
		},
		delWork(){
			if(this.delWorkType==1){
				Message({message: '正在删除请稍候'});
				return
			}
			this.delWorkType=1;
			let pr = {
				access_token:window.userInfo.access_token,
				work_id:this.deletWorkon
			};
			this.api.delWork(pr).then((da)=>{
				this.delWorkType = 0;
				
				if(!da){					
					return
				}
				this.$refs.listDom.getData();
				this.hindTopc();
				Message({message: '删除成功'});				
				this.delWorkType = 0;
			}).catch(()=>{
				this.delWorkType = 0;		
			});
		},
		goUser(on){
			this.$router.push({path: '/works',query:{id:on.user_info.open_id}})	
		},
		backtime(time){
		
			return	window.getTimes(time);
		},	
		opend(ur){
			if(!ur){return}
			window.open(ur);
		},
		openxq(on){
			if(this.$route.fullPath=="/myPass"){
				window.open('#/cont?id='+on.work_id);
				return
			}
			window.open('#/conts?id='+on.work_id)
		},
	}
}
</script>

<style>
.mylists{
	margin: 0 20px 20px 0;
    background: #F6F6F6;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #f6f6f6;
}
.opodd{
	padding-top: 20px;
}
.worksBox{
	margin: 17px auto 0;
}
.worksBox_1{
	position: relative;
	width: 1300px;
	margin: 0 auto 17px;
	text-align: left;
	
}
.worksBox_2{
	cursor: pointer;
	position: absolute;
	right: 0;
	top: 0;
	font-size: 14px;
	color: #666666;
	text-align: center;
	width: 95px;
}
.worksBox_2:after{
	content: "";
    display: inline-block;
    width: 5px;
    height: 5px;
    border: 1px solid #666;
    border-bottom: 0;
    border-right: 0;
	margin-left: 8px;
    transform: rotate(-135deg);
    transform-origin: 70% 20%;
}
.worksBox_2:hover>.worksBox_2_1{
	display: block;
}
.worksBox_2_1{
	display: none;
	position: absolute;
	top: 19px;
	right: 0;

	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 95px;
	padding: 10px 0;
	
}
.worksBox_2_1>div{
	line-height: 30px;
	font-size: 14px;
	color: #333333;
}
.worksBox_2_1>.oncdf{
	background: #E6E6E6;
}
.worksBox_2_1>div:hover{
	background: #E6E6E6;
}
.myListBox{
	margin-bottom:120px;
}
.myAllbox{
	text-align: left;
	width: 1300px;
	
	margin: 20px auto 0;
}
.myListBox>li{
	display: inline-block;
	background: #F6F6F6;
	border-radius: 5.08px;
	margin: 0 20.2px 19.7px 0;
	width: 309.8px;
	height: 340.3px;
	overflow: hidden;
}
.myListBox>li:nth-child(4n+4){
	margin-right: 0;
}
.myListBox_1{
	position: relative;
	width: 308px;
	height: 231.6px;
	overflow: hidden;
}
.myListBox_1>.myListBox_1_1{	
	position: absolute;
	top: 0;
	left: 0;
	bottom: 0;
	right: 0;
	cursor: pointer;
	max-height: 100%;
	min-height: 100%;
	width: auto;
	height: auto;
	margin: auto;
	-webkit-transition: transform .1s linear;
	transition: transform .1s linear;
}
.myListBox_1:hover>.myListBox_1_1{
	-webkit-transform: scale(1.02);
	transform: scale(1.02);
}
.myListBox_1>.myListBox_1_2{
	cursor: pointer;
	position: absolute;
	top: 0;
	right: 0;
	border-radius: 0 5.08px 0 5.08px;
	width: 99.6px;
	height: 39.6px;
	line-height: 39.6px;
	text-align: center;
}
.myListBox_1>.balck{
	background: rgba(0,0,0,.5);
	color: #fff;
}
.myListBox_1>.wtg{
	
	color: #fff;
	background: rgba(255,0,0,.7);
}
.myListBox_2{
	text-align: left;
	margin: 6.4px 10px 3.1px;
}
.myListBox_2>.myListBox_2_1{
	cursor: pointer;
	display: inline-block;
	max-width: 271.89px;
	font-size: 16.25px;
	color: #1E1E1E;
	line-height: 23px;
	text-align: left;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.myListBox_2>.myListBox_2_2{
	float: right;
	margin-top: 4.4px;
	width: 14.2px;
	height: 14.2px;
	
}
.myListBox_3{
	margin: 0 10px 14.9px;
	font-size: 12.19px;
	color: #878787;
	line-height: 17px;
	text-align: left;
}
.myListBox_3_2{
	float: right;
}
.myListBox_4{
	margin: 0 10px 0;
	text-align: left;
}
.myListBox_4>span{
	cursor: pointer;
	display: inline-block;
	margin-right: 16.3px;
	width: 59.9px;
	height: 20px;
	text-align: left;
	line-height: 20px;
	font-size: 14.22px;
	color: #333333;
	
}
.myListBox_4>span:hover{
	color: #FF5121;
}

.myListBox_6{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	min-width: 1300px;
	background: rgba(0,0,0,.5);
}
.myListBox_6_1{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: -webkit-translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	padding: 27px 0 30px;
	
	
	width: 420px;
}
.myListBox_6_2{
	position: absolute;
	top: -26px;
	right: -26.2px;
	width: 26.2px;
	height: 26px;
	cursor: pointer;
}
.myListBox_6_2:hover{
	opacity: .7;
}
.myListBox_6_3{
	line-height: 20px;
	font-size: 14px;
	color: #1E1E1E;
	text-align: center;
	margin-bottom: 4px;
}
.myListBox_6_4{
	margin-top: 27px;
	text-align: center;
}
.myListBox_6_4>span{
	cursor: pointer;
	
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 98px;
	height: 38px;
	line-height: 38px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	margin:0 10px;
}
.myListBox_6_4>span:hover{
	opacity: .7;
}
.myListBox_6_4>.myListBox_6_4_2{
	background: #333333;
	color: #fff;
}
.myWorkNoData>img{
	display: block;
	margin: 179px auto;
}
.setDatasXX{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
}
.setDatasXX_1{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	
	width: 1020px;
	height: 709px;
}
.setDatasXX_3{
	
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
	line-height: 64px;
	font-size: 14px;
	color: #333333;
	text-align: left;
	padding-left: 30px;
	margin-bottom: 20px;
}
.setDatasXX_4{
	padding: 0 30px;
	text-align: left;
}
.setDatasXX_4_1{
	font-size: 14px;
	color: #333333;
	margin-bottom: 17px;
}
.setDatasXX_4_1>span{
	font-size: 14px;
	color: #999999;
	margin-left: 29px;
}
.setDatasXX_4_2{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 960px;
	
	box-sizing: border-box;
	padding: 30px;
	margin: 0 auto 20px;
}
.setDatasXX_4_3{
	display: inline-block;
    width: 360px;
    vertical-align: middle;
    margin-bottom: 0;
}
.setDatasXX_4_3>.myInput{
	border: 1px solid #979797;
	border-radius: 5px;
	width: 329px;
	height: 38px;
	overflow: hidden;
    padding: 0 10px;
}
.setDatasXX_4_4>span{
	display: inline-block;
	background: #E6E6E6;
	border-radius: 5px;
	padding: 5px 3px 5px 10px;
	font-size: 14px;
	color: #999999;
	margin: 12px 10px 0 0;
}
.setDatasXX_4_4>span>span{
	font-size: 13px;
    margin-left: 12px;
}
.setDatasXX_5,.setDatasXX_6{
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 960px;
	
	box-sizing: border-box;
	padding: 30px;
	margin: 0 auto 20px;
	text-align: left;
}
.setDatasXX_5_1{
	display: inline-block;
	margin-right: 221px;
}
.setDatasXX_5_2{
	display: inline-block;
}
.setDatasXX_5_1_1{
	font-size: 14px;
	color: #333333;
	margin-bottom: 17px;
}
.setDatasXX_5_2_2{
	display: inline-block;
	vertical-align: middle;
	width: 4px;
	height: 4px;
	background: #FF0000;
	margin-left: 9px;
}
.setDatasXX_6_1{
	font-size: 14px;
	color: #333333;
	margin-bottom: 19px;
}
.setDatasXX_6_2{
	display: inline-block;
	vertical-align: middle;
	width: 4px;
	height: 4px;
	background: #FF0000;
	margin-left: 9px;
	margin-right: 30px;
}
.setDatasXX_6_3{
	font-size: 14px;
	color: #999999;
}
.setDatasXX_6_4>label{
	position: relative;
	display: inline-block;
	margin-right: 30px;
	cursor: pointer;
}
.setDatasXX_6_4 input{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	opacity: 0;
}
.setDatasXX_6_4>label>div{
	display: inline-block;
	margin-right: 10px;
}
.setDatasXX_6_4>label>div>div{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 2px;
	width: 8px;
	height: 8px;
}
.chekdOn>div{
	background: #FF5121;
	border-color: #FF5121 !important;
}
.setDatasXX_7{
	position: absolute;
	bottom: 0;
	left: 0;
	width: 100%;
	background: #FFFFFF;
	box-shadow: 2px 0 0 4px rgba(0,0,0,0.05);
	border-radius: 0 0 5px 5px;
	line-height: 100px;
}
.setDatasXX_7>span{
	display: inline-block;
	border: 1px solid #999999;
	border-radius: 5px;
	width: 98px;
	height: 38px;
	line-height: 38px;
	font-size: 14px;
	color: #333333;
	text-align: center;
	margin:0 15px;
	cursor: pointer;
}
.setDatasXX_7>span:last-child{
	background: #333333;
	color: #fff;
}
.setDatasXX_5_2_3 .el-select{
	width: 357px;
}
.setDatasXX_5_2_3 .el-select input{
	padding: 0 10px;
}
</style>
