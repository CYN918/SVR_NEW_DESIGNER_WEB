<template>
    <div class="upRpt" v-if="showd">
        <div class="upRpt_bg">
            <div class="upRpt_content">
                <img class="uploadBoxd2_1" @click="hidReport('关闭')" src="https://static.zookingsoft.com/SVR_NEW_DESIGNER_WEB/img/cj_00.png"/>
                <div class="upRpt_title">
                    <span>举报</span>
                </div>
                <div>
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
                <div class="upRpt_btn">
                    <span class="qx" @click="hidReport('取消')">取消</span>
                    <span class="tj" @click="AddReport">提交意见</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    export default {
        name: "report",
        data () {
            return {
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
        mounted(){
            this.getReport();
        },
        methods:{
			initData(){
				this.classify = 0;
				this.detail = '';
			},
			showReport(id,lid,ad){
				
				if(!window.userInfo){
					Message({message: '请先登录'});
						setTimeout(()=>{				
							this.$router.push({path:'/login'})
						},2000);
					return
				}	
				if(!id){return}
				// if(!lid){return}
				if(!ad){return}
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
				this.showd = false;
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
                    Message('举报原因不能为空');
                    return
                }
				if(this.ajaxType==1){
					this.bdtj('举报弹窗','提交举报失败','--');
					Message('正在提交请稍后');
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
                    Message('提交成功');
					this.hidReport();	
                }).catch(()=>{
					this.bdtj('举报弹窗','提交举报失败','--');
					this.ajaxType=0;
				});
            },
        },
    }
</script>

<style scoped>
.upRpt{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
}
.upRpt_bg{
    background: rgba(0,0,0,0.3);
    width: 100%;
    height: 100%;
}
.upRpt_content{
    width:620px;
    height: 577px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #FFFFFF;
    box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
    border-radius: 5px;
}
.uploadBoxd2_1{
    position: absolute;
    top: -45px;
    right: -45px;
    width: 44px;
    height: 44px;
    cursor: pointer;
}
.upRpt_title{
    width:100%;
    height: 74px;
    border-bottom:1px solid #E6E6E6 ;
    text-align: left;
    margin-bottom: 27px;
}
.upRpt_title>span{
    display: inline-block;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #1E1E1E;
    font-weight: bold;
    line-height: 74px;
    margin-left: 29px;
}
.el-radio{
    display: block!important;
    margin-right: 0!important;
    text-align: left;
    margin:0  0 13px 85px;
}

.upRpt_txt{
    width: 450px;
    height: 161px;
    margin-left: 85px;
    margin-top: 31px;
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
</style>