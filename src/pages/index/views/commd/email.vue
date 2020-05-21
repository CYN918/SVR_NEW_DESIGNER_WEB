<template>
		<div>
			<div class="em_01">
				<img class="em_bg" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/email_bg.svg"/>
				<div class="em_02">
					<div class="em_03">邮箱激活</div>
					<div class="em_04">
						<img class="em_05" :src="'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/svg/'+da.u+'.svg'"/>
						<div class="em_06" v-if="setData.type!=2">
							<div class="em_07">{{da.t}}</div>
							<div class="em_08">
								<div v-if="setData.type==1">{{da.t2}}</div>
								<div v-else><span class="hsld">{{djs}}</span><span class="hsld_1">秒后跳转至</span><span @click="go('/index')" class="hsld pend">首页</span></div>								
							</div>
						</div>
					</div>
					<div class="em_09"  v-if="setData.type!=2">
						<div @click="btnC" class="btns pend">{{da.t3}}</div>
					</div>
					<div class="em_10" v-else>
						激活邮件已发送到你的邮箱中，邮件有效期为24小时。<br/> 请及时登录邮箱，点击邮件中的链接激活帐户。
					</div>
				</div>
			</div>
		</div>		
</template>

<script>
export default {
	name: 'email',
	props: {
		setData:Object
	},
	data(){
		return{
			pconf:[
				{u:'yxjh_icon_yzcg',t:'验证成功',t2:'秒后跳转至',t3:'进入首页'},
				{u:'yxjh_icon_yzgq',t:'激活链接已过期',t2:'请重新绑定',t3:'去绑定'},
	
			],
			da:{},
			djs:3,
		}
	},
	mounted: function () {			
		this.init();		
	}, 
	methods: {
		init(){
			this.api.getSelfInfo({}).then((da)=>{
				if(da=='error' || da=='104'){return}
				da.access_token = window.userInfo.access_token;

				window.userInfo = da;
				localStorage.setItem('userT',JSON.stringify(da));				
			})
			this.da = this.pconf[this.setData.type];
			if(this.setData.type==0){
				this.djsFn();
			}
		},
		go(on){
			this.$router.push({path:on})	
		},
		btnC(){
			if(this.setData.type==0){
				this.go('/index');
				return
			}
			if(this.setData.type==1){
				this.go('/setSecurity');
				return
			}
			
		},
		djsFn(){			
			setTimeout(()=>{
				this.djs--;
				if(this.djs>0){
					this.djsFn();
					return
				}
				this.go('/index');
			},1000);
		}
	},
}	

</script>

<style>
#app > div > div.mynoerr{position: relative;box-sizing: border-box;    min-height: 100%;
    padding: 0;}

.em_01{
	position: absolute;
	top: 44%;
	left: 50%;
	-webkit-transform: translate(-50%,-50%);
	transform: translate(-50%,-50%);		 
	 
}
.em_bg{
	display: block;
	height: 440px;
}
.em_02{
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
}
.em_03{
    padding: 7px 60px;
    font-size: 24px;
    color: rgba(51,51,51,1);
    line-height: 78px;
    text-align: left;
}
.em_04{
	text-align: center;
}
.em_05{
	display: inline-block;
	vertical-align: top;
}
.em_06{
	display: inline-block;
	vertical-align: top;
	margin-left: 10px;
	text-align: left;
}
.em_07{
	
	padding-top: 45px;
    font-size: 16px;
    font-weight: 500;
    color: rgba(51,51,51,1);
    line-height: 22px;
    font-family:PingFangSC-Medium,PingFangSC;
}
.em_08{
	font-size:14px;
	color:rgba(153,153,153,1);
	line-height:48px;
}
.em_08>div>span.hsld{
	color: #FF0000;
}
.hsld_1{
	margin: 0 7px;
}
.em_10{
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:24px;
}
</style>

