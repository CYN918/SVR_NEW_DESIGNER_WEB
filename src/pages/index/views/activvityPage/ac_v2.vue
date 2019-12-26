<template>
	<div>
		<div class="ac_v1-1">
			<img class="ac_v1-2" src="/imge/ac_v2/ban.png"/>
			
			<div class="ac_v2">
				<div class="ac_v2-1">
					<span>
						<div>当前状态</div>
						<div>招募期</div>
					</span>
					<span>
						<div>截止报名时间</div>
						<div>13天	12:00:00</div>
					</span>
					<span>
						<div>报名人数</div>
						<div>12413</div>
					</span>
					<span>
						<div>金额</div>
						<div>￥12413</div>
					</span>
				</div>
			</div>
			<!-- <div class="ac_v1-4">
				<div class="ac_v1-4x">
					<span @click="navCl(el)" :class="el.p==navOn?'checkO':''" v-for="el in arr">{{el.n}}</span>
				</div>
			</div> -->
			
			
			<div class="ac_v1-5">
				<div class="ac_v1-5-1">
					<img src="/imge/ac_v2/01.png">
				</div>
				
			</div>
			
			<div class="ac_v1-3">
				<img src="/imge/ac_v2/fx.png"/>
				
				<div @click="shaFn('fxUrl2')" class="ac_v1-3-2x"></div>
				<div @click="shaFn('fxUrl1')" class="ac_v1-3-3"></div>
			</div>
			<component v-bind:is="tanData.zj" v-model="tanData"></component>	
		</div>
		
	</div>
</template>

<script>
import list from '../../components/list';
import box_a from '../../components/box_a';
import com_wp from '../activvity/com_wp';
export default{
	components:{list,box_a,com_wp},
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
			fxUrl1:'',
			fxUrl2:'',
			tanData:{},
		}
	},
	mounted: function(){
		this.ckl();
	}, 
	methods:{
		navCl(el){
			if(el.p==this.navOn){
				return
			}
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
		shaFn(n){
			window.open(this[n]);
		},
		shar(da){
		
			let ulrd = encodeURIComponent(da.url);
			this.fxUrl1 = 'http://service.weibo.com/share/share.php?appKey=3473072390&title='+da.title+'&url='+ulrd+'&pic='+da.pics+'#_loginLayer_'+(new Date()).valueOf();
			this.fxUrl2 ='https://connect.qq.com/widget/shareqq/index.html?url='+ulrd+'&title='+da.title+'&pics='+da.pics+'&desc=&summary='+da.summary+'&site=wo';			
			
		},
		timeO(a){
			this.px = a;
			this.page=1;
			this.limit=20;
			this.a_getWork();
		},
		downMoble(d){
			if(d.template_file_type==1){
				window.downloadFiles(d.template_url,d.template_file_name);
				return
			}
			this.tanData = {
				zj:'com_wp',
				info:online_disk_info
			};
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
				
				document.title=this.infoData.activity_name+'-狮圈儿（Zoocreators）';
			
				this.shar({
					titlec:'活动分享',
					url:location.origin+'/aindex.html#/conta?id='+this.$route.query.id,
					title:da.activity_name+'-狮圈儿创作者平台',
					pics:da.banner,
					desc:'惊现大神快来膜拜',
					summary:da.activity_name+'-狮圈儿创作者平台',				
				});
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

.ac_v1-3-2x{
    position: absolute;
    top: 74px;
    left: 10px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
.ac_v2{
	position: absolute;
	top: 0;
	left: 50%;	
	padding-top: 7%;
	transform: translateX(-50%);

	width: 100px;
	height: 200px;
}
</style>
