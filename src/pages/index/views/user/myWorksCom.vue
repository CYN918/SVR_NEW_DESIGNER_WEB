<template>
	<div>
		<tophead :con="navData"></tophead>
		<div class="draftboxd" v-if="isMyAll()">
			<div class="draftbox">
				<!-- <span class="draftBtn" @click="goZP">草稿箱{{draftNum}}</span> -->
				<span class="iconfont  messgeH1">
					<span class="pend" style="color: #bbb;font-size:14px;" @click="goZP">
						草稿箱
						<img style="margin-left:10px;width:23px;height:16px;" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/icon_wdcz_cgx.svg"/>
						<div @click="goZP" v-if="draftNum && draftNum>0" :class="['messgeH2','customMess',draftNum>9?'messgeH2x':'']">
							{{backXXnUM(draftNum)}}
						</div>
					</span>
					
				</span>
			</div>
		</div>
		<div class="csBox opodd">
			<list :config="data" ref="listDom">
				<template v-slot:todo="{ todo }">
					<div class="mylists" @mouseover="addClass($event, this)">
						<div @click="openxq(todo)" class="myListBox_1">
							<div class="mywus_n1" :style="backFm(todo.face_pic)"></div>
							<div v-if="todo.status!=2" :class="['myListBox_1_2',todo.status==-2?'wtg':todo.status==0?'org':'balck']">{{todo.status==0?'待审核':todo.status==-2?'未通过':'草稿'}}</div>
						</div>
						<div class="wk_a_2 custom_wk_a_2">
							<div class="wk_a_2_1">
							
								<span class="hft">{{todo.work_name}}</span>
								<img v-if="todo.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/works/icon_r.svg" />
							</div>
							<div class="wk_a_2_2">
								<span>{{todo.classify_1_name}}</span>{{todo.classify_2_name+'-'+todo.classify_3_name}}
								<i v-if="!isMyAll()" style="float:right">{{backtime(todo.create_time)}}</i>
							</div>
							<div v-if="isMyAll()" class="wk_a_2_3">
								<span v-for="(eld,index) in icons" :key="index" class="pend"><img :src="eld.i">{{todo[eld.n]}}</span>

							</div>
						</div>
						<div v-if="isMyAll()" class="wk_a_2_4">
							<span>{{backtime(todo.create_time)}}</span>
						</div>
						<!-- <div @click="openxq(todo)" class="myListBox_2">
							<span class="myListBox_2_1" :title="todo.work_name">{{todo.work_name}}</span>
							<img v-if="todo.is_recommend==1" class="myListBox_2_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/works/icon_r.svg">
						</div>
						
						<div @click="openxq(todo)" class="myListBox_3">
							<span class="myListBox_3_1">{{todo.classify_1_name+'-'+todo.classify_2_name}}</span>
							<span class="myListBox_3_2">{{backtime(todo.create_time)}}</span>
						</div> -->
						<div class="myListBox_4" v-if="!isMyAll()">
							<span>最后修改日期:{{backtime(todo.create_time)}}</span>
							<div class="handle-container">
									<el-button @click="showTopc('delet',todo)">删除作品</el-button>
									<el-button type="primary" @click="showissetDatasXX(todo.work_id,todo.status)" v-if="todo.status==2">修改设置</el-button>
									<el-button type="primary" @click="updata(todo)" v-else-if="todo.status!=0">编辑作品</el-button>
							</div>
							<!-- <span class="myListBox_4_1" @click="showissetDatasXX(todo.work_id,todo.status)" v-if="todo.status==2">修改设置</span>
							<span @click="updata(todo)" class="myListBox_4_1" v-else-if="todo.status!=0">编辑</span>					
							<span class="myListBox_4_2" @click="showTopc('delet',todo)">删除</span> -->
						</div>
						<div class="myListBox_5" v-if="isMyAll()">
							<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/icon_more.svg" class="bt-Img">
							<div class="moreHandleContainer">
								<div v-if="todo.is_selected != 1 && todo.like_num < 5 && todo.status != '0'" @click="updata(todo)">编辑</div>
								<div v-else @click="showissetDatasXX(todo.work_id,todo.status)">修改设置</div>
								<div @click="showTopc('delet',todo)">删除</div>
							</div>
							<!-- <el-dropdown trigger="click" placement="bottom-end">
								<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/icon_more.svg" class="bt-Img">
								<el-dropdown-menu class="sel-tooltip" slot="dropdown">
									<el-dropdown-item class="comonbtn" style="width:80px;height:32px;margin:0;line-height:32px;text-align: center;padding:0;" v-if="todo.is_selected != 1 && todo.like_num < 5" @click.native="updata(todo)">编辑</el-dropdown-item>
									<el-dropdown-item class="comonbtn" style="width:80px;height:32px;margin:0;line-height:32px;text-align: center;padding:0;" v-else @click.native="showissetDatasXX(todo.work_id,todo.status)">修改设置</el-dropdown-item>
									<el-dropdown-item class="comonbtn" style="width:80px;height:32px;margin:0;line-height:32px;text-align: center;padding:0;" @click.native="showTopc('delet',todo)">删除</el-dropdown-item>
								</el-dropdown-menu>
							</el-dropdown>	 -->
						</div>		
					</div>
				</template>			
			</list>
		</div>
		
		<TcBoxQr :config="config2" ref="tcBox2"></TcBoxQr>			
				
		<TcBox :config="config" ref="tcBox">
			<template v-slot:todo="{ todo }">			
				<div class="necsgg">
				<div class="setDatasXX_4">					
					<div class="setDatasXX_4_2">
						<div class="setDatasXX_4_1">作品标签<span>标签可以将作品自动推荐给可能感兴趣的人</span></div>
						<div>
							<mInput 
							class="setDatasXX_4_3 setDatasXX_4_3qz" 
							v-model="tags" 
							:keyup="keydown"  
							:oType="'max'" 
							:max="10"   
							:type="'text'" 
							:placeholder="'输入标签，回车添加标签'" 
							ref="tageds">
							</mInput>
							<span @click="keydown" :class="['tagBtn',isTageok?'istageok':'']">添加标签</span>还可添加{{5-form.labels.length}}个标签
						</div>
						<div class="setDatasXX_4_4">
							<span v-for="(el,index) in form.labels" :key="index">{{el}}<span @click="deletTage(index)" class="iconfont pend">&#xe619;</span></span>
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
				
				</div>
				
				
				<div class="setDatasXX_7">
					<span @click="hindissetDatasXX">取消</span><span @click="upDataSet">确定</span>
				</div>
				
			</template>			
		</TcBox>		
				
				
		<div v-show="issetDatasXX" class="setDatasXX">
			<div class="setDatasXX_1">
				
				<img  @click="hindissetDatasXX" class="myListBox_6_2" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png" alt="">
				<div class="ydbbdf">
				<div class="setDatasXX_3 dywd">作品修改设置：{{form.work_name}}</div>
				<div class="setDatasXX_3">作品修改设置：{{form.work_name}}</div>
				
			</div></div>
		</div>
		
	</div>
</template>
<script>
import tophead from './myHead';
import {Message} from 'element-ui'
import mInput from '../../components/input'
import list from '../../components/list';
import TcBox from '../../components/TcBox';
import TcBoxQr from '../../components/TcBoxQr';
export default {
	props:['isType'],
	components:{tophead,mInput,list,TcBox,TcBoxQr},
	name: 'myAll',
	data(){
		return {
			icons:[
				{i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_gk.svg',n:'view_num'},
				{i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_dz.svg',n:'like_num'},
				{i:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/see/zs_icon_xx.svg',n:'comment_num'},
				
			],
			config:{
				title:'作品修改设置：音乐测试',
			},
			config2:{
				title:'删除确认',
				cent:'确定删除该作品？',
				closeFnd:'closeqd',
				qFn:'delWork',
				closeFn:'closeqd'
			},
			navData:{
				title: this.isMyAll() ? '我的创作' : '草稿箱',
				// list:[
				// 	{a:'/myAll',b:'全部'},
				// 	{a:'/myExamine',b:'待审核'},
				// 	{a:'/myPass',b:'已通过'},
				// 	{a:'/myNotPass',b:'未通过'},					
				// 	{a:'/myDraft',b:'草稿'}
				// ],
				bdtj: this.isMyAll() ? '我的创作' : '草稿箱'				
			},
			form:{labels:[]},
			selectedOptions:[],
			page2:{
				classify:[],
				classify_1:0,
				classify_2:0,
				classify_3:0,
			},
			isTageok:'',
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
			upType:'',			
			isTypeList:{
				myAll:[0, 2],
				// myExamine:'0',
				// myNotPass:'-2',
				// myPass:'2',
				myDraft:[-1, -2]
			},
			draftNum: 0
		}
	},
	created(){
		this.init();
	},	
	watch: {
		'tags'(){
			
			if(this.tags){
				this.isTageok =1;
			}else{
				this.isTageok = '';
			}
		},
		'$route': function() {
			this.init();
			this.$refs.listDom.getData();
		},
	},
	mounted() {
		document.body.addEventListener('click', (e) => {
			let event = e || window.event;
			let target = event.target || event.srcElement;
			if (target.tagName == 'IMG' && target.src == 'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/icon_more.svg') {
				target.parentElement.querySelector('.moreHandleContainer').classList.add('trigger')
				return
			}
			document.querySelectorAll('.myListBox_5').forEach(item => {
				item.classList.remove('_hover')
			})
			document.querySelectorAll('.trigger').forEach(item => {
				item.classList.remove('trigger')
			})
		})
	},
	methods: {
		// bakci(sr,ck){
			
		// 	let on = sr.indexOf(ck);
		// 	if(on==-1){
		// 		return sr;
		// 	}
			
		// 	var re =new RegExp(ck);
		// 	return sr.replace(re,"<span>"+ck+"</span>")
		// },
		addClass(e) {
			let event = e || window.event;
			let target = event.target || event.srcElement;
			if (target && target.className == 'mywus_n1') {
				let children = target.parentElement.parentElement.children, addTar;
				for (let i in children) {
					if (children[i].className == 'myListBox_5') addTar = children[i]
				}
				if (addTar) addTar.className = 'myListBox_5 _hover'
			}
		},
		isMyAll() {
			return this.$route.name == 'myAll'
		},
		backXXnUM(n) {
			if (n > 999) return 999
			return n
		},
		goZP() {
			this.$router.push({ path: '/myDraft' })
		},
		// filterDataFunc(data) {
		// 	const statusOptions = this.$route.name == 'myAll' ? ['0', '2'] : ['-1', '-2']
		// 	this.draftNum = data.filter(item => item.status == '-1' || item.status == '-2').length
		// 	return data.filter(item => statusOptions.indexOf(item.status) > -1)
		// },
		show(){
			this.$refs.tcBox.show();
		},
		close(){
			this.$refs.tcBox.close();
		},
		loadUnreadNum() {
			this.api['getUnreadNum']({}).then(res => {
				this.draftNum = res.num
				console.log(this.draftNum)
			})
		},
		draftUnread() {
			this.api['draftUnread']({}).then(res => {
			})
		},
		init(){
			this.data.pr.status =  this.isTypeList[this.$route.name].join(',');
			// this.data.pr.status =  'all';
			this.navData = {
				title: this.isMyAll() ? '我的创作' : '草稿箱',
				bdtj: this.isMyAll() ? '我的创作' : '草稿箱'
			}
			this.loadUnreadNum()
			if (this.$route.name == 'myDraft') this.draftUnread()
		},
		backFm(ur){
			if(!ur || ur==null || ur==undefined || ur=='null' || ur=='undefined'){
				return 'background-image: url(https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/new/com/no_img.svg);background-size:70%;';
			}
			return 'background-image: url('+ur+');';
			
		},
		upDataSet(){	
			
			if(this.upType==1){
				Message({message: '正在提交请稍后'});
				return
			}
			if(!window.userInfo){
				Message({message: '登录过期请先登录'});
				setTimeout(()=>{
					this.$router.push({path:'/login'})
				},1000);
				return
			}	

			let pr = {
				is_publish:1,
				work_id:this.form.work_id,
				work_name:this.form.work_name,
				content:this.form.content,
				face_pic:this.form.face_pic,
				classify_1:this.selectedOptions[0],
				classify_2:this.selectedOptions[1],
				classify_3:this.selectedOptions[2],
				copyright:this.form.copyright,
				labels:JSON.stringify(this.form.labels),
				step:2,
				attachment_id:this.form.attachment_id,
				attachment_visible:this.form.attachment_visible,
				is_platform_work:this.form.is_platform_work,
				link_ids:this.form.link_ids
			};

			this.upType=1;
			this.api.saveWorks(pr).then((da)=>{
				this.upType='';
				if(da=='error'){
					return
				}
				this.hindissetDatasXX();	
				this.$refs.listDom.getData();
				Message({message:'修改成功'});							
			}).catch(()=>{
				this.upType='';
			});		
		},
		showissetDatasXX(id){
			let pr = {
				access_token:window.userInfo.access_token,
				work_id:id,
				is_draft:0
			};
			this.bdtj('我的创作','已通过-修改设置','--');
			this.api.getWorkDetail(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.config.title = '作品修改设置：'+da.work_name;
				this.setDataOn = da;		
				this.form = da;
				this.show();
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
			this.close();
			this.setDataOn = '';
			this.form = {labels:[]};
			this.selectedOptions = [];
		},
		deletTage(on){
		
			this.form.labels.splice(on,1);
		},
		keydown(){
			if(!this.isTageok){
				return
			}
			if(!this.tags){
				return
			}
			if(!this.form.labels){
				this.form.labels = [];
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
				if(da=='error'){
					return
				}
				let p = JSON.stringify(da);
				p = p.replace(/classify_name/g,"label");
				p = p.replace(/id/g,"value");
				p = p.replace(/sub_data/g,"children");
				this.page2.classify = JSON.parse(p);
			})
		},
		backType(t){
			let a = '';
			if(t==-1){
				a = '草稿';
			}
			if(t==-2){
				a = '未通过';
			}
			if(t==0){
				a = '待审核';
			}
			if(t==2){
				a = '已通过';
			}
			return a;
		},
		updata(o){
			let id = o.work_id;
			if(!id){
				return
			}
			this.bdtj('我的创作',this.backType(o.status)+'-编辑','--');
			this.$router.push({path: '/upload',query:{id:id}});	
		},
		showTopc(type,on){
			this.bdtj('我的创作',this.backType(on.status)+'-删除','--');
			this.$refs.tcBox2.show();
			this.deletWorkon = on.work_id;
			this.topcType = type;
			this.istopc = true;
		},
		closeqd(){
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
				
				if(da=='error'){					
					return
				}
				
				this.$refs.listDom.getData();
				
				Message({message: '删除成功'});
	
				this.$refs.tcBox2.close();
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
			this.bdtj('我的创作','点击作品','--');
			if(on.status==2){
				window.open('#/cont?id='+on.work_id);
				return
			}
			window.open('#/conts?id='+on.work_id)
		},
	}
}
</script>

<style scoped="scoped">
.custom_wk_a_2{
	border-bottom: 1px solid #F4F6F9;
}
.wk_a_2_2 i{
	font-style: normal;
}
.wk_a_2_4{
	font-size: 12px;
	color: #bbb;
	height: 45px;
	line-height: 45px;
	margin: 0 15px;
}
.draftboxd{
	position: relative;
	width: 1300px;
	margin: 0 auto;
}
.draftbox{
	position: absolute;
	top: -50px;
	right: 1px;
}
.draftBtn{
	font-size: 14px;
	color: #999;
	cursor: pointer;
}
.customMess{
	top: -10px;left: 66px;
	height: 16px;
	min-width: 16px;
}
.mylists{
	margin: 0 20px 20px 0;
    background: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    border: 1px solid #f6f6f6;
	position: relative;
	overflow: hidden;
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
	margin-bottom: 10px;
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
	top: 15px;
	left: 15px;
	border-radius: 3px;
	width: 52px;
	height: 22px;
	font-size: 12px;
	line-height: 22px;
	text-align: center;
}
.myListBox_1>.balck{
	background: rgba(0,0,0,.5);
	color: #fff;
}
.myListBox_1>.org{
	background: #FF9200;
	color: #fff;
}
.myListBox_1>.wtg{
	
	color: #fff;
	background: #FF3B30;
}
.myListBox_2{
	text-align: left;
	margin: 10px 10px 8px;
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
	margin: 0 10px 18px;
	font-size: 12.19px;
	color: #878787;
	line-height: 17px;
	text-align: left;
}
.myListBox_3_2{
	float: right;
}
.mylists:hover .myListBox_4{
	bottom: 0;
}
.myListBox_4{
	width: 100%;
	height: 80px;
	/* margin: 0 10px 0; */
	text-align: center;
	position: absolute;
	bottom: -80px;
	background: #fff;
	transition: bottom 0.3s;
	font-size: 12.19px;
    color: #878787;
    line-height: 17px;
	padding-top: 13px;
}
.myListBox_4 .handle-container{
	margin: 10px 0;
}
.myListBox_4 .el-button{
	padding: 8px 30px;
}
/* .myListBox_4>span{
	cursor: pointer;
	display: inline-block;
	margin-right: 16.3px;
	width: 59.9px;
	height: 20px;
	text-align: left;
	line-height: 20px;
	font-size: 14.22px;
	color: #333333;
	margin-bottom: 9px;
	
}
.myListBox_4>span:hover{
	color: #33B3FF;
} */

.myListBox_5{
	position: absolute;
	right: 0;top: 0;
	visibility: hidden;
}
.myListBox_5._hover{
	visibility: visible;
}
.myListBox_5 .moreHandleContainer{
	visibility: hidden;
	width: 68px;
	padding: 5px 0;
	text-align: center;
	font-size: 14px;
	color: #333;
	border-radius: 5px;
	position: absolute;
	right: 16px;top: 33px;
	background: #fff;
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
}
.myListBox_5 .moreHandleContainer.trigger{
	visibility: visible;
}
.myListBox_5 .moreHandleContainer div{
	height: 44px;
	line-height: 44px;
	background: #fff;
}
.myListBox_5 .moreHandleContainer div:hover{
	background: #F2F2F2;
}
/* .myListBox_5 .comonbtn{
	width:124px;
	height:32px;
	margin:0;
	line-height:32px;
	text-align: right;
	padding-right: 10px;
} */

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
	height: 620px;
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
	background: #fff;
	width: 960px;
	border-radius: 5px;
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
    padding: 0 3px 0 10px;
    font-size: 14px;
    color: #999999;
    margin: 12px 10px 0 0;
    height: 28px;
    line-height: 28px;
}
.setDatasXX_4_4>span>span{
	font-size: 13px;
    margin-left: 12px;
}
.setDatasXX_5,.setDatasXX_6{
	background: #fff;
	width: 960px;
	border-radius: 5px;
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
	background: #33B3FF;
	border-color: #33B3FF !important;
}
.setDatasXX_7{
	width: 100%;
	background: #FFFFFF;
	box-shadow: 2px 0 0 4px rgba(0,0,0,0.05);
	border-radius: 0 0 5px 5px;
	line-height: 100px;
}
.necsgg{
	background: #f4f6f9;
	padding: 40px 0;
	height: 464px;
	overflow: hidden;
	overflow-y: auto;	    
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
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
.setDatasXX_5_2_3 .el-select{
	width: 357px;
}
.setDatasXX_5_2_3 .el-select input{
	padding: 0 10px;
}
.ydbbdf{
	overflow-y: auto;
    height: 83%;
}
.dywd{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	box-sizing: border-box;
}
.tagBtn{
	cursor: pointer;
	display: inline-block;
	vertical-align: middle;
	text-align: center;
	width:100px;
	height:40px;
	background:rgba(223, 223, 223, 1);
	border-radius:5px;
	font-size:14px;
	font-weight:400;
	color:rgba(187, 187, 187, 1);
	line-height:40px;
	margin-right: 10px;
}
.istageok{
	color: #fff;
	background: #33B3FF;
}
.setDatasXX_4_3qz{
	height: 40px !important;
}
.mywus_n1{
	cursor: pointer;
	width: 308px;
    height: 231.6px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50%,50%;
	-webkit-transition: transform .1s linear;
	transition: transform .1s linear,;
	-webkit-transform-origin: center;	
	transform-origin: center;
}
</style>
