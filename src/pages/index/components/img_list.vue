<template>
	<div>
	<TcBox :config="con" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="igL">
				<div class="igL_l">
					<div class="igL_l_1">
						<div class="igL_up_1">
							<div class="igL_up_1_1">我的图片素材库</div>
							<div class="igL_up_1_2">
								上传文件大小需小于10M，支持JPG、PNG、GIF格式。
							</div>
							<div class="igL_up_1_3">上传图片</div>
						</div>
						<div class="igL_l_box">
							<div class="igL_l_1_2">
								<div v-for="(el,index) in zb_a" :key="index" @click="cs(index)" class="igL_up_L" :ref="'mb'+index">
									<div class="igL_up_L_1">
										<img src=""/>
									</div>
									<div class="igL_up_L_2">
										<span class="igL_up_L_2_1 hft">{{id_a[index]}}标题显示16个字符…</span>
										<span class="igL_up_L_2_2">100.00KB</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					
					
				</div>
				<div class="igL_r">
					<div @click="cs2(index)" v-for="(el,index) in id_b" :key="index"></div>
				</div>
			</div>
			<div class="qxBm_btns qxBm_btns2">
				<div class="btns pend">取消</div>	
				<div class="btn-lod btns pend" @click="cs">
					<i v-if="upType" class="loading_a m_c"></i>
					<span v-else>删除</span>
				</div>		
				<div class="btn-lod btns btns_js pend">
					<i v-if="upType" class="loading_a m_c"></i>
					<span v-else>插入</span>
				</div>										
			</div>
		</template>			
	</TcBox>
	</div>
</div>
</template>
<script>
import TcBox from './TcBox';
export default {
	components:{TcBox},
	props:{
		config:Object,
	},
	data(){
		return{
			con:{
				title:'上传图片',
			},
			upType:'',
			List_a:[{},{},{},{},{},{},{},{},{},{}],
			List_b:[],
			List_id:[],
			
			zb_a:[],
			zb_b:[],
			id_a:[],
			id_b:[],
		}
	},
	mounted: function() {
		this.init();
		this.show();
	},
	methods: {
		init(){
			let arrB=[];
			for(let i=0,n=this.List_a.length;i<n;i++){
				this.zb_a.push(i);
				
			}
		
		},
		clickPos(on){
			let arr = [];
			let ond = 0;
			for(let i=0,n=this.zb_a.length;i<n;i++){
				let pn;
				if(i<=on){
					pn = this.zb_a[i];
				}
				if(i>on){
					if(this.zb_a[i]==-1){
						pn = this.zb_a[i];	
						ond++;
					}else{
						pn = (this.zb_a[i-1-ond]);
						ond=0;
					}					
				}				
				arr.push(pn);
			}
			arr[on] = -1;
			this.zb_a = arr;
		},
		setPos(on,index){
			if(on==-1){
				
				return 'height:124px;transform: translate(760px,'+(52+(this.id_b.indexOf(index)*86))+'px) scale(0.46);position: fixed;';
			}
			let x,y;
			let xd = on%3;
			switch (xd){
				case 0:x = 0;
					break;
				case 1:x = 240;
					break;
				case 2:x = 480;
					break;
			}			
			let yd = parseInt(on/3);			
			y= yd*176;		
			let p = 'transform: translate('+x+'px,'+y+'px) scale(1);';
			return p;
		},
		clickPos2(on){
			let arr = [];
			let ond = -1;
			for(let i=0,n=this.zb_a.length;i<n;i++){
				let pn;
			
				if(i<on){
					pn = this.zb_a[i];
					if(this.zb_a[i]!=-1){
						ond=this.zb_a[i];
					}
				}
				if(i==on){
					pn = ond+1;
					ond++;
				}
				if(i>on){
					if(this.zb_a[i]==-1){
						pn = this.zb_a[i];							
					}else{
						pn = (this.zb_a[i]+1);
					}					
				}				
				arr.push(pn);
			}
			
			this.zb_a = arr;

			this.$refs['mb'+on][0].className="igL_up_L cs";
			setTimeout(()=>{
				this.$refs['mb'+on][0].className="igL_up_L";
			},300)
		},
		cs(on){
			this.id_b.push(this.zb_a.splice(on,1));
			
			
			
		},
		cs2(on){
			this.zb_a.push(this.id_b.splice(on,1));
		},
		qdFn(){	
			if(this.config['qFn']){
				this.$parent[this.config['qFn']]();	 
				return
			}
			this.$emit('qFn')
		
		},
		show(){

			this.$refs.tcBox.show();
		},
		close(){
			if(this.config['closeFnd']){
				this.$parent[this.config['closeFnd']]();
			}			
			this.$refs.tcBox.close();
		},
	}
}		
	
</script>

<style>
.igL{
	width: 960px;
	height: 544px;
	overflow-y: hidden;
}
.igL_l,.igL_r{
	display: inline-block;
	vertical-align: top;
}
.igL_l{
	width:780px;
	height:544px;
	background:rgba(244,246,249,1);
}
.igL_l_1{
	padding: 30px 0;
}
.igL_l_1>div{
	padding: 0 40px;
}
.igL_up_1{
	position: relative;
	height: 42px;
	text-align: left;
	margin-bottom: 20px;
}
.igL_up_1_1{
	font-size:14px;
	color:rgba(51,51,51,1);
	line-height:20px;
}
.igL_up_1_2{
	font-size:12px;
	color:rgba(153,153,153,1);
	line-height:17px;
}
.igL_up_1_3{
	position: absolute;
	right: 40px;
	bottom: 0;
	box-sizing: border-box;
	text-align: center;
	line-height: 31px;
	font-size:14px;
	color:rgba(102,102,102,1);
	width:100px;
	height:32px;
	background:rgba(255,255,255,1);
	border-radius:5px;
	border:1px solid rgba(187,187,187,1);
}
.igL_r{
	width: 180px;
}
.igL_up_L{
	overflow: hidden;
	margin: 0 20px 20px 0;
	display: inline-block;
	vertical-align: top;
	text-align: left;
	width:220px;
	height:156px;
	background:rgba(255,255,255,1);
	border-radius:5px;
}
.igL_l_1_2{
	position: relative;
	text-align: left;
	margin-right: -40px;
}
.igL_l_1_2>.igL_up_L:nth-child(3n+3){
	/* margin-right: -17px; */
}
.igL_up_L_1{
	overflow: hidden;
	width:220px;
	height:124px;
	border-radius:5px 5px 0px 0px;
	background: #1890FF;
	margin-bottom: 6px;
}
.igL_up_L_1>img{
	display: block;
	width: 100%;
}
.igL_up_L_2{
	position: relative;
	padding: 0 10px;
	text-align: left;
	font-size:14px;
	color:rgba(102,102,102,1);
	line-height:20px;
}
.igL_up_L_2_1{
	display: inline-block;
	vertical-align: top;
	width: 127px;
	height: 20px;
}
.igL_up_L_2_2{
	position: absolute;
	right: 10px;
	top:0;
	color:rgba(187,187,187,1);

}
.igL_l_box{
	overflow-y: auto;
	height: 453px;
}
.igL_r{
	padding: 30px 0;
}
.igL_r>div{
	margin: 0 auto 30px;
	width:100px;
	height:56px;
	box-shadow:0px 2px 6px 0px rgba(0,0,0,0.1);
	border-radius:5px;
}
.myis{
	overflow: hidden;
	margin: 0;
	width: 0;
}

</style>
