<template>
    <div class="upRpt">
        <div class="upRpt_bg">
            <div class="upRpt_content">
                <img class="uploadBoxd2_1" @click="closed" src="/imge/cj_00.png"/>
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
                    <span class="qx" @click="closed">取消</span>
                    <span class="tj" @click="AddReport">提交意见</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Message} from 'element-ui'
    export default {
        props:['accused_open_id','link_id','position'],
        name: "report",
        data () {
            return {
                classify:0,
                detail:'',
                list:[],
                classify_name:'其他',
            }
        },
        mounted(){
            this.getReport();
        },
        methods:{
            getReport(){
                let p = window.userInfo.access_token;
                this.api.Report_getClassify({access_token:p}).then((res)=>{
                    this.list = res;
                   
                })
            },
            AddReport(){
                if(!this.detail){
                    Message('举报原因不能为空');
                    return
                }
                let p = window.userInfo.access_token;
                this.api.Report_addReport({access_token:p,classify_id:this.list[this.classify].id,classify_name:this.list[this.classify].classify_name,detail:this.detail,link_id:this.link_id,accused_open_id:this.accused_open_id,position:this.position}).then((res)=>{
                    Message('提交成功');

                })
            },
            closed(){
                this.$parent.closed();
            },
        },
        // watch: {
        //     classify_id: {
        //         handler(newName, oldName) {
        //             alert(newName, oldName)
        //         },
        //         deep: true,
        //         immediate: true
        //
        //     }
        // }
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