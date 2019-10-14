<template>
	<div>
		<div class="yhtop setBin_1">
			<div class="yhtop1 ">用户资料完善</div>
			<div class="yhtop2 userme2top">
				<pTop class="" :cn="topCn">
					<template v-slot:todo="{ todo }">
						<div>
							基本信息设置 
							<div class="yhtop2Box">
								<span @click="chekNav(0)" :class="['pend',navOn==0?'router-link-active':'']">完善资料</span>
								<span @click="chekNav(1)" :class="['pend',navOn==1?'router-link-active':'']">绑定已有帐号</span>
							</div>
						</div>
					</template>		
				</pTop>
				
				
				
			</div>
			<bindData v-if="navOn==0"></bindData>
			<bindUser v-if="navOn==1"></bindUser>	
			
		</div>
		<Footer></Footer>
	</div>	
</template>
<script>
import bindData from './bindData';
import bindUser from './bindUser';
import Footer from '../footer';
import pTop from '../../components/postionTop';
export default {
	name: 'login',
	components:{bindData,bindUser,Footer,pTop},
	data(){		
		return{	
			navOn:0,
			topCn:{
				min:66,
			},			
		}
	},
	mounted: function () {}, 
	methods: {
		chekNav(on){
			this.navOn = on;
		}
		
	},
}
</script>

<style>
#app>div>div.yhtop{
	padding: 0;
}
.yhtop{
	min-width: 1300px;
	font-size: 14px;
}
#app>div>div.setBin_1{
	padding-bottom: 150px;
}
.newUserme{
	box-sizing: border-box;
	height: 742px;
    position: relative;
	margin: 40px auto 40px;
	padding: 65px 110px;
	box-sizing: border-box;
	width: 860px;
	background: #FFFFFF;

	border-radius: 5px;
}

.yhtop3 input{
	border: none !important;
	border-radius: 0 !important;
	border-bottom: 1px solid #ddd !important;
	width: 128px;
}
.yhtop3 .el-input{
	display: inline-block; 
	width: auto;
}
.yhtop3 .el-form-item__content{
	text-align: left;
}
.nav_tx{
	text-align: left;
}
.nav_tx>img{
	display: inline-block;
	width: 100px;
	height: 100px;
	border-radius: 50%;
	vertical-align: middle;
	
}
.nav_tx>span{
	display: inline-block;
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
}
.yhtop3 .el-form-item__content,.nav_tx{
	margin-bottom: 41px;
}
.yhtop4 .el-input__inner{
	width: 349px !important;
}

.yhtop3 .el-form-item__label{
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
	font-size: 16px;
	color: #333333;
	padding: 0;
}
.yhtop6f{
	position: absolute;
    bottom: 65px;
    left: 0;
	width: 100%;
	text-align: center;
}


.yhtop5:hover{
	cursor: pointer;
	opacity: .7;
}
.cjBox{
	position: absolute;
	top: 0;
	left: 0;
	width: 200px;
	height: 200px;
}
.nav_tx{
	position: relative;
}
.userBoxd{
	display: flex;
	margin-bottom: 27px;
}

.userBoxd .phone_1{
	font-size: 14px;
}	
.userBoxd>span{
	display: inline-block;
	vertical-align: middle;
	width: 68px;
	line-height: 40px;
	text-align: justify;
	text-align-last: justify;
	margin-right: 62px;
}
.userBoxd>.itext{
	flex: 1;
}
.userBoxd2.inptud {
    width: 296px;
}
.btnType{
	background: #33B3FF;
}
.newUserme_x1{
	width: 350px;
}
.newUserme2{
	background: #FFFFFF;
	border-radius: 5px;
	margin: 20px auto -20px;
	box-sizing: border-box;
	padding: 44px 110px;
	width: 860px;

}
.newUsermeHx2{
	height: 425px;
}
.newUserme2 .userBoxd{
	margin-bottom: 0;
}
.onusert{
	line-height: 40px;
}
.yhtop2Box{
    position: absolute;
    text-align: center;
    width: 100%;
    left: 0;
    top: 0;
}
.yhtop2Box>span {
    position: relative;
    display: inline-block;
    font-size: 16px;
    color: #1E1E1E;
	text-indent: 0;
    margin-right: 64px;
}

.yhtop2Box>span.router-link-active {
    color: #33B3FF;
}
.yhtop2Box>span.router-link-active:after {
    content: "";
    position: absolute;
    bottom: 5px;
    left: 5%;
    width: 90%;
    height: 2px;
    background: #33B3FF;
}
.newUserme2x_1 .userBoxd{
	height: 60px;
}
.userme2top .p_isTop{
	z-index: 1000;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	min-width: 1300px;
	background: #fff;
}
.userme2top .p_isTop>div{
	
	text-align: left;
	width: 860px;
	margin: 0 auto;
}
</style>
