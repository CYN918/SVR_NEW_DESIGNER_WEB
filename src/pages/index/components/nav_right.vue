<template>
    <div class="nav_rig">
        <ul>
            <li class="nav_logo"><img :src="imgSig+'newHome/ip.svg'" alt=""/></li>
            <li class="nav_upload" @click="upload()"><img :src="imgSig+'newHome/upload.svg'" alt=""/><p>上传作品</p></li>
            <li class="nav_tolt" @mouseenter="mouseover('d')"><img :src="imgSig+'newHome/icon-earning.svg'" alt=""/><p>去赚钱</p></li>
            <li class="nav_weixin" @mouseenter="mouseover('a')" @mouseleave="mouseLeave('a')"><img :src="imgSig+'newHome/icon-ewm-small.png'" alt=""/><p>微信公众号</p></li>
            <li class="nav_weibo" @click="go_weibo()">官方微博</li>
            <li class="nav_top" @click="go_top()" v-if="isShow">TOP</li>
        </ul>
        <div class="nav_tolt_hover" v-if="toltShow" @mouseleave="mouseLeave('d')">
            <img :src="imgSig+'newHome/icon-zq-hover.svg'" alt=""/>
            <button class="nav_tolt_hover_btn" @click="go_tolt()">点我赚钱</button>
        </div>
        <div class="nav_weixin_hover" v-if="weinxinShow">
            <img :src="imgSig+'newHome/icon-ewm-big.png'" alt=""/>
            <p>微信公众号</p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'nav_right',
    data(){
        return {
            isShow:false,
            toltShow:false,
            weinxinShow:false,
        }
    },
    mounted: function(){
		window.addEventListener('scroll',this.scrollToTop);
    }, 
    destroyed(){
        window.removeEventListener('scroll',this.scrollToTop);
    },
    methods: {
        go_top(){
            let timer = setInterval(() => {
                let ispeed = Math.floor(-this.scrollTop / 5);
                document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed;
                if(this.scrollTop === 0){
                    clearInterval(timer);
                }
            },16);
        },
        scrollToTop(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = scrollTop;
            if(this.scrollTop > 60){
                this.isShow = true;
            }else{
                this.isShow = false;
            }
        },
        mouseover(type){
            if(type == 'd'){
                this.toltShow = true;
            }
            if(type == 'a'){
                this.weinxinShow = true;
            }    
        },
        mouseLeave(type){
            if(type == 'd'){
                this.toltShow = false;
            } 
            if(type == 'a'){
                this.weinxinShow = false;
            }  
        },
        go_tolt(){
            this.$router.push({path:'/tolt'});
        },
        upload(){
            this.$router.push({path:'/upload'});
        },
        go_weibo(){
            window.open('https://weibo.com/shiquanerzk?is_all=1','_blank')
        }
    }  
}
</script>
<style scoped>
.nav_rig{
	width: 93.53px;
	position: fixed;
	right: 196px;
	top: 40%;
    z-index: 999999;
}
.nav_logo{
    height: 112px;
    position: relative;
    top: 20px;
    z-index: -1;
}
.nav_upload,.nav_tolt{
    width: 91.53px;
    height: 66px;
    border: 1px solid #0066B4;
	border-radius: 5px;
    margin-top: 4px;
    z-index: 999999;
    background: #FFFFFF;
    color: #1E1E1E;
    font-size: 14px;
}
.nav_upload > img,.nav_tolt > img{
    margin-top: 15px;
}
.nav_weixin{
    width: 91.53px;
    height: 92px;
    border: 1px solid #0066B4;
	border-radius: 5px;
    margin-top: 4px;
    background: #FFFFFF;
    color: #1E1E1E;
    font-size: 14px;
}
.nav_weixin > img{
    margin-top: 10px;
    border: 1px #0066B4 dashed;
}
.nav_rig > ul > li{
	width: 93.53px;
	text-align: center;
    cursor: pointer;
}
.nav_upload:hover,.nav_tolt:hover,.nav_weixin:hover,.nav_rig > ul .nav_weibo:hover,.nav_rig > ul .nav_top:hover{
    background: #33B3FF;
    color: #ffffff;
}
.nav_rig > ul .nav_weibo,.nav_rig > ul .nav_top{
	width: 91.53px;
	height: 34px;
	line-height: 36px;
	color: #1E1E1E;
	font-size: 14px;
	border: 1px solid #0066B4;
	border-radius: 5px;
	margin-top: 4px;
    background: #FFFFFF;
}
.nav_tolt_hover{
    width: 280px;
    height: 160px;
    position: fixed;
    right: 294px;
    top: 562px;
}
.nav_tolt_hover .nav_tolt_hover_btn{
    width: 120px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #33B3FF;
    color: #ffffff;
    font-size: 14px;
    outline: none;
    margin-left: 24px;
    float: left;
    border: none;
    cursor: pointer;
    position: relative;
    bottom: 69px;
    border-radius: 5px;
}
.nav_weixin_hover{
    width: 220px;
    height: 240px;
    position: fixed;
    right: 294px;
    top: 634px;
    border: 1px solid #33B3FF;
    border-radius: 5px;
    background: #FFFFFF;
}
.nav_weixin_hover > img{
    border: 1px #0066B4 dashed;
    margin-top: 15px;
}
.nav_weixin_hover > p{
    font-size: 14px;
    color: #1E1E1E;
    text-align: center;
}
</style>