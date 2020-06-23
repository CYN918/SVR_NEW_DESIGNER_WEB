<template>
	<div :class="['pr_boxd',total>40?'toptool':'']">
		<table v-if="List.length>0" class="tabld" border="1">
			<tr >
				<th v-for="(el,index) in cg.title" :key="index">{{el.n}}</th>
			</tr>
			<tr v-for="(el,index) in List" :key="index">
				<td v-for="(el2,index2) in cg.title" :key="index2">
					{{xData(el2,el)}}
					<span v-if="el2.html" v-html="el[el2.html]"></span>
					<span v-if="el2.temp" @click="clickFn(el2.temp.cFn,el)" :class="el2.temp.cls" >
						<span v-if="el2.temp.clfn && el.deal_type == '3' && el2.t == '1'" v-html="el2.temp.clfn(el)" @click="modxseover(el,2,index)"></span>
						<span v-else-if="el2.temp.clfn" v-html="el2.temp.clfn(el)"></span>
						<span v-else>
							{{el2.temp.poprs?el[el2.temp.poprs]:el2.temp.value?el2.temp.value:''}}
						</span>
					</span> 
				</td>
				<div :id="'box-Dialog'+index" class="box-Dialog">
					<img class="box-detele_n8" src="http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/detele.svg"  @click="modseout(index)"/>
					<div class="box-sytc_1">
						<div class="box-sytc_1_n1">累计已付预付金</div>
						<div class="box-sytc_1_n2"><i style="color:rgba(51,179,255,1);font-style: normal;">￥{{formatMoney(dqpayment)}}</i>/￥{{formatMoney(paymentObj)}}</div>
						<div class="box-time_n3">
							<li v-for="(item,index) in paymentData" :class="[on==index?'action':'']">
								{{item.year}}年
								<div class="box-month_1_n4" v-if="dateList[0] == item.year">
									<ul>
										<li v-for="(todo,index1) in item.data">
											<div v-if="dateList[1] == (index1+1)" style="background:rgba(51,179,255,1);width: 92px;height: 60px;border-radius: 5px;border:1px solid rgba(51,179,255,1);">
												<p style="color: rgba(255,255,255,1);">{{index1+1}}月</p>
												<p v-if="todo == '0'" class="teshu" style="color: rgba(153,153,153,1);">暂无数据</p>
												<p v-else class="teshu">￥{{formatMoney(todo)}}</p>
											</div>
											<div v-else>
												<p>{{index1+1}}月</p>
												<p v-if="todo == '0'" style="color: rgba(153,153,153,1);">暂无数据</p>
												<p v-else>￥{{formatMoney(todo)}}</p>
											</div>	
										</li>
									</ul>
								</div>
								<div class="box-month_1_n4" v-else>
									<ul>
										<li v-for="(todo,index1) in item.data">	
											<p>{{index1+1}}月</p>
											<p v-if="todo == '0'" style="color: rgba(153,153,153,1);">暂无数据</p>
											<p v-else>￥{{formatMoney(todo)}}</p>	
										</li>
									</ul>
								</div>
							</li>
						</div>
						<div>
							<img src="http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/btn_left.svg" class="btn_left" alt="" @click="btnleft()"/>
							<img src="http://zk-img.oss-cn-qingdao.aliyuncs.com/h5/cyn/prcent/btn_right.svg" class="btn_right" alt="" @click="btnright()"/>
						</div>	
						<div class="box-txt_n4">该项目已签署补充协议，按照【预约金+分成】形式结算，可在项目详情内下载协议查看。</div>
					</div>
				</div>					
			</tr>	
		</table>	
		<el-pagination class="pagesddd" v-if="total>40"
		background
		@size-change="handleSizeChange"
		@current-change="handleCurrentChange"
		:current-page="page"
		:page-sizes="[10, 20, 40]"
		:page-size="limit"
		layout="prev,pager, next,sizes, jumper"
		:total="total">   
		</el-pagination>
		<div v-if="List.length == 0" class="emptyData">
			<img src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/svg/empty_nodata.svg" alt="">
			<div class="noDatawan">这里还什么都没有呢~</div>
		</div>
		
				
	</div>
</template>

<script>
import { Loading } from 'element-ui';
export default {
	name: 'prTable',
	props:{
		cg:{
			type:Object,
			default:{pr:{}},
			sfas:'',
		},
	},
	data(){
		return {
			List:[],
			page:1,
			limit:40,
			total:0,
			isNodeat:'',
			loading: '',
			paymentData:[],
			paymentObj:{},
			dqpayment:'',
			on:0,
			dateList:[],
		}
	},
	mounted: function(){
		this.getData();
	}, 
	methods: {
		formatMoney(input){ 
			var n = parseFloat(input).toFixed(2);
			var re = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
			return n.replace(re, "$1,");
		},
		btnleft(){
			if(this.on>0){
				this.on--;
				return
			}
			// this.on = this.paymentData.length-1;	
		},
		btnright(){
			if(this.on<this.paymentData.length-1){
				this.on++;			
				return
			}
			// this.on = 0;
		},
		clickFn(n,o){
			if(!this.$parent[n]){
				return
			}
			this.$parent[n](o);
		},
		xData(o1,o2){
			if(o1.poprs){
				return o2[o1.poprs]?o2[o1.poprs]:'';
			}
			
			if(o1.clfn){				
				return o1.clfn(o2);
			}
			
			if(o1.temp){
				
			}
		},
		sxfn(){
			this.page=1;
			this.limit=40;
			this.getData();
		},
		getData(da){			
			let params = {
				page:this.page,
				limit:this.limit
			};
			
			params =  Object.assign(params,this.cg.pr);	
			if(this.loading){
				this.loading.close();
			}
			this.loading = Loading.service({target:'.emptyData',fullscreen: true });
			this.api[this.cg.ajax.url](params).then((da)=>{
				this.loading.close();
				if(da=='error' || da=='104'){
					return
				}				
				this.List = da.data;
				this.total = da.total;
			
				if(this.$parent.settotal){
					this.$parent.settotal(da.total);
				}
				if(this.List.length==0){
					this.isNodeat=1;
				}				
				window.scrollTo(0,0);
			}).catch(()=>{
				this.loading.close();
			})
		},
		handleSizeChange(val) {
			this.limit = val;
			this.page=1;
			this.getData();
		},
		handleCurrentChange(val) {
			this.page = val;
			this.getData();
		},
		modseout(index){
			document.getElementById('box-Dialog'+index).style.display = 'none';
		},
		dividedList(id,date){
			let pr = {
				project_id : id
			};
			this.api.AdvancePayment(pr).then((da)=>{
				console.log(da);
				this.paymentObj = da.advance_payment_total_income;
				this.paymentData = da.data;
				// this.paymentObj = da;
				// this.paymentData = da.data;
				this.dateList = date.split('-');
				this.paymentData.forEach((element,index) => {
					if(this.dateList[0] == element.year){
						this.dqpayment = element.data[Number(this.dateList[1]-1)];
						this.on = index;
					}
				});
			})
		},
		modxseover(e,on,index){
			if(on == 2){
				this.dividedList(e.work_id,e.balance_date)
				document.getElementById('box-Dialog'+index).style.top = ((index+2)*59)+'px';
				document.getElementById('box-Dialog'+index).style.display = 'block';
			}
			if(on == 1){

			}	
		},
		
	}
}
</script>

<style>
.pr_boxd{
	min-height: 315px;
	position: relative;
	width: 1300px;
	margin: 20px auto 60px;
}

.pr_boxd .pagesddd{
	bottom: 0;
}
.toptool{
	padding-bottom:80px;
}
.tabld{
	width: 100%;
	text-align: left;
	border: none;
	line-height: 55px;
	border-collapse: collapse;
}
.tabld th{
	padding-left: 20px;
	background: #fff;
	border: none;
	border-bottom: 1px solid #f6f8fa;

}
.tabld td{
	padding-left: 20px;
	border: none;
	background: #fff;
	border-bottom: 1px solid #f6f8fa;
}
.noDatawan{
	color: #33B3FF;
    margin-top: 18px;
}
.jc{
	color:rgba(255,146,0,1);
	
}
/* .pbx_n_06{
	margin-top: 19px;
} */
.sy{
	color:rgba(255,146,0,1);
}
.proLink{
	color:rgba(51,51,51,1);
}
.pbx_n_img{
	display: inline-block;
    cursor: pointer;
    vertical-align: top;
    width: 16px;
    margin: 20px 0 0 5px;

}
.box-Dialog{
	position: absolute;
	z-index: 10;
    right: -20px;
	top: 57px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: left;
    -webkit-transform: translate(-35%,-3%);
    transform: translate(-35%,-3%);
    width: 447px;
	height: 464px;
    background: rgba(255,255,255,1);
    -webkit-box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
    box-shadow: 0px 2px 8px 0px rgba(0,0,0,0.1);
    border-radius: 5px;
	display: none;
	z-index: 9999999;
}
.box-sytc_1{
	width: 447px;
	height: 464px;
    background: rgba(255,255,255,1);
}
.box-Dialog:after {
    content: "";
    position: absolute;
    left: 74%;
    top: -3px;
    width: 15px;
    height: 15px;
    background: #fff;
    -webkit-transform: rotate(45deg) translateX(-50%);
    transform: rotate(45deg) translateX(-50%);
    border: 1px solid rgba(152, 144, 144, 0.1);
    border-right: 0;
    border-bottom: 0;
}
.box-sytc_1_n1{
	height: 20px;
	line-height: 20px;
	color:rgba(153,153,153,1);
	font-size: 14px;
	padding: 30px 0px 0px 15px;
}
.box-sytc_1_n2{
	height: 34px;
	font-size:24px;
	font-family:PingFangSC-Medium,PingFang SC;
	font-weight:500;
	color:rgba(40,40,40,1);
	line-height:34px;
	padding: 0px 0px 0px 10px;
}
.box-time_n3{
	width:406px;
	height:48px;
	border-radius:5px;
	border:1px solid rgba(217,217,217,1);
	margin: 20px auto 10px auto;
	position: relative;
}
.box-time_n3 > li{
	width:414px;
	/* height:48px; */
	line-height: 48px;
	text-align: center;
	float: left;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(40,40,40,1);
	display: none;
}
.box-time_n3 .action{
	display: block;
}
.btn_left{
	position: absolute;
	top: 120px;
	left: 30px;
	cursor: pointer;
}
.btn_right{
	position: absolute;
	top: 120px;
	right: 30px;
	cursor: pointer;
}
.box-month_1_n4{
	width:414px;
	height: 240px;
}
.box-month_1_n4 > ul > li{
	width: 94px;
	height: 62px;
	border-radius:5px;
    border:1px solid rgba(217,217,217,1);
	float: left;
	margin: 10px 7.5px 0px 0px;
}
.box-month_1_n4 > ul > li:hover{
	border:1px solid rgba(51,179,255,1);
}
.box-month_1_n4 > ul > li > div > p{
	height: 22px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	line-height:22px;
}
.box-month_1_n4 > ul > li > div .teshu{
	color:rgba(255,255,255,1) !important;
}
.box-month_1_n4 > ul > li > div > p:nth-child(1){
	color:rgba(153,153,153,1);	
	padding-top: 8px;
}
.box-month_1_n4 > ul > li > div > p:nth-child(2){
	color:rgba(40,40,40,1);
	margin-top: 5px;
}
.box-month_1_n4 > ul > li > p{
	height: 22px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	line-height:22px;
}
.box-month_1_n4 > ul > li > p:nth-child(1){
	color:rgba(153,153,153,1);	
	margin-top: 8px;
}
.box-month_1_n4 > ul > li > p:nth-child(2){
	color:rgba(40,40,40,1);
	margin-top: 5px;
}
.box-txt_n4{
	width:416px;
	height:40px;
	font-size:14px;
	font-family:PingFangSC-Regular,PingFang SC;
	font-weight:400;
	color:rgba(187,187,187,1);
	line-height:20px;
	position: absolute;
    bottom: 30px;
	padding-left: 23px;
}
.box-detele_n8{
	position: absolute;
	top: 20px;
    right: 20px;
	cursor: pointer;
}
</style>
