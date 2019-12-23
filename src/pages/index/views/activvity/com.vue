<template>
	<div>
		<div class="detail_topBox">
			<div class="detail_topBox_1" :style="backBn(infoData.banner)"></div>
			<div class="detail_topBoxx_1po">
			<div class="detail_topBoxx_1">
			<div class="detail_topBox_2x">
				<div class="detail_topBox_2x_1">{{infoData.activity_name}}</div>
				<div class="detail_topBox_2x_2">{{infoData.category_name}}&nbsp&nbsp&nbsp&nbsp<span>{{backtimed(infoData.start_time) }} 至 {{backtimed(infoData.end_time)}}</span></div>
			</div>
			<div class="detail_topBox_2">
				<div v-if="infoData.status==1">
					<span v-if="infoData.is_provide_template==1" @click="downMoble(infoData)" class="detail_topBox_2_1">下载模板</span>
					<span v-if="infoData.setting_type!=1"  @click="showZp" class="detail_topBox_2_2 iconfont">&#xe61e;上传作品</span>
				</div>			
				<span v-if="infoData.status==-1" class="detail_topBox_2_3">已结束</span>
			</div>
			</div>
			</div>
		</div>
		<div class="detail_navN_1">
			<pTop class="" :cn="topCn">
				<template v-slot:todo="{ todo }">
					<div class="detail_nav">
					<a  @click="godefle('/detailed')" :class="['pend',ond==1?'router-link-exact-active':'']">活动详情</a>
					<a v-if="infoData.setting_type>2"  @click="godefle('/detailed/into')" :class="['pend',ond==2?'router-link-exact-active':'']">入围作品</a>
					<a v-if="infoData.setting_type>3" @click="godefle('/detailed/admission')" :class="['pend',ond==3?'router-link-exact-active':'']">录用作品</a>				
					<span @click="fxclick" class="detail_nav_1 iconfont pend">&#xe64c; 分享</span>
					</div>
				</template>		
			</pTop>
			
			
			
		</div>
		
		<div class="Acomd">
			<component v-bind:is="tcZj"></component>	
			
		</div>
		
		<TcBox :config="config" ref="tcBox">
			<template v-slot:todo="{ todo }">
				<div class="pushDeletBox4">
					<ul class="zp_box" @scroll="test">
						
						<li @click="checkZp(el.work_id)" :class="(work_id.indexOf(el.work_id)!=-1 || el.is_attend==1)?'chekonzp':''" v-for="(el,index) in zpList" :key="index">
							<img class="zp_box_1" :src="el.face_pic">
							<div class="zp_box_2">
								{{el.work_name.slice(0,10)}}
								<img v-if="el.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/zs_icon_tj.svg" alt="">
							</div>
							<div class="zp_box_3">
								{{el.classify_1_name+'-'+el.classify_2_name}}
								<span>{{backtime(el.create_time)}}</span>
							</div>
							<div class="zp_box_4">
								<img :src="mJs.Cavars(el.user_info.avatar)" alt="">
								<div>
									<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
									<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
									<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
								</div>
							</div>
						</li>
						<div ref="botmm"></div>
						<div v-if="isnoData">
							<img  class="upImnoData" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/k/empty_nodata@3x.png"/>
							<div class="noDatawan">找不到数据了o(╥﹏╥)o</div>
						</div>
						
					</ul>
				</div>
				<div class="pushDeletBox5">
					<span @click="gopushzp" class="pend">发布新作品</span>
					<span @click="pushOk" class="pend btn_n3">上传</span>
				</div>
				
			</template>			
		</TcBox>

		<TcCertification :certification="certification" ref="tcCertification">
			<template v-slot:todoRz="{ todoRz }">
				<el-steps :space="200" :active="active" finish-status="success" simple>
					<el-step title="报名认证信息"></el-step>
					<el-step title="选择参与作品"></el-step>
				</el-steps>
				<div v-if="active == 0">
					<p class="textExplains">{{remeber_tips}}</p>
					<div class="demo-ruleForm" style="margin-top: 30px;min-width: 800px;">
						<div v-for="(item,index) in list">
							<div class="Information" v-if="item.limittype == 'text'" style="height: 50px;">
								<div>
									<p>{{item.title}}</p>
								    <el-input type="text" v-model="datas[index]" :placeholder=item.tigs :maxlength=item.limitnum show-word-limit @change="checkValue(item,index)"></el-input>
								</div>								
							</div>
							<div class="Information InformationUpload" v-else>	
								<div style="float: left;width: 100%;" v-if="item.limittype == 'pic'">
									<p>{{item.title}}</p>
									<div class="page2_1_2" style="margin: 10px 5px 5px 15px;float: left;">
										<div><div>+</div>上传图片</div>
										<input @change="fileUpfj($event,index,item)" :class="'page'+index" ref="upnfile" type="file">					
									</div>
									<ul style="float: left;margin: 10px 0px 0px 15px;">
										<li>
											<img width="239" height="135" v-if="datas[index]" :src="datas[index]" alt="">	
										</li>
									</ul>
									<div class="clues"><i>限制{{item.limitnum}}kb以内,图片格式为{{item.limittypevalue}}</i></div>	
								</div>
								<div style="float: left;width: 100%;" v-if="item.limittype == 'video'">
									<p>{{item.title}}</p>
									<div class="page2_1_2" style="margin: 10px 5px 5px 15px;float: left;">
										<div><div>+</div>上传视频</div>
										<input @change="fileUpfj($event,index,item)" :class="'page'+index" ref="upnfile2" type="file">					
									</div>
									<ul style="float: left;margin: 10px 0px 0px 15px;">
										<li>
											<video width="239" height="135" v-if="datas[index]" :src="datas[index]" controls="controls">您的浏览器不支持 video 标签。</video>
										</li>
									</ul>
									<div class="clues"><i>限制{{item.limitnum}}kb以内</i></div>
								</div>
								<div style="float: left;width: 100%;" v-if="item.limittype == 'file'">
									<p>{{item.title}}</p>
									<div class="page2_1_2" style="margin: 10px 5px 5px 15px;float: left;">
										<div><div>+</div>上传文件</div>
										<input @change="fileUpfj($event,index,item)" :class="'page'+index" ref="upnfile2" type="file">					
									</div>
									<ul style="float: left;margin: 10px 0px 0px 15px;width: 239px;word-wrap:break-word;text-align: left;">
										<li>
										{{datas[index]}}
										</li>
									</ul>
									<div class="clues"><i>请使用压缩包形式上传,限制{{item.limitnum}}kb以内</i></div>	
								</div>	
							</div>

						</div>
						
						<div style="margin: 20px 0px 20px 0px;">
							<el-button type="primary" @click="next">下一步</el-button>
						</div>
					</div>	
				</div>
				<div v-if="active == 1">
					<div class="pushDeletBox4">
						<ul class="zp_box" @scroll="test">
							
							<li @click="checkZp(el.work_id)" :class="(work_id.indexOf(el.work_id)!=-1 || el.is_attend==1)?'chekonzp':''" v-for="(el,index) in zpList" :key="index">
								<img class="zp_box_1" :src="el.face_pic">
								<div class="zp_box_2">
									{{el.work_name.slice(0,10)}}
									<img v-if="el.is_recommend==1" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/zs_icon_tj.svg" alt="">
								</div>
								<div class="zp_box_3">
									{{el.classify_1_name+'-'+el.classify_2_name}}
									<span>{{backtime(el.create_time)}}</span>
								</div>
								<div class="zp_box_4">
									<img :src="mJs.Cavars(el.user_info.avatar)" alt="">
									<div>
										<span class="iconfont pend">&#xe6a2; {{el.view_num}}</span>
										<span class="iconfont pend">&#xe672; {{el.like_num}}</span>
										<span class="iconfont pend">&#xe616; {{el.comment_num}}</span>
									</div>
								</div>
							</li>
							<div ref="botmm"></div>
							<div v-if="isnoData">
								<img  class="upImnoData" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/k/empty_nodata@3x.png"/>
								<div class="noDatawan">找不到数据了o(╥﹏╥)o</div>
							</div>
							
						</ul>
					</div>
					<div class="pushDeletBox5">
						<span @click="backgo" class="pend">上一步</span>
						<span @click="gopushzp" class="pend" style="background: #fff;color: #333333;border: 1px solid #979797;margin-right: 20px;">发布新作品</span>
						<span @click="pushOk" class="pend btn_n3">立即报名</span>
					</div>
				</div>				
			</template>	
		</TcCertification>	
		
		<div v-if="ishowzp" class="pushDeletBox">
			<div class="pushDeletBox1">
				<img class="pushDeletBox2" @click="closeZp" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png">
				<div class="pushDeletBox3">选择参与活动的作品</div>
				
			</div>
		</div>
		
		<div v-if="ishowWp" class="pushDeletBox">
			<div class="pushDeletBox1_x2">
				<img class="pushDeletBox2" @click="closeWp" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png">
				<div class="pushDeletBox1_x2_1" v-html="wpdz"></div>
				<div class="botnbox"><span @click="closeWp" class="pend">关闭</span></div>
			</div>
		</div>
		<fxd :shareData="shareData" ref="fxd"></fxd>
	</div>
	
</template>

<script>
import {Message} from 'element-ui';
import fxd from '../../components/share';
import detailed_detailed from './detailed';
import detailed_into from './into';
import detailed_admission from './admission';
import TcBox from '../../components/TcBox';
import TcCertification from '../../components/TcCertification';
import pTop from '../../components/postionTop';
import { log } from 'util';
export default {
	components:{fxd,detailed_detailed,detailed_into,detailed_admission,TcBox,TcCertification,pTop},
	name: 'home',	 
	data(){	
		return{
			datas:[],
			array: [],
			tcZj:'',
			config:{
				title:'选择参与活动的作品',
			},
			certification:{
				title:'报名活动',
			},
			topCn:{
				min:680,
			},
			shareData:{},
		    show:false,
			ishowWp:'',
			ond:1,
			zpList:[],
			page:1,
			limit:20,
			work_id:[],
			bindType:0,
			ishowzp:false,
			infoData:{},
			isnoData:'',
			wpdz:'',
			
			getType:'',
			noGd:'',
			page2:1,
			total2:0,
			active: 0,
			remeber_tips: '',
			list: [],
			opType:0,									
		}
		
	},
	created(){
		
	},
	mounted: function () {	
		this.init();
		this.setOnd();
		this.a_getInfo();
	}, 
	methods:{
		next() {
			for(var i=0;i<this.datas.length;i++){
				let obj = {
					title: this.list[i].title,
					url: this.datas[i],
				}
				this.array.push(obj);	
			}
			if(this.datas.length == 0){
				Message({message: '信息都为必填项'});
				return
			}else if(this.datas.length < this.list.length){		
				Message({message: '信息缺失'});
				return
			}else{
				if (this.active++ > 2) this.active = 0;this.getPersonalWorkList();
			}
		},
		checkValue(item,index){
			for(var i=0;i<this.list.length;i++){
				if(item == this.list[i]){
					if(this.list[i].limittypevalue == '仅限数字'){	
						var reg = /^[0-9]*$/;
						var re = new RegExp(reg);
						if(re.test(this.datas[index])){
							
						}else{
							Message({message: '仅限输入数字'});
							return
						}			
					}
					if(item.limittypevalue == '数字+英文+标点'){
						var reg = /[\x00-\xff]+/g;
						var re = new RegExp(reg);
						if(re.test(this.datas[index])){
							
						}else{
							Message({message: '仅限输入数字+英文+标点'});
							return
						}
					}
				}
			}											
		},
		backgo(){
			this.active = 0;
		},
		fileUpfj(flie,index,item){	
			this.bdtj('上传弹窗','确定','--');
			if(this.opType==1){
				Message({message: '正在上传，请稍后'});
				return
			}
			let times = (Date.parse(new Date())/1000);
			let arr = [
				1001,
				'6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',
				window.userInfo.open_id,
				times
			];
			let fld = flie.target.files[0];
			for(var i=0;i<this.list.length;i++){		
				if(item == this.list[i]){
					var filename = fld.name;
					var location = filename.lastIndexOf(".");
					var suffix = filename.substr(location+1);
					if(this.list[i].limittype == 'pic'){
						if(this.list[i].limittypevalue != suffix&&this.list[i].limittypevalue.split('/').indexOf(suffix) == -1){
							Message({message: '图片格式不对'});
							return
						}else if(fld.size/1000 > this.list[i].limitnum){
							Message({message: '图片太大'});
							return
						}else{
							let formData = new FormData();
							formData.append('app_id',1001);
							formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
							formData.append('user',window.userInfo.open_id)
							formData.append('file',fld)
							formData.append('relation_type','user_info')
							formData.append('related_id',window.userInfo.open_id)
							formData.append('classify_1','avatar')
							formData.append('timestamp',times)
							formData.append('is_callback',1)
							this.opType=1;
							Message({message: '正在上传，请稍后'});
							this.$ajax.post(window.basrul+'/File/File/insert', formData)
							.then((da)=>{	
								this.opType=0;
								let ds = da.data;
								if(ds.result==0){
									this.datas[index] = ds.data.url;
									this.datas.splice(index,1,ds.data.url);						
								}else{
									// msg(ds.data);
									Message({message: ds.data});
								}
							})
							.catch(function () {
								this.opType=0;		
							});
						}	
					}else if(this.list[i].limittype == 'video'){
						// if(this.list[i].limittype != suffix){
						// 	Message({message: '视频格式不对'});
						// }
						if(fld.size/1000 > this.list[i].limitnum){
							Message({message: '视频太大'});
							return
						}else{
							let formData = new FormData();
							formData.append('app_id',1001);
							formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
							formData.append('user',window.userInfo.open_id)
							formData.append('file',fld)
							formData.append('relation_type','user_info')
							formData.append('related_id',window.userInfo.open_id)
							formData.append('classify_1','avatar')
							formData.append('timestamp',times)
							formData.append('is_callback',1)
							this.opType=1;
							Message({message: '正在上传，请稍后'});
							this.$ajax.post(window.basrul+'/File/File/insert', formData)
							.then((da)=>{	
								this.opType=0;
								let ds = da.data;
								if(ds.result==0){
									this.datas[index] = ds.data.url;
									this.datas.splice(index,1,ds.data.url);						
								}else{
									// msg(ds.data);
									Message({message: ds.data});
								}
							})
							.catch(function () {
								this.opType=0;
								
							});
						}
					}else if(this.list[i].limittype == 'file'){
						if(fld.size/1000 > this.list[i].limitnum){
							Message({message: '文件太大'});
							return
						}else{
							let formData = new FormData();
							formData.append('app_id',1001);
							formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
							formData.append('user',window.userInfo.open_id)
							formData.append('file',fld)
							formData.append('relation_type','user_info')
							formData.append('related_id',window.userInfo.open_id)
							formData.append('classify_1','avatar')
							formData.append('timestamp',times)
							formData.append('is_callback',1)
							this.opType=1;
							Message({message: '正在上传，请稍后'});
							this.$ajax.post(window.basrul+'/File/File/insert', formData)
							.then((da)=>{	
								this.opType=0;
								let ds = da.data;
								if(ds.result==0){
									this.datas[index] = ds.data.url;
									this.datas.splice(index,1,ds.data.url);						
								}else{
									// msg(ds.data);
									Message({message: ds.data});
								}
							})
							.catch(function () {
								this.opType=0;
								
							});
						}
					}		
				}				
			}	
		},
		showtc(){
			this.$refs.tcBox.show();
		},
		showcertification(){
			this.$refs.tcCertification.show();
		},
		closetc(){
			this.$refs.tcBox.close();
		},
		init(){
			document.documentElement.scrollTop =0;
			document.body.scrollTop =0;			
			
			this.setOnd();		
		},
		backBn(ur){
			return 'background-image: url('+ur+');'
		},
		test(){
			let data = this.$refs.botmm.getBoundingClientRect();
			if(data.top<800 && !this.getType && !this.noGd){
				if(this.total2<40){
					this.noGd=1;
					return
				}
				
				this.page2++;
				this.getPersonalWorkList();
			}
		},
		fxclick(){
			this.bdtjCom('分享')
			this.$refs.fxd.showShare(true);
		},
		backtimed(timed){
			if(!timed){
				return
			}
			return timed.substring(0,10)
		},
		closeZp(){
			this.bdtjCom('关闭参与活动');
			this.ishowzp=false;
			this.zpList = [];
		},
		showZp(){
			let pr = {
				activity_id:this.$route.query.id,
			};
			this.api.getPersonalInfo(pr).then((da)=>{
				
				if(da=='error'){
					return
				}

				if(da==null){
					this.noGd=1;
				}
				// console.log(JSON.parse(da.extra_info))

				if(da.extra_info == null){
					this.bdtjCom('上传作品');
					if(!window.userInfo){
						this.$router.push({path:'/login'});
					}
					this.getPersonalWorkList();
					this.showtc();
				}else{
					this.bdtjCom('认证');
					if(!window.userInfo){
						this.$router.push({path:'/login'});
					}
					this.remeber_tips = da.remeber_tips;
					this.list = JSON.parse(da.extra_info);
					// this.getPersonalWorkList();
					this.showcertification();		
				}		
			})			
		},
		
		checkZp(id){
			let on = this.work_id.indexOf(id);
			if(on==-1){
				this.work_id.push(id);
				return
			}
			this.work_id.splice(on,1);
		},
		setOnd(){
			this.tcZj = this.$route.name;
			let a = this.$route.path;
			if(a==='/detailed'){
				this.ond = 1;
				return
			}
			if(a==='/detailed/into'){
				this.ond = 2;
				return
			}
			if(a==='/detailed/admission'){
				this.ond = 3;
				return
			}
		},	
		a_getInfo(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			this.api.a_getInfo({activity_id:this.$route.query.id}).then((da)=>{	
				if(da=='error'){
					this.$router.push({path: '/404'});
					return
				}
				this.infoData = da;
				document.title=this.infoData.activity_name+'-狮圈儿（Zoocreators）';
			
				this.shareData = {
					titlec:'活动分享',
					url:location.origin+'/aindex.html#/conta?id='+this.$route.query.id,
					title:da.activity_name+'-狮圈儿创作者平台',
					pics:da.banner,
					desc:'惊现大神快来膜拜',
					summary:da.activity_name+'-狮圈儿创作者平台',
					bdtj:['活动','分享弹窗-']
				};
				this.$refs.fxd.setUrl(this.shareData);
				if(this.infoData.status==0){
				    this.show=true;
				}else{
                    this.show=false;
				}
			});
		},		
		godefle(on){
			this.$router.push({path:on,query:{id:this.$route.query.id}});	
		},
		closeWp(){
			this.wpdz = '';
			this.ishowWp = '';
		},
		bdtjCom(a){
			this.bdtj('活动',a,'--');
		},
		downMoble(url){
			this.bdtjCom('下载模版')
			if(url.template_file_type==1){			
				window.downloadFiles(url.template_url,url.template_file_name);
				return
			}
			this.wpdz = url.online_disk_info;
			this.ishowWp = 1;
		},
		getPersonalWorkList(){
			this.isnoData='';
			if(!window.userInfo){return}
			let pr = {
				activity_id:this.$route.query.id,
				page:this.page2,
				limit:40,
			};
			this.api.getPersonalWorkList(pr).then((da)=>{
				
				if(da=='error'){
					return
				}
			
				if(da.data.length==0){
					this.noGd=1;
				}
				if(this.zpList.length>0 && this.page2!=1){
					this.zpList = this.zpList.concat(da.data);
					return
				}
				
				this.zpList = da.data;
				if(this.zpList.length==0){
					this.isnoData=1;
				}
			})
		},
		gopushzp(){
			this.bdtjCom('发布新作品')
			this.$router.push({path:'/upload'});
		},
		getHList(){
			let params = {
				page:this.page,
				limit:this.limit
			}
			this.api.getHList(params).then((da)=>{
				if(da=='error'){
					return
				}
				this.zpList = da.data;
			
			})
		},
		backtime(time){		
			return	window.getTimes(time);
		},
		pushOk(){
			this.bdtjCom('确定上传');
			if(this.bindType==1){
				Message({message: '正在上传中'});
				return
			}
			if(this.work_id.length==0){
				Message({message: '请先选择作品'});
				return
			}
			this.bindType=1;
			let pr = {
				activity_id:this.$route.query.id,
				work_id:this.work_id.join(','),
				append_infos: JSON.stringify(this.array),
			};
			this.api.a_AttendActivity(pr).then((da)=>{
				if(da=='error'){
					this.bindType=0;	
					return
				}
				this.bindType=0;				
				Message({message: '上传成功'});
				// this.closeZp();
				this.active = 0;
			}).catch(()=>{
				this.bindType = 0;
			})
		},
	},
	watch: {	
		'$route': function() {
			this.setOnd();
		}
	},
	
	
}		
</script>

<style scoped="scoped">
.upImnoData{
	display: block;
	margin: 110px auto 0;   
}
.detail_topBox{
	min-width: 1300px;	
	position: relative;	
	
}

.detail_topBox_1{
	
	background-size: cover;
    background-position: 50%,50%;
    width: 100%;
	height: 620px;
}
.detail_topBox_2{
	position: absolute;
	bottom: 30px;
	right:0;
	
}
.detail_topBox_2_2,.detail_topBox_2_1{
	display: inline-block;
	width: 140px;
	height: 40px;
	text-align: center;
	line-height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	border-radius: 5px;
}
.detail_topBox_2_1{
	background: #333333;
	margin-right: 15px;
}
.detail_topBox_2_2{
	cursor: pointer;
	background: rgba(51, 179, 255,1);
}

.detail_topBox_2_2:hover{
	background:rgba(112, 201, 255, 1);
}
.detail_topBox_2_3{
	font-size: 24px;
	color: #FFFFFF;
}
.detail_nav{
	line-height: 40px;
	text-align: left;
	padding: 30px 0;
	width: 1300px;
	margin: 0 auto;
}
.detail_navN_1{
	height: 100px;
}
.detail_navN_1 .p_isTop{
	z-index: 9999;
	position: fixed;
	top: 0;
	left: 0;	
	width: 100%;
	-webkit-animation: bjs .3s linear forwards;
	animation: bjs .3s linear forwards;
	-webkit-box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);
	box-shadow: 0px 2px 6px 0px rgba(0,0,0,0.1);

}
.detail_nav>a{
	display: inline-block;
	font-size: 16px;
	color: #1E1E1E;
	text-align: center;
	margin-right: 40px;
	height: 37px;
	position: relative;
}
.detail_nav>a.router-link-exact-active{
	color: #33B3FF;
}
.detail_nav>a.router-link-exact-active:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
	width: 80%;
	height: 2px;
	background: #33B3FF;
} 
.detail_nav_1{
	float: right;
	border: 1px solid #666666;
	border-radius: 20px;
	width: 98px;
	height: 38px;
	line-height: 38px;
	font-size: 14px;
	color: #1E1E1E;
	text-align: center;
}
.pushDeletBox{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: rgba(0,0,0,.5);
}
.pushDeletBox1{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	width: 1030px;
	height: 572px;
}
.pushDeletBox1_x2{
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
	padding: 30px;
    text-align: left;
    line-height: 30px;
    width: 450px;
}
.pushDeletBox1_x2_1{
	margin-bottom: 35px;
}
.pushDeletBox2{   
	position: absolute;
    top: -45px;
    right: -45px;
    width: 44px;
    height: 44px;
    cursor: pointer;
}
.pushDeletBox3{
	background: #FFFFFF;
	box-shadow: 0 2px 4px 0 rgba(0,0,0,0.05);
	font-size: 14px;
	color: #333333;
	line-height: 64px;
	padding: 0 30px;
	text-align: left;
}
.pushDeletBox5{
	background: #FFFFFF;
	box-shadow: 0 0 0 2px rgba(0,0,0,0.05);
	border-radius: 5px 5px 0 0;
	height: 100px;
}
.pushDeletBox5>span{
	display: inline-block;
	margin-top: 30px;
	width: 138px;
	height: 38px;
	font-size: 16px;
	color: #333333;
	text-align: center;
	line-height: 38px;
	border: 1px solid #979797;
	border-radius: 5px;
}
.pushDeletBox5>span:nth-child(2){
	margin-left: 20px;
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}
	
.pushDeletBox4{
	padding: 20px 30px;
	width: 1030px;
    height: 500px;
    overflow: hidden;
    overflow-y: auto;
	box-sizing: border-box;
	overflow: hidden;
	overflow-y: auto;
}
.pushDeletBox4::-webkit-scrollbar {
    width: 6px;     
    height: 1px;
}
.pushDeletBox4::-webkit-scrollbar-thumb {
    border-radius: 4px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: #535353;
}
.pushDeletBox4::-webkit-scrollbar-track {
    background: none;
}
.Information{
	width: 80%;
	margin: 0 auto;
}
.Information >>> .el-input{
	width: 508px;
	
}
.Information > div > p{
    float: left;
	width: 100px;
	margin: 5px 0px 5px 0px;
	color: #333333;
	font-size: 14px;
	text-align: right;
}
.Information > div > p > i,.clues > i{
	color: #BBBBBB;
	font-size: 12px;
	font-style: normal;
	margin-left: 10px;
}
.clues{
	position: absolute;
	top: 210px;
    left: 105px;
	height: 20px;
	line-height: 20px;
	color: #333333;
	font-size: 14px;
	text-align: left;
}
.InformationUpload{
	height: 230px;
	position: relative;
}
.InformationUpload >>> .el-upload--picture-card{
	width: 260px;
	height: 146px;
}
.zp_box{
	overflow: hidden;

	text-align: left;
}
.zp_box>li{
	display: inline-block;
	background: #F6F6F6;
	border-radius: 5.08px;
	width: 309.8px;
	height: 312.9px;
	margin: 0 17px 21px 0;
	border: 1px solid #fff;
	box-sizing: border-box;
	
}
.zp_box>li:nth-child(3n+3){
	margin-right: 0;
}
.zp_box>li.chekonzp{
	border-color: #33B3FF;
}
.zp_box_1{
	display: block;
	width: 100%;
	border-radius: 5.08px 5.08px 0 0;
	height: 231.6px;
}
.zp_box_2{
	font-size: 16.25px;
	color: #1E1E1E;
	margin: 6px 10px;
}
.zp_box_2>img {
    float: right;
    width: 14px;
    height: 14px;
    margin-top: 3px;
}
.zp_box_3{
	font-size: 12.19px;
	color: #999999;
	margin: 0 10px;
}
.zp_box_3>span{
	float: right
}
.zp_box_4{
	margin: 6px 10px;
}
.zp_box_4>img{
	display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
.zp_box_4>div{
	float: right;
}
.zp_box_4>div>span{
    margin-right: 13.9px;
    font-size: 12.19px;
    color: #999999;
}
.zp_box_4>div>span:last-child{
	margin-right: 0;
}

.detail_topBoxx_1po{
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100%;
	background-image: linear-gradient(-180deg, rgba(0,0,0,0.00) 0%, #000000 100%);
}
.detail_topBoxx_1{

	width: 1300px;
	
}
.detail_topBoxx_1{
	position: relative;
	margin: 0 auto;
	width: 1300px;
	height: 100px;
	
}
.detail_topBox_2x{
	position: absolute;
	bottom: 30px;
	text-align: left;
}
.detail_topBox_2x_1{
	font-size: 24px;
	color: #FFFFFF;
	margin-bottom: 7px;
}
.detail_topBox_2x_2{
	font-size: 14px;
	color: #FFFFFF;
}

.detail_topBox_2_2:active{
	background: rgba(112, 201, 255, 1);
}
.detail_topBox_2_1:hover{
	background: #4E4E4E;
}


.Acomd{
	min-height: 500px;
}
.textExplains{
	color: #666666;
	font-size: 14px;
	text-align: center;
	padding-top: 30px;
}
.textExplains > i{
	font-style: normal;
	color: #33B3FF;
}
</style>
