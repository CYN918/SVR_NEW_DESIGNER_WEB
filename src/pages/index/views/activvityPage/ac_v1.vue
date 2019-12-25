<template>
	<div>
		<div class="ac_v1-1">
			<img class="ac_v1-2" src="/imge/ac_v1/ban.png"/>
			<div class="ac_v1-4">
				<div class="ac_v1-4x">
					<span @click="navCl(el)" :class="el.p==navOn?'checkO':''" v-for="el in arr">{{el.n}}</span>
				</div>
			</div>
			
			
			<div class="ac_v1-5">
				
				<div v-if="navOn==1" class="ac_v1-5-1">
					<img src="/imge/ac_v1/01.png">
				</div>
				<div v-if="navOn==2" class="ac_v1-5-2">
					<div class="ac-01">
						<div class="ac-02">
							<div class="ac-01-1">
								全部作品<span>{{total}}</span>
								<div class="ac-01-2">
									<span :class="!this.px?'chko':''" @click="timeO()">推荐</span>
									<span :class="this.px?'chko':''" @click="timeO(1)">最新</span>
								</div>
							</div>
							<div>
								<box_a v-for="el in workList"  :el="el"></box_a>
							</div>
							
							<div v-if="total>workList.length" class="ac-01-3">
								<el-pagination
								background
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="page"
								:page-sizes="limits"
								:page-size="limit"
								layout="total,prev, pager, next,sizes"
								:total="total">
								</el-pagination>
							</div>
						</div>
						
						
					</div>
					
					<img class="ac-04" src="/imge/ac_v1/07.png">
					
					
					
				</div>
				<div v-if="navOn==3" class="ac_v1-5-1">
					<img src="/imge/ac_v1/03.png">
				</div>
			</div>
			
			<div class="ac_v1-3">
				<img src="/imge/ac_v1/fx.png"/>
			</div>
		</div>
	</div>
</template>

<script>
import list from '../../components/list';
import box_a from '../../components/box_a';
export default{
	components:{list,box_a},
	data(){
		return{

			arr:[
				{n:'活动详情',p:1},
				
			],
			navOn:1,
			limits:[20,40,80],
			page:1,
			limit:20,
			total:0,
			workList:[],
			infoData:{},
			px:'',
			ids:'',
			isnav:'',
		}
	},
	mounted: function(){
		this.ckl();
	}, 
	methods:{
		navCl(el){
			if(el.p==4){
				this.downMoble(this.infoData);
				return
			}
			this.navOn = el.p;
			
		},
		ckl(){
			if(!this.$route.query.id){
				this.$router.push({path:'/activvity'})	
				return
			}
			
			this.ids = this.$route.query.id
			this.a_getInfo();
			
		},
		timeO(a){
			this.px = a;
			this.page=1;
			this.limit=20;
			this.a_getWork();
		},
		downMoble(d){
			
		},
		a_getWork(){
			let pr = {
				activity_id:this.ids,
				page:this.page,
				limit:this.limit,
			};
			if(this.px){
				pr['sort'] = this.px;
			}
			this.api.a_getWork(pr).then((da)=>{
				if(da=='error'){
					return
				}
				this.total = da.total;
				this.workList = da.data;
				if(!this.isnav){
					this.arr.push({n:'全部作品',p:2})
					this.isnav =1;
				}
				
				
			}).catch(()=>{
				
			})
		},
		a_getInfo(){
			this.api.a_getInfo({activity_id:this.ids}).then((da)=>{	
				if(da=='error'){
					this.$router.push({path: '/404'});
					return
				}
				this.infoData = da;
				if(da.is_provide_template==1){
					this.arr.push({n:'资料下载',p:4});
				}
				
				
				this.a_getWork();
				//  v-if="infoData.==1" @click="downMoble(infoData)" 
				
				
				// {n:'全部作品',p:2},
				// {n:'获奖公示',p:3},
				
				
				console.log(this.infoData);
				document.title=this.infoData.activity_name+'-狮圈儿（Zoocreators）';
			
				// this.shareData = {
				// 	titlec:'活动分享',
				// 	url:location.origin+'/aindex.html#/conta?id='+this.$route.query.id,
				// 	title:da.activity_name+'-狮圈儿创作者平台',
				// 	pics:da.banner,
				// 	desc:'惊现大神快来膜拜',
				// 	summary:da.activity_name+'-狮圈儿创作者平台',
				// 	bdtj:['活动','分享弹窗-']
				// };
				// this.$refs.fxd.setUrl(this.shareData);
				// if(this.infoData.status==0){
				//     this.show=true;
				// }else{
		  //           this.show=false;
				// }
			});
		},	
		handleSizeChange(val) {
		
			this.page.limit = val;
			this.page.page=1;
			this.a_getWork();
			
		},
		handleCurrentChange(val) {	
			this.goTop=1;	
			this.page.page = val;
			this.a_getWork();
		},
	}
}	
</script>

<style>
#app > div > div.ac_v1-1{
	padding: 0;
}
.ac_v1-2{
	display: block;width: 100%;
}
.ac_v1-3{
	position: fixed;
	width: 80px;
    top: 308px;
    right: 16px;
}
.ac_v1-3>img{
	display: block;
	width: 100%;
}
.ac_v1-4{
	background: #5e25d8;
	height: 120px;
	width: 100%;
}
.ac_v1-4x{
	margin: 0 auto;
	width: 1300px;
	text-align: left;
}
.ac_v1-4x>span{
	cursor: pointer;
	display: inline-block;
	vertical-align: top;
	color: #fff;
	line-height: 120px;
	font-size: 30px;
	text-align: center;
	width: 325px;
}
.ac_v1-4x>span.checkO{
	background: #fffc00;
	color: #5e25d8;
}
.ac_v1-4x>span:hover{
	color: #5e25d8;
	background: #fffc00;
}
.ac_v1-5{
	position: relative;
}
.ac_v1-5-1>img{
	display: block;
	width: 100%;
}
.ac_v1-5-2{
	background: #331087;
	padding: 80px 0 0 0;
	
}

.ac-01{
	margin-bottom: 40px;
	background: url(/imge/ac_v1/05.png) 0 0/40% no-repeat,url(/imge/ac_v1/06.png) 100% 70%/40% no-repeat;
	
}

.ac-04{

	display: block;
	width: 100%;
}
.ac-02{
	position: relative;
	padding: 30px;
	text-align: left;
	box-sizing: border-box;
	margin: 0 auto;
	background:#F4F6F9;
	border-radius: 4px;
	width: 1300px;
}
.ac-01-1{
	font-size: 30px;
	line-height: 35px;
	margin-bottom: 30px;
}
.ac-01-1>span{
	display: inline-block;
	vertical-align: top;
	font-size: 40px;
	margin-left: 4px;
	line-height: 35px;
}
.ac-01-2{
	position: absolute;
	right: 30px;
	top: 30px;
	font-size: 16px;
	line-height: 35px;
}
.ac-01-2>span{
	cursor: pointer;
	display: inline-block;
    vertical-align: top;
    font-size: 20px;
    color: rgb(51, 51, 51);
    line-height: 20px;
    margin: 0px 10px;
}
.ac-01-2>span:hover,.ac-01-2>span.chko{
	color: #ffb652;
}
.ac-01-3{
	text-align: center;
}
.ac-01-3 .el-pagination span:not([class*=suffix]){
	line-height: 40px;
}
</style>
