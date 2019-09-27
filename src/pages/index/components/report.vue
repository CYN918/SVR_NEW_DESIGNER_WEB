<template>
	<TcBox :config="config" ref="tcBox">
		<template v-slot:todo="{ todo }">
			<div class="rep_x1">
                <template>
                    <el-radio v-for="(item,index) in list" :label="index"  v-model="classify">{{item.classify_name}}</el-radio>
               	</template>
            </div>
			<div class="upRpt_txt">
                <el-input
                    type="textarea"
                    resize="none"
                    :rows="7"
                    placeholder="请写下举报原因，以便平台公正的惩戒被举报者"
                   	v-model="detail">
                </el-input>
            </div>
            <div class="btm2o">
				<div @click="hidReport('取消')" class="btns pend">取消</div>
				<div @click="AddReport" class="btns btns_js pend">提交意见</div>				
			</div>
		</template>			
	</TcBox>
</template>

<script>
import TcBox from './TcBox';
export default {
	components:{TcBox},
        name: "report",
        data () {
            return {
            	config:{
            		title:'举报',
            	},
                classify:0,
                detail:'',
                list:[],
                classify_name:'其他',
				showd:false,
				accused_open_id:'',
				link_id:'',
				position:'',
				ajaxType:0,
            }
        },
        mounted(){},
        methods:{
			close(){
				this.$refs.tcBox.close();
			},
			initData(){
				this.classify = 0;
				this.detail = '';
			},
			showReport(id,lid,ad){
				
				if(!window.userInfo){
					this.$message({message:'请先登录'});
						setTimeout(()=>{				
							this.$router.push({path:'/login'})
						},2000);
					return
				}	
				if(!id){return}
				// if(!lid){return}
				if(!ad){return}
				this.getReport();
				this.$refs.tcBox.show();
				this.initData();
				this.accused_open_id = id;
				this.link_id = lid?lid:id;
				this.position = ad;
				this.showd = true;
			},
			hidReport(a){
				if(a){
					this.bdtj('举报弹窗',a,'--');
				}
				this.close();
			},
            getReport(){
				if(!window.userInfo){ return}				
                let p = window.userInfo.access_token;
                this.api.Report_getClassify({access_token:p}).then((res)=>{
                    this.list = res;
                })
            },
            AddReport(){
				this.bdtj('举报弹窗','提交举报','--');
                if(!this.detail){
					this.bdtj('举报弹窗','提交举报失败','--');
                    this.$message({message:'举报原因不能为空'});
                    return
                }
				if(this.ajaxType==1){
					this.bdtj('举报弹窗','提交举报失败','--');
					this.$message({message:'正在提交请稍后'});
					return;
				}
				let pr = {
					access_token:window.userInfo.access_token,
					classify_id:this.list[this.classify].id,
					classify_name:this.list[this.classify].classify_name,
					detail:this.detail,
					link_id:this.link_id,
					accused_open_id:this.accused_open_id,
					position:this.position
				};
				this.ajaxType=1;
                this.api.Report_addReport(pr).then((res)=>{
					this.ajaxType=0;
					if(!res){this.bdtj('举报弹窗','提交举报失败','--');return}
					this.bdtj('举报弹窗','提交举报成功','--');
                    this.$message({message:'提交成功'});
					this.close();	
                }).catch(()=>{
					this.bdtj('举报弹窗','提交举报失败','--');
					this.ajaxType=0;
				});
            },
        },
    }
</script>

<style scoped>

.el-radio{
    display: block!important;
    margin-right: 0!important;
    text-align: left;
    margin:0  0 13px 100px;
}
.btm2o{
	margin-bottom: 20px;
	text-align: center;
}
.upRpt_txt{
    width: 450px;
    height: 161px;
    margin: 30px 100px 40px !important;
}
.upRpt_btn{
    margin-top: 60px;
    text-align: center;
}
.upRpt_btn>span{
    width:140px;
    height: 40px;
    display:inline-block;
    border-radius: 5px;
    cursor: pointer;
    font-family: PingFangSC-Regular;
    line-height: 40px;
    font-size: 16px;
    text-align: center;
}
.qx{
    border: 1px solid #979797;
    color: #333333;
    margin-right: 25px;
}
.tj{
    background: #FF5121;
    color: #FFFFFF;
}
.rep_x1{
	padding-top: 40px;
}
.upRpt_txt{
	margin: 31px 85px;
}
</style>