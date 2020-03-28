<template>
	<div class="ntob_footer">
		<div class="ntob_footer_1">
			<div class="ntob_footer_1_1"></div>
		</div>
		<div class="ntob_footer_2">
			<div :style="bal()" class="tlo_box">
				<div class="ntob_footer_2_1">
					<div v-html="backd()" class="kdut"></div>
				</div>
				
				<div class="tlo_02">
					<div :style="backtop(el,index)" class="imgd" v-for="(el,index) in navcoms.media">
						<div @click="checkDOm($event,el,index,'media')" class="setToll0">
							<img v-if="el.type=='pic'" :src="el.file_url">
							<img v-if="el.fps_pic" :src="el.fps_pic">	
						</div>
						
						<div  v-if="el.ischeck" class="setToll">
							<div @mousedown="jl3($event,el,index,navcoms.media)" class="setToll1"></div>
							<div @mousedown="jl2($event,el,index,navcoms.media)"  class="setToll2"></div>
							<div @mousedown="jl($event,el,index,navcoms.media)" class="setToll3"></div>
							<div class="setToll4">
								<i></i><i></i><i></i>
								<input @blur="csb" @focus="csa($event,{n:'media',o:index})" class="setToll4_1" type="text">
							</div>
						</div>							
						
					</div>
				</div>
				<div class="tlo_03">
					<div  :style="backtop(el,index)" class="imgd" v-for="(el,index) in navcoms.audio">
						<div @click="checkDOm($event,el,index,'audio')" class="setToll0"></div>
						<div  v-if="el.ischeck" class="setToll">
							<div @mousedown="jl3($event,el,index,navcoms.audio)" class="setToll1"></div>
							<div @mousedown="jl2($event,el,index,navcoms.audio)"  class="setToll2"></div>
							<div @mousedown="jl($event,el,index,navcoms.audio)" class="setToll3"></div>
							<div class="setToll4">
								<i></i><i></i><i></i>
								<input @blur="csb" @focus="csa($event,{n:'audio',o:index})" class="setToll4_1" type="text">
							</div>
						</div>			
					
					</div>
				</div>
				<div class="tlo_04"></div>
			</div>
			<div class="bf_o1">
				<div class="bf_o1_1"></div>
			</div>
			<div class="gund_01" ref="gund_01x">
				<div @mousedown="jlx($event)" :style="tdfn()" class="gund_02"></div>
			</div>
			<div class="fdsx_01">
				<span @click="jms()" class="fdsx_02">-</span>
				<span class="fdsx_03">
					<div class="fdsx_06"></div>
				</span>
				<span @click="addms()" class="fdsx_02">+</span>
				
			</div>
			
		</div>
		<div :style="csad" class="setToll4_2">
			<span @click="cats()">裁剪</span>
			<span>复制</span>
			<span @click="delt()">删除</span>
		</div>
	</div>
	
	
</template>

<script>
</script>

<style>
.ntob_footer_1{
	position: absolute;
	left: 0;
	top: 0;
	width: 120px;
	height: 100%;
	overflow: hidden;
	background: #fff;
	z-index: 1;
}
.ntob_footer_2{
	position: absolute;
	right: 0;
	left: 120px;
	overflow: hidden;
	height: 100%;
	background: #fff;
}
.ntob_footer_2_1,.ntob_footer_1_1{
	
	width: 100%;
	height:52px;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
}
.ntob_footer_2_1{
	position: relative;
	text-align: left;

}
.kdut{
	position: absolute;
	bottom: 2px;
	left: 0;
	display: inline-block;
	border-bottom: 1px solid #DEE1E9;
	white-space: nowrap;
}
.kdut>span{
	display: inline-block;
	vertical-align: bottom;
	width:1px;
	height:8px;
	background:rgba(96,98,102,1);

}
.kdut_1{
	display: inline-block;
	vertical-align: bottom;
	margin-left: 10px;
}
.kdut_1>span{
	display: inline-block;
	vertical-align: bottom;
	width:1px;
	height:4px;
	background:rgba(222,225,233,1);
	margin:0 10px;
}
.kdut_1>span.kd_02{
	width:1px;
	height:8px;
	background:rgba(96,98,102,1);
}
.kdut_1>span:last-child{
	margin-right: 0;
}
.kd_02{
	position: relative;
}
.kd_02>span{
	position: absolute;
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
	bottom: 8px;
	left: 0;
}
.tlo_box{
	width: 100%;
	position: relative;
}
.tlo_02{
	position: relative;
	height: 72px;
	background: #F4F6F9;
	margin-bottom: 3px;
}
.tlo_03{
	position: relative;
	height: 32px;
	background: #F4F6F9;
	margin-bottom: 3px;
}
.tlo_04{
	height: 72px;
	background: #F4F6F9;
	margin-bottom: 3px;
}
.gund_01{
	position: absolute;
	bottom: 0;
	left: 0;
	right: 153px;
	
	height: 24px;
	background: #E3E3E3;
}
.fdsx_01{
	position: absolute;
	bottom: 0;
	right: 0;
	width: 152px;
	height: 24px;
	background: #E3E3E3;
}
.gund_02{
	cursor: pointer;
	position: absolute;
	top: 50%;
	left: 0;
	width: 20px;
	height: 8px;
	background:rgba(187,187,187,1);
	border-radius:4px;
	transform: translate(0,-50%);
}
.fdsx_01{
	text-align: center;
}
.fdsx_01>span{
	display: inline-block;
	vertical-align: middle;
}
.fdsx_02{
	width:12px;
	height:12px;
	border-radius: 50%;
	background:rgba(96,97,101,1);
	color: #E3E3E3;
	line-height: 12px;
}
.fdsx_03{
	position: relative;
	width:72px;
	height:2px;
	background:rgba(187,187,187,1);
	border-radius:1px;
	margin: 0 4px;
}
.fdsx_06{
	cursor: pointer;
	position: absolute;
	top: -3.5px;
	left: 0;
	width:8px;
	height:8px;
	border-radius: 50%;
	background:rgba(51,179,255,1);
	box-shadow:0px 2px 4px 0px rgba(0,0,0,0.2);
}
.imgd{
	position: absolute;
	top: 0;
	left: 0;
	overflow: hidden;
	background: #839aba;
	height: 100%;
	background-position: 0;
	background-repeat: repeat-x;
	background-size: auto 100%;

}
.ntob_footer{
	position: relative;
	width: 100%;
	height: 264px;
}

</style>
