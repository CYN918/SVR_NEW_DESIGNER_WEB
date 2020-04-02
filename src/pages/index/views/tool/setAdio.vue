<template>
	<div class="box_p_01">
		<div class="mp3_03" ref="nsdf">
			<div class="mp3_03_0">
				<spck
				v-model="type"
				class="mp3_03_1"
				:List="navs"
				:keys="'v'"
				:v="'n'"
				></spck>
				<div class="mp3_03_2">
					<img @click="ss()" :src="imgPath+'tools/ss.png'"/>
					<input @keyup.enter="ss()" v-model="name" placeholder="搜索音乐" type="text">
				</div>
			</div>				
			<spck 
			
			v-if="type=='sh_List'"
			v-model="clas"
			class="mp3_03_3"
			:List="cls"
			:keys="'com_classify_name'"
			:v="'com_classify_name'"
			
			></spck>
			
		</div>
		<div class="mp3_04">
			<div class="mp3_04_01"><span></span><span>歌曲</span><span>歌手</span><span>时长</span><span></span></div>
			
			<div 
			@dblclick="bf(el, index)"
			v-for="(el,index) in datas"
			:class="['mp3_04_01 mp3_04_01xd',index%2==0?'mp3_04_01x':'']" 
			>
				<span><span :class="index<3?'setAdio_01':''">{{index+1}}</span></span>
				<span><span class="mp3_04_01_t hft">{{el.name}}</span></span><span>
				{{el.author}}</span><span>
				{{backT(el.duration)}}</span><span class="seadio_to">
					<img @click="bf(el,index)" class="mp3_04_01_bf pend" :src="bRunning && (bfData.on && bfData.on==index)?'/imge/tools/music_icon_pause.svg':'/imge/tools/music_icon_play.svg'"/>
					<img @click="favor(el)" class="mp3_04_01_sc pend" :src="el.is_collect==0?'/imge/tools/music_icon_list_like_def.svg' :'/imge/tools/music_icon_list_like.svg'"/>
					<span @click="checks(el)" class="setAdio_02 pend">选用</span>
				</span>
			</div>
		</div>
		
		<div class="mp3_05">
			<div class="mp3_05_1">
				<span></span>
			</div>
			<div class="mp3_05_2">
				<span class="mp3_05_2_1">
					<img  :src="bfData.logo"/>
				</span>
				
				<span class="mp3_05_2_2">
					<div class="mp3_05_2_2_1 hft">
						{{bfData.name}}
					</div>
					<div class="mp3_05_2_2_2">
						<span class="mp3_05_2_2_2_1 hft">{{bfData.author}}</span>
						<span class="mp3_05_2_2_2_2">
						{{bfData.bft}} / {{backT(bfData.duration)}}
						</span>
					</div>
				</span>
				<span class="mp3_05_2_3">
					<div @click="sys()" class="pr_adio"></div>
					<div @click="bf()" :class="['pr_adio_03',bRunning?'pr_adio_03_2':'pr_adio_03_1']"></div>
					<div @click="xys()" class="pr_adio pr_adio_02"></div>					
					<img @click="favor()" class="mp3_04_01_sc pend" :src="bfData.is_collect==0?'/imge/tools/music_icon_list_like_def.svg' :'/imge/tools/music_icon_list_like.svg'"/>
				</span>
				<span @click="checks()" class="pend mp3_05_2_4">选用</span>
			</div>
		</div>
		<audio @timeupdate="timeupdate" ref="aido"></audio>
	</div>
</template>

<script>
import spck from './fospan'
export default{
	components:{
		spck
	},
	props:{
		value:Object
	},
	data(){
		return{
			navs:[
				{n:'发现音乐',v:'sh_List'},
				{n:'我收藏的',v:'sh_CollectList'},
			],
			type:'sh_List',
			name:'',
			cls:[
				{n:'1',k:'1'},
				{n:'1',k:'2'},
				{n:'1',k:'3'}
			],
			clas:'',
			datas:[],
			bfData:{
				logo:'https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/New/imge/tools/resizeApi.png',
				name:'--',
				author:'--',
				bft:'00:00',
				duration:0,
				is_collect:0,
			},
			bRunning:false,
		}
	},
	watch:{
		'clas'(){
			this.getList();
		},
		'type'(){
			if(!this.clas){
				this.getList();
			}
			this.clas = '';			
		},
		
	},
	mounted: function () {
		this.init();
	}, 
	methods:{
		init(){
			this.getcls();
			this.getList();
		},
		getcls(){
			this.api.sh_class({}).then((da)=>{
				if(da=='error'){return}
				this.cls = da;
				
			})
			
		},
		sh_audioUrld(el){
			this.api.sh_audioUrl({
				m_id:el.m_id
			}).then((da)=>{
				if(da=='error'){return}
			
				let pr = {
						type: "audio",
						file_url: da.file_url,
						start: 0,
						end: el.duration,
						long:el.duration,
						cut_start: 0,
						cut_end: el.duration,
						fps_pic:'',
						fps:'',
						fid:el.m_id,
						ischeck:'',
				};				
				let ond = this.value.audio[0];
				if(!ond){
					this.value.audio.push(pr);
					return
				}
				
				this.value.audio.splice(0,1,pr);
				console.log(this.value.audio);
				
					
							
			})
		},
		sh_addFavorAudio(id) {
			this.api.sh_addFavorAudio({
				m_id : id
			}).then((da) => {
				if (da == 'error') {
					return;
				}
				
				this.getList();
			})
		},
		sh_delFavorAudio(id) {
			this.api.sh_delFavorAudio({
				m_id : id
			}).then((da) => {
				if (da == 'error') {
					return;
				}
				//成功，刷新列表
				this.getList();
			})
		},
		checks(el){
			if(el){
				this.sh_audioUrld(el);
				return
			}

			let ond = this.bfData.on;
			let choseEl = this.datas[ond];
			this.sh_audioUrld(choseEl);
		},
		sys(){
			if(this.datas.length==0){
				return
			}

			if(this.bfData.on<1){
				return
			}
			let ond = this.bfData.on-1;
			let pd = this.datas[ond];
			this.bfData = {
				m_id:pd.m_id,
				on:ond,
				logo:pd.logo,
				name:pd.name,
				author:pd.author,
				bft:'00:00',
				duration:pd.duration,
			};
			this.$refs.aido.pause()
			this.sh_audioUrl(pd.m_id);
			
		},
		xys(){
			let len = this.datas.length;
			if(len==0){
				return
			}
			if(this.bfData.on>len-2){
				return
			}
			let ond = this.bfData.on+1;
			let pd = this.datas[ond]
			this.bfData = {
				m_id:pd.m_id,
				on:ond,
				logo:pd.logo,
				name:pd.name,
				author:pd.author,
				bft:'00:00',
				duration:pd.duration,
			};
			this.$refs.aido.pause()
			this.sh_audioUrl(pd.m_id);
		},
		bf(el,on,ispd){
			
			if(el && this.bfData &&  this.bfData.m_id!=el.m_id){
				
				this.bfData = {
					on:on,
					m_id:el.m_id,
					logo:el.logo,
					name:el.name,
					author:el.author,
					bft:'00:00',
					duration:el.duration,
					is_collect:el.is_collect,
				};
				
				this.sh_audioUrl(el.m_id);
				return
			}
			console.log(111111111);
			if(!this.$refs.aido.src){
				return
			}
			if (this.bRunning) {
				this.bRunning = false;
				this.$refs.aido.pause();
			} else {
				this.bRunning = true;
				this.$refs.aido.play();
			}

		},
		sh_audioUrl(id){
			this.api.sh_audioUrl({
				m_id:id
			}).then((da)=>{
				if(da=='error'){return}
				this.$refs.aido.src=da.file_url;
				this.bRunning = true;
				this.$refs.aido.play();
				
			})
		},
		favor(el) {
			if (el) {
				if (el.is_collect == 1) {
					this.sh_delFavorAudio(el.m_id);
				} else {
					this.sh_addFavorAudio(el.m_id);
				}

			} else {
				let ond = this.bfData.on;
				let id = this.datas[ond].m_id;
				if (this.datas[ond].is_collect == 1) {
					this.sh_delFavorAudio(id);
				} else {
					this.sh_addFavorAudio(id);
				}

			}
		},
		ckAdio(el){
		
		},
		timeupdate(){
			this.$set(this.bfData,'bft',this.backT(Math.ceil(this.$refs.aido.currentTime)));		
		},
		backT(t){
			
			let ond = t%60;
			
			if(ond<10){
				ond = '0'+ond;
			}
			if(t<60){
				return '00:'+ond;
			}
			
			let fz = (t-ond)/60;
			if(fz<10){
				fz = '0'+fz;
			}
			
			return fz+':'+ond;
			
		},
		ss(){
			this.getList();
		},
		getList(){
			let pr = {
				page:1,
				limit:100,
			};
			if(this.name){
				pr.name = this.name;
			}
			if(this.clas){
				pr.com_classify_name = this.clas;
			}
			if(window.source){
				window.isStop=1;
				setTimeout(()=>{
					window.isStop = '';
				},50)
				window.source();
			}
			
			
			
			this.api[this.type](pr).then((da)=>{
				if(da=='error'){
					return
					
					
				}
				try{
					this.datas = da.data;
				}catch(e){
					
				}
				
				
			})
		},
		close(){
			this.$emit('input',{});
		},
		closeD(e) {
			let listArea = document.querySelector(".mp3_01");
			if(listArea){
				if(!listArea.contains(e.target)){
					this.close();
				}
			}
		},
		qh(el){
			this.type = el;
		},
		bcktop(){
			if(this.$refs.nsdf){
				let on =  this.$refs.nsdf.getBoundingClientRect();
				return on.height+on.top+44;
			}			
		}
	}
}
</script>

<style>	
.pr_qp{
	position: fixed;
	top: 0;
	left: 0;
	background: rgba(0,0,0,.3);
	width: 100%;	
	height: 100%;
	min-width: 1300px;
	text-align: left;
}

.mp3_01{
	position: fixed;
	top: 60px;
	right: 0;
	width:860px;
	height:90%;
	background:rgba(255,255,255,1);
	box-shadow:0px 2px 8px 0px rgba(0,0,0,0.1);
	border-radius:5px;
	overflow: hidden;
	
}
.mp3_02{
	position: relative;
	width:860px;
	height:54px;
	background:#fff;
	border-radius:5px 5px 0px 0px;
	font-size:14px;
	text-align: left;
	color:rgba(51,51,51,1);
	line-height:54px;
	border-bottom: 1px solid rgba(244,246,249,1);

}
.mp3_02_1{
	margin-left: 20px;
}
.mp3_02_2{
	position: absolute;
	top: 21px;
	right: 20px;
	width: 12px;
}
.mp3_03{
	position: relative;
	margin: 20px;
	border-bottom: 1px solid #D9D9D9;
}
.mp3_03_0{
	position: relative;
	margin-bottom: 20px;
}
.mp3_03_1>span{
	position: relative;
	display: inline-block;
	vertical-align: top;
	font-size:14px;
	color:rgba(30,30,30,1);
	line-height:32px;
	margin-right: 52px;
}
.mp3_03_1>span.chekd{
	color: #33B3FF;
}
.mp3_03_1>span.chekd:after{
	content: "";
	position: absolute;
	bottom: 0;
	left: 5%;
	width: 90%;
	background: #33B3FF;
	height: 1px;
}
.mp3_03_2{
	position: absolute;
	right: 20px;
	top: 0px;
	width:158px;
	height:30px;
	border-radius:25px;
	border:1px solid rgba(217,217,217,1);
}
.mp3_03_2>img{
	position: absolute;
	top: 9px;
	left: 21px;
	width: 12.86px;
	
}
.mp3_03_2>input{
	border: none;
	background: none;
	display: block;	
	box-sizing: border-box;
	padding: 0 10px 0 44px;
	width: 100%;
	height: 100%;
	font-size:14px;
}
.mp3_03_3{
	overflow: hidden;
    margin-bottom: 10px;
    margin-right: -20px;
}
.mp3_03_3>span{
	margin-right: 20px;
	display: inline-block;
	vertical-align: top;
	width:98px;
	height:30px;
	background:rgba(255,255,255,1);
	border:1px solid rgba(217,217,217,1);
	font-size:14px;
	margin-bottom: 10px;
	color:rgba(51,51,51,1);
	line-height:30px;
	text-align: center;
}
.mp3_03_3>span.chekd{
	color: #fff;
	background: #33B3FF;
	border-color: #33B3FF;
}
.mp3_05{
	position: absolute;
	bottom: 0;
	width:100%;
	height:82px;
	background:rgba(251,251,251,1);
}
.mp3_05_1{
	position: relative;
	background: #FBFBFB;
	height: 1px;
	overflow: hidden;
}
.mp3_05_1>span{
	position: absolute;
	top: 0;
	left: 0;
	-webkit-transform: translateX(-100%);
	transform: translateX(-100%);
	width: 100%;
	height: 100%;
	background: #33B3FF;
}
.mp3_05_2{
	box-sizing: border-box;
	padding: 24px 40px;
	height: 78px;
    background: #fff;
    border-top: 2px solid #D9D9D9;
}
.mp3_05_2>span{
	display: inline-block;
	vertical-align: top;
}
.mp3_05_2_1{
	position: relative;
	width:48px;
	height:48px;
	border-radius:50%;
	margin-right: 10px;
}
.mp3_05_2_1>img{
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	width:48px;
	height:48px;
	border-radius:50%;
}
.mp3_05_2_2{

}
.mp3_05_2_2_1{
	width: 210px;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
	margin-bottom: 10px;
}
.mp3_05_2_2_2{
	width: 141px;
	position: relative;
	font-size:12px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:18px;		
}
.mp3_05_2_2_2_1{
	display: block;
	width: 105px;
}
.mp3_05_2_2_2_2{
	position: absolute;
	top: 0;
	right: 0;
	
}
.mp3_05_2_4{
	position: absolute;
	right: 66px;
	top: 32px;
	text-align: center;
	width:100px;
	height:32px;
	background:rgba(51,179,255,1);
	border-radius:5px;
	font-size:14px;
	color:rgba(255,255,255,1);
	line-height:32px;
	color: #fff;
}
.mp3_04{
	overflow: hidden;
	overflow-y: auto;
	box-sizing: border-box;
	width: 100%;
	height: 582px;
	padding: 0 20px;
	position: relative;
	top: 0;
}
.mp3_04_01>span{
	position: relative;
	display: inline-block;
	vertical-align: top;
	line-height: 44px;
}
.mp3_04_01>span:nth-child(1){
	text-indent: 20px;
	width: 12%;
}
.mp3_04_01>span:nth-child(2){
	width: 30%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.mp3_04_01>span:nth-child(3){
	width: 30%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;

}
.mp3_04_01>span:nth-child(4){
	width: 12%;
}
.mp3_04_01>span:nth-child(5){
	width: 16%;
}
.mp3_04_01x{
	background: rgba(242,242,242,.3);
}
.mp3_04_01_t{
	display: inline-block;
	vertical-align: top;
	width: 212px;
}
.mp3_04_01xd{
	font-size: 14px;
}


.mp3_04_01_bfs{
	display: none;
	position: absolute;
	right: 25px;
	top: 0;
}
.mp3_04_01_bfs>img{
	display: inline-block;
	vertical-align: top;
	width: 16px;
	margin-left: 22px;
	margin-top: 15px;
}
.mp3_04_01_bfs>img.mp3_04_01_sc{
	margin-top: 16px;
}
.box_p_01{
	position: relative;
}
.seadio_to>img{
	display: inline-block;
	vertical-align: top;
	width: 19px;
	margin-top: 14px;
    margin-right: 10px;
}
.setAdio_02{
	color: #33B3FF;
}
.setAdio_01{
	color: #FF9200;
}
.pr_adio{
	display: inline-block;
	vertical-align: top;
	margin-right: 20px;
	margin-top: 12px;
}
img.mp3_04_01_sc {
    margin-top: 13px;
    display: inline-block;
    vertical-align: top;
}
.pr_adio:before{
	content: "";
	display: inline-block;
	background: #33B3FF;
	width: 2px;
	height: 16px;
	
}
.pr_adio:after{
	content: "";
	display: inline-block;
	width: 0;
	height: 0;
	border-top: 8px solid transparent;
	border-bottom:8px solid transparent;
	border-right:13px solid #33B3FF;
}
.pr_adio_02{
	transform: rotate(180deg);
    transform-origin: 50% 41%;
    
}
.pr_adio_03{
	position: relative;
	display: inline-block;
	vertical-align: top;
	border-radius: 50%;
	margin-right: 20px;
	width:40px;
	height:40px;
	background:rgba(51,179,255,1);
}
.pr_adio_03:after{
	content: "";
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.pr_adio_03_1:after{	
	width:0;
	height:0;
	border-top:8px solid transparent;	
	border-bottom:8px solid transparent;
	border-left:13px solid #fff;
}
.pr_adio_03_2:after{
	width:12px;
	height:16px;
	background: #fff;
	background-image: linear-gradient(to right,#fff 2px,rgba(51,179,255,1) 8px,#fff 2px);
}
</style>
