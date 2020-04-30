<template>
    <div class="nav_rig">
        <ul>
            <li class="nav_logo" @mouseenter="mouseover('e')" @mouseleave="mouseLeave('e')"><img :src="imgSig+'newHome/ip_pr.svg'" alt=""/></li>
            <li class="nav_upload" v-if="uploadShow" @click="upload()" @mouseenter="mouseover('c')" @mouseleave="mouseLeave('c')"><img class="nav_upload_img" :src="imgSig+'prcent/icon_qq.svg'" alt=""/><p>顾问</p></li>
            <li class="nav_upload" v-else @click="upload()" @mouseenter="mouseover('c')" @mouseleave="mouseLeave('c')"><img class="nav_upload_img" :src="imgSig+'prcent/bar_icon_qq.svg'" alt=""/><p>顾问</p></li>
            <li class="nav_tolt" v-if="totalShow"  @click="go_tolt()" @mouseenter="mouseover('d')" @mouseleave="mouseLeave('d')"><img :src="imgSig+'prcent/px_share.svg'" alt=""/><p>分享</p></li>
            <li class="nav_tolt" v-else @click="go_tolt()" @mouseenter="mouseover('d')" @mouseleave="mouseLeave('d')"><img :src="imgSig+'prcent/bar_px_share.svg'" alt=""/><p>分享</p></li>
            <li class="nav_weixin" v-if="xmxq" @click="go_weibo()" @mouseenter="mouseover('f')" @mouseleave="mouseLeave('f')"><img :src="imgSig+'prcent/xmxq_icon_zn.svg'" alt=""/><p>指南</p></li>
            <li class="nav_weixin" v-else @click="go_weibo()" @mouseenter="mouseover('f')" @mouseleave="mouseLeave('f')"><img :src="imgSig+'prcent/bar_xmxq_icon_zn.svg'" alt=""/><p>指南</p></li>
            <li class="nav_top" @click="go_top()" v-if="isShow">TOP</li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'nav_right',
    data(){
        return {
            isShow:false,
            uploadShow:true,
            totalShow:true,
            xmxq:true,
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
            this.mJs.scTop(0);
        },
        scrollToTop(){
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
            this.scrollTop = scrollTop;
            if(this.scrollTop > 980){
                this.isShow = true;
            }else{
                this.isShow = false;
            }
        },
        mouseover(type){
            if(type == 'd'){
                document.getElementsByClassName('nav_tolt')[0].style.background = '#33B3FF'
                document.getElementsByClassName('nav_tolt')[0].style.color = '#ffffff'
                this.totalShow = false;
            }
            if(type == 'f'){
                document.getElementsByClassName('nav_weixin')[0].style.background = '#33B3FF'
                document.getElementsByClassName('nav_weixin')[0].style.color = '#ffffff'
                this.xmxq = false;
            }
            if(type == 'c'){
                document.getElementsByClassName('nav_upload')[0].style.background = '#33B3FF'
                document.getElementsByClassName('nav_upload')[0].style.color = '#ffffff'
                this.uploadShow = false;
            }
            if(type == 'e'){
                document.getElementsByClassName('nav_logo')[0].style.top = '60px'
            }  
        },
        mouseLeave(type){
             if(type == 'd'){
                document.getElementsByClassName('nav_tolt')[0].style.background = '#FFFFFF'
                document.getElementsByClassName('nav_tolt')[0].style.color = '#1E1E1E'
                this.totalShow = true;
            } 
            if(type == 'f'){
                document.getElementsByClassName('nav_weixin')[0].style.background = '#FFFFFF'
                document.getElementsByClassName('nav_weixin')[0].style.color = '#1E1E1E'
                this.xmxq = true;
            }
            if(type == 'c'){
                document.getElementsByClassName('nav_upload')[0].style.background = '#FFFFFF'
                document.getElementsByClassName('nav_upload')[0].style.color = '#1E1E1E'
                this.uploadShow = true;
            }
            if(type == 'e'){
                document.getElementsByClassName('nav_logo')[0].style.top = '70px'
            }  
        },
        go_tolt(){
            this.$parent.sharc();
        },
        upload(){
            window.open("http://wpa.qq.com/msgrd?v=3&uin=363741945&site=qq&menu=yes");
        },
        go_weibo(){
            this.$router.push({path:'/help?on=4-02'});
        },
    }  
}
</script>
<style scoped>
.nav_rig{
	width: 66px;
	position: fixed;
	right: 2.3%;
	top: 40%;
    z-index: 999999;
}
.nav_logo{
    height: 112px;
    position: relative;
    top: 70px;
    z-index: 0;
}
.nav_upload{
    width: 64px;
    height: 69px;
    background: #FFFFFF;
    color: #1E1E1E;
    font-size: 14px;
    border-top: 1px solid #0066B4;
    border-left: 1px solid #0066B4;
    border-right: 1px solid #0066B4;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    z-index: 99999;
    position: relative;
}
.nav_upload > p{
    width: 48px;
    font-size: 12px;
    border-bottom: 1px #D9D9D9 solid;
    margin: 2px auto 0px auto;
    padding-bottom: 12px;
    color: #1E1E1E;
}
.nav_tolt > p{
    width: 48px;
    font-size: 12px;
    border-bottom: 1px #D9D9D9 solid;
    margin: 2px auto 0px auto;
    padding-bottom: 10px;
    color: #1E1E1E;
}
.nav_weixin > p{
    width: 60px;
    font-size: 12px;
    margin: 2px auto 0px auto;
    padding-bottom: 6px;
    color: #1E1E1E;
}
.nav_tolt{
    width: 64px;
    height: 68px;
    z-index: 999999;
    background: #FFFFFF;
    color: #1E1E1E;
    font-size: 14px;
    border-left: 1px solid #0066B4;
    border-right: 1px solid #0066B4;
}
.nav_upload > img,.nav_tolt > img{
    margin-top: 15px;
}
.nav_weixin{
    width: 64px;
    height: 66px;
    border-left: 1px solid #0066B4;
    border-right: 1px solid #0066B4;
    border-bottom: 1px solid #0066B4;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #FFFFFF;
    color: #1E1E1E;
    font-size: 14px;
}
.nav_weixin > img{
    margin-top: 10px;
}
.nav_rig > ul > li{
	text-align: center;
    cursor: pointer;
}
.nav_rig > ul .nav_weibo:hover,.nav_rig > ul .nav_top:hover,.nav_weixin:hover{
    background: #33B3FF;
    color: #ffffff;
}
.nav_rig > ul .nav_weibo{
	width: 64px;
	height: 34px;
	line-height: 36px;
	color: #1E1E1E;
	font-size: 14px;
	border-left: 1px solid #0066B4;
    border-right: 1px solid #0066B4;
    border-bottom: 1px solid #0066b4;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    background: #FFFFFF;
}
.nav_rig > ul .nav_top{
    width: 64px;
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
    position: absolute;
    right: 105%;
    top: 35%;
    display: none;
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
    cursor: pointer;
}
.nav_weixin_hover{
    width: 220px;
    height: 240px;
    position: absolute;
    right: 105%;
    top: 25%;
    border: 1px solid #33B3FF;
    border-radius: 5px;
    background: #FFFFFF;
    padding: 5px;
    display: none;
    cursor: pointer;
}
.nav_weixin_hover > img{
    margin-top: 15px;
}
.nav_weixin_hover > p{
    font-size: 14px;
    color: #1E1E1E;
    text-align: center;
}
</style>