<template>
	<div class="pr_box">
		<div class="pr_02_1Box">
			<pTop class="" :cn="topCn">
				<template v-slot:todo="{ todo }">
					<div class="pr_02_1">
						<div class="p-project-class">
							<span 
							v-for="(el,index) in prLn.slice(0, 7)" 
							:key="index"
							:class="['pr_02_2 pend',type==index?'pr_02_2On':'']"
							@click="qhNav(index,todo,el.classify_name)"
							>{{el.classify_name+'（'+el.project_num+'）'}}</span>
						</div>

						<!-- 更多分类菜单 -->
						<el-dropdown
							v-if="prLn.length > 7"
							class="p-more-class"
							placement="bottom-start">
							<span class="p-more-class-icon">
								<i class="el-icon-more"></i>
							</span>
							<el-dropdown-menu class="p-project-dropdown-menu" slot="dropdown">
								<el-dropdown-item
									:class="{'p-dropdown-menu-active': type == (idx + 7)}"
									v-for="(item, idx) in prLn.slice(7)"
									@click.native="qhNav(idx + 7, todo, item.classify_name)"
									:key="idx">
									{{ `${item.classify_name}（${item.project_num}）` }}
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>

						<div @click="goOn('/help',{on:'4-01'})" class="p-project-guide">项目承接指南</div>
					</div>
				</template>		
			</pTop>
		</div>
		<div class="pr_02">
			<list :isDjs="'1'" :page="setPage" :config="data" class="iopdlf_01" ref="sfafa">
				<template v-slot:todo="{ todo }">
					<cent :djs="djson" :bdtjdata='bdtjdata' :el="todo"></cent>
				</template>			
			</list>
		</div>
		
		
	</div>
</template>
<script>
import list from '../../components/list';
import pTop from '../../components/postionTop';
import cent from './cent_1';

export default {
	components:{list,cent,pTop},
	name: 'home',
	data(){
		return {
			data:{
				ajax:{
					url:'pr_list',
				},
				pr:{
					
				},
				bdtj:[['首页','翻页'],['首页','更改单页显示数']]
				
			},	
			topCn:{
				min:284,
			},
			setPage:{page:1,limit:10,size:[10,20,40,60]},
			bdtjdata:[['首页','作品'],['首页','创作者']],
			type:0,
			cont:50,
			djson:0,
			prLn:[],
			djsOb:'',
		}
	},
	mounted: function(){
		this.getCl();		
	}, 
	methods: {
		goOn(on,cs){
			this.bdtj('项目列表','[项目承接指南]','--')
			this.$router.push({path:on,query:cs})	
		},
		getCl(){
			this.mJs.scTop(1);		
			this.api.pr_classifyInfo().then((da)=>{
				if(da=='error' || da=='104'){
					return
				}				
				this.prLn = da;
			})
		},
		
		stardjs(){
			clearInterval(this.djsOb);
			this.djsOb = setInterval(()=>{
				if(this.$route.name!='project'){
					clearInterval(this.djsOb);
				}
				this.djson = this.djson==1?0:1;
			},1000);
		},
		djsjs(){
			clearInterval(this.djsOb);
			this.$refs.sfafa.getData();
		},
		qhNav(on,c,n){
			if(on==this.type){return}
			if(c){
				this.mJs.scTop(284);
			}
			this.type=on;
			if(this.prLn[on].id){
				this.data.pr.classify_id = this.prLn[on].id;
				
			}else{
				this.data.pr = {};
			}			
			this.$refs.sfafa.sxfn();
			
		}
	}
}
</script>

<style lang="scss">
@import "~styles/define.scss";

.pr_box{
	background:rgba(244,246,249,1);
}
.pr_01{
	padding: 40px 0;
    text-align: left;
	background: #fff;
}
.pr_01>div{
	margin: 0 auto;
	width: 1300px;
}
.pr_01_1{
	margin-bottom: 20px;
	font-size:36px;
	font-weight:400;
	color:rgba(40,40,40,1);
	line-height:50px;
	font-family:PingFang SC Regular;
}
.pr_01_2{
	display: inline-block;
	background: #33b3ff;
	color: #fff;	
}
.pr_01_3{
	font-size:14px;
	font-weight:400;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.pr_02{
	padding: 0 0 20px;
	margin: 0 auto;
	width: 1300px;
}
.pr_02_1Box{
	width: 100%;
	line-height: 80px;
    height: 80px;

}
.pr_02_1{
	position: relative;
	text-align: left;
	margin: 0 auto;
	width: 1300px;
	display: flex;
	align-items: center;
	.p-project-class{
		flex: 1;
		line-height: 28px;
		height: 80px;
		display: flex;
		align-items: center;
		span{

		}
	}
	.p-project-guide{
		@include border(left, #D9D9D9);
		width: 140px;
		text-align: center;
		cursor: pointer;
		height: 28px;
		line-height: normal;
		color: #333;
	}
}
.pr_02_2{
	margin-right: 40px;
	font-size:14px;
	font-weight:400;
}
.pr_02_2On{
	color:#33B3FF;
}
.pr_02_3{
	right: 0;
	display: inline-block;
	position: absolute;
	background:#33B3FF;
	border-radius:5px;
	margin-top: 20px;
	width:140px;
	height:40px;
	text-align: center;
	line-height: 40px;
	color: #fff;
	font-size:14px;
	font-weight:400;
}
.iopdlf_01>li{
	display: inline-block;
	margin-bottom: 20px;
}
.iopdlf_01>li:nth-child(2n+2){
	margin-right: 0;
}
.pr_02_1Box .p_isTop{
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

.p-more-class{
	cursor: pointer;
	line-height: 28px;
	.p-more-class-icon{
		padding: 0 28px;
		font-size: 26px;
		color: $t-primary;
		&:focus {
			outline: none;
		}
	}
}
.p-project-dropdown-menu{
	.p-dropdown-menu-active{
		background-color: #ebf7ff;
		color: #5cc2ff;
	}
	.el-dropdown-menu__item{
		line-height: 40px;
		height: 40px;
		min-width: 140px;
		&:hover{
			background-color: $hover-bg-color !important;
			color: #333 !important;
		}
	}
}

</style>