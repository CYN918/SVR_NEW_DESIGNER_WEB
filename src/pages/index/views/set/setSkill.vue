<template>
				<div class="setUserBoxs_cent">
					<div class="scBox suc_1 suc_1x skill_01">
						<div class="suc_title">项目投入意向<i class="xhds"></i></div>
						<div>
							<span>工作现状</span>
							<el-select v-model="form.situation" placeholder="请选择">
								<el-option
								  v-for="item in pz_situation"
								  
								  :label="item"
								  :value="item">
								</el-option>
							</el-select>
						</div>
						<div>
							<span>每周承接项目时间</span>
							<el-select v-model="form.work_experience"  placeholder="请选择">
								<el-option
								  v-for="item in pz_work_experience"
								  :label="item"
								  :value="item">
								</el-option>
							</el-select>
						</div>
						<div class="cl_n_x1 cl_n_x1p">
							<span class="cl_n_x1ph">项目类型偏好</span>
							<el-select v-model="form.preference_classify" multiple placeholder="请选择">
								<el-option
								  v-for="item in pz_preference_classify"
								  
								  :label="item.classify_name"
								  :value="item.classify_name">
								  <span class="uog"></span>
								  <span>{{ item.classify_name }}</span>
								  
								</el-option>
							</el-select>
						</div>
					</div>
					<div class="scBox suc_1 skill_01">
						<div class="suc_title">创作能力<i class="xhds"></i></div>
						<div class="skill_02">
							<span>擅长风格</span>
							<div>
								<span v-for="(el,index) in pz_style" :key="index" @click="chekstyle(el)" :class="form.style.indexOf(el)==-1?'':'oncheck'">{{el}}</span>
								<div class="addM_n_1 addM_n_2">
									<input @keyup.enter="keydown1" @focus="infous1" @blur="ninfous1" v-model="add_pz_style" :placeholder="plac1" type="text" ref="keydown1"/>
									<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/new/icon_add.svg"/>
								</div>
							</div>
						</div>
						
						
						<div class="skill_02">
							<span>擅长领域</span>
							<div>
								<span v-for="(el,index) in pz_field" :key="index" @click="chekfield(el)" :class="form.field.indexOf(el)==-1?'':'oncheck'">{{el}}</span>
								<div class="addM_n_1">
									<input @keyup.enter="keydown2" @focus="infous2" @blur="ninfous2" v-model="add_pz_field" :placeholder="plac2" type="text" ref="keydown2"/>
									<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/new/icon_add.svg"/>
								</div>
							</div>
						</div>
						
						<div>
							<span>设计经验</span>
							<el-select v-model="form.design_experience" placeholder="请选择">
								<el-option
								  v-for="item in pz_design_experience"
								  
								  :label="item"
								  :value="item">
								</el-option>
							</el-select>
						</div>
					</div>										
					<div class="suc_btndf" @click="Userupdate">保存资料</div>
				</div>
</template>

<script>

import {Message} from 'element-ui'
export default {
	name: 'works',
	data(){
		return {

			plac1:'标签',
			plac2:'标签',
			tancData:{
				mobile_zone:'86',
				old_mobile_zone:'86'
			},
			add_pz_field:'',
			add_pz_style:'',
			pz_style:['极简','扁平','拟物','活泼','商业','磨砂','人物','风景'],
			pz_field:['日化用品','医疗','快消','互联网','家具建材','教育','传媒','服装','机构组织','旅游','母婴','3C数码','金融','汽车'],
			pz_situation:['我是工作室/公司负责人','我是自由职业者','我有全职职业','我是在校生'],
			pz_work_experience:['10小时以下','10-40小时','40小时以上','随时'],
			pz_preference_classify:[''],
			pz_design_experience:['1年','2年','3年','4年','5年以上'],


			form:{
				style:[],
				field:[],
				preference_classify:[],
			},

			detlData:{},
			topTyped:false,
			navdOn:0,
			postData:{},
			tAncType:0,
		
			
		}
	},
	mounted: function () {			
		this.init();
		
	}, 
	methods: {
		infous1(){
			this.plac1 = '请输入最多4个文字回车结束';
		},
		ninfous1(){
			this.plac1 = '标签';
		},
		infous2(){
			this.plac2 = '请输入最多4个文字回车结束';
		},
		ninfous2(){
			this.plac2 = '标签';
		},
		keydown1(){

			if(!this.add_pz_style){
				return
			}
			if(this.add_pz_style.length>4){
				Message({message: '最多4个文字'});
				return
			}
			if(this.pz_style.indexOf(this.add_pz_style)!=-1){
				Message({message: '该风格已存在'});
				return
			}
			if(this.form.style.length===5){
				Message({message: '最多填写5个风格'});
				return
			}
			this.form.style.push(this.add_pz_style)
			this.pz_style.push(this.add_pz_style);
			this.add_pz_style = '';
	
		},
		keydown2(){
			if(!this.add_pz_field){
				return
			}
			if(this.add_pz_field.length>4){
				Message({message: '最多4个文字'});
				return
			}
			if(this.pz_field.indexOf(this.add_pz_field)!=-1){
				Message({message: '该领域已存在'});
				return
			}
			if(this.form.field.length===5){
				Message({message: '最多填写5个领域'});
				return
			}
			this.form.field.push(this.add_pz_field);
			this.pz_field.push(this.add_pz_field);
			this.add_pz_field = '';
		
		},
		init(){
			this.getUserDetail();
			this.getCl();
		},
	

		
		getCl(){
			this.api.pr_classify().then((da)=>{
				if(da=='error' || da=='104'){
					return
				}
				da.splice(0,1);
				this.pz_preference_classify = da;
				let ar = this.listCz(window.userInfo.preference_classify);
				let arr = [];
				for(let i=0,n=da.length;i<n;i++){
					if(ar.indexOf(da[i].classify_name)!=-1){
						arr.push(da[i].classify_name);
					}
				}
				this.form.preference_classify = arr;
			})
		},
		listCz(n){
			if(!n){return []}
			if(!Array.isArray(n)){
				return n.split(',');
			}
			return n;
		},
		clpezN(a,b){
			for(let i=0,n=a.length;i<n;i++){
				if(b.indexOf(a[i])==-1){
					b.push(a[i]);
				}				
			}
		},
		getUserDetail(){
			if(!window.userInfo){
				this.$router.push({path:'/login'})
				return
			}
			let st = this.listCz(window.userInfo.style),fd=this.listCz(window.userInfo.field);
			this.clpezN(st,this.pz_style);
			this.clpezN(fd,this.pz_field);			
			this.form = {
				situation:window.userInfo.situation,
				work_experience:window.userInfo.work_experience,
				preference_classify:[],
				style:st,
				field:fd,
				design_experience:window.userInfo.design_experience,					
			}
		},
		chekstyle(on){
			let ond = this.form.style.indexOf(on);
			if(ond==-1){
				if(this.form.style.length==5){
					this.$message({message:'最多可选5个'});
					return
				}
				this.form.style.push(on);
				return
			}
			this.form.style.splice(ond,1);
		},
		chekfield(on){
			let ond = this.form.field.indexOf(on);
			if(ond==-1){
				if(this.form.field.length==5){
					this.$message({message:'最多可选5个'});
					return
				}
				this.form.field.push(on);
				return
			}
			this.form.field.splice(ond,1);
		},
		Userupdate(){
			if(!this.form.situation){
				Message({message: '请选择工作现状'});
				return
			}
			if(!this.form.work_experience){
				Message({message: '请选择每周承接项目时间'});
				return
			}
			if(!this.form.preference_classify){
				Message({message: '请选择项目类型偏好'});
				return
			}
			if(this.form.style.length==0){
				Message({message: '请选择擅长风格'});
				return
			}
			if(this.form.field.length==0){
				Message({message: '请选择擅长领域'});
				return
			}
			if(!this.form.design_experience){
				Message({message: '请选择设计经验'});
				return
			}
			this.bdtj('帐号设置','完善资料-保存资料','--');
			
			
			this.api.saveSkill(this.form).then((da)=>{
				if(da=='error' || da=='104'){
					return
				}

				window.userInfo.is_completed = 1;
				window.userInfo.situation = this.form.situation;
				window.userInfo.work_experience = this.form.work_experience;
				window.userInfo.preference_classify = this.form.preference_classify;
				window.userInfo.style = this.form.style;
				window.userInfo.field = this.form.field;
				window.userInfo.design_experience = this.form.design_experience;				
				localStorage.setItem('userT',JSON.stringify(window.userInfo));
				Message({message: '修改成功'});
			});
			
		},
	}
}
</script>

<style>
.skill_01>div>span{
	margin-right: 40px;
	text-align: left;
	text-align-last: left;
	width: 112px;
	
}
.skill_01 .el-select{
	width: 320px;
}
.skill_01 .el-select input{
	text-indent: 15px;
}
.skill_01>div.skill_02>span{
	margin-top: 6.5px;
	vertical-align: top;
}
.skill_02>div{
	display: inline-block;
	max-width: 460px;
}
.skill_02>div>span{
	display: inline-block;
	box-sizing: border-box;
	margin-right: 10px;
	margin-bottom: 17px;
	padding: 6px 16px;
	font-size:14px;
	text-align: center;
	font-weight:400;
	color:rgba(102,102,102,1);
	background:rgba(255,255,255,1);
	border-radius:16px;
	border:1px solid rgba(187,187,187,1);
	cursor: pointer;
}
.skill_02>div>span:hover{
	-webkit-opacity: .7;
	opacity: .7;
}
.skill_02>div>.oncheck{
	background: #33B3FF;
	border-color: #33B3FF;
	color: #fff;
}



.uog{
	position: relative;
    display: inline-block;
    vertical-align: middle;
    margin-right: 8px;
    width: 14px;
    height: 14px;
    background: rgba(255,255,255,1);
    border-radius: 2px;
    border: 1px solid rgba(217,217,217,1);
}
.selected .uog{
	background: #33B3FF;
    border-color: #33B3FF;
}
.uog:after{
	content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 8px;
    height: 4px;
    border: 1px solid #fff;
    border-top: 0;
    border-right: 0;
    -webkit-transform: rotate(-58deg) translate(-21%,76%);
    transform: rotate(-58deg) translate(-21%,76%);
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
	display: none;
}
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected{
	color: #33B3FF;
}
.addM_n_1{
	display: inline-block;
	position: relative;	
}
.addM_n_1>img{
    position: absolute;
    left: 12px;
    top: 9px;
    width: 14px;
}
.addM_n_1>input{
	outline: none;	
	display: inline-block;
	box-sizing: border-box;
	padding: 0 15px 0 34px;
	width: 79px;
	height:32px;
	font-size:14px;
	background:rgba(255,255,255,1);
	border-radius:16px;
	border:1px solid rgba(187,187,187,1);
}
.addM_n_1>input:focus{
	width:228px;
}
.suc_1>div>.cl_n_x1ph{
	vertical-align: top;
}
.cl_n_x1p .el-input__suffix{
	height: 40px !important;
}
</style>
