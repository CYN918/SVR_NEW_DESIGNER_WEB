<template>
    <div class="nav_rig">
        <ul>
            <li class="nav_logo"><img :src="imgSig+'newHome/ip.svg'" alt=""/></li>
            <li class="nav_upload" v-if="uploadShow" @click="upload()" @mouseenter="mouseover('c')" @mouseleave="mouseLeave('c')"><img class="nav_upload_img" :src="imgSig+'newHome/upload.svg'" alt=""/><p>上传作品</p></li>
            <li class="nav_upload" v-else @click="upload()" @mouseenter="mouseover('c')" @mouseleave="mouseLeave('c')"><img class="nav_upload_img" :src="imgSig+'newHome/bar_icon_upload.svg'" alt=""/><p>上传作品</p></li>
            <li class="nav_tolt" v-if="totalShow" @mouseenter="mouseover('d')" @mouseleave="mouseLeave('d')"><img :src="imgSig+'newHome/icon-earning-black.svg'" alt=""/><p>去赚钱</p></li>
            <li class="nav_tolt" v-else @mouseenter="mouseover('d')" @mouseleave="mouseLeave('d')"><img :src="imgSig+'newHome/icon-earning-money.svg'" alt=""/><p>去赚钱</p></li>
            <li class="nav_weixin" @mouseenter="mouseover('a')" @mouseleave="mouseLeave('a')"><img :src="imgSig+'newHome/icon-ewm-small.png'" alt=""/><p>微信公众号</p></li>
            <li class="nav_weibo" @click="go_weibo()">官方微博</li>
            <li class="nav_top" @click="go_top()" v-if="isShow">TOP</li>
        </ul>
        <div class="nav_tolt_hover" @mouseenter="mouseover('d')" @mouseleave="mouseLeave('d')">
            <img :src="imgSig+'newHome/icon-zq-hover.svg'" alt=""/>
            <button class="nav_tolt_hover_btn" @click="go_tolt()">点我赚钱</button>
        </div>
        <div class="nav_weixin_hover" @mouseenter="mouseover('a')" @mouseleave="mouseLeave('a')">
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
            uploadShow:true,
            totalShow:true,
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
                document.getElementsByClassName('nav_tolt_hover')[0].style.display = 'block'
                document.getElementsByClassName('nav_tolt')[0].style.background = '#33B3FF'
                document.getElementsByClassName('nav_tolt')[0].style.color = '#ffffff'
                this.totalShow = false;
            }
            if(type == 'a'){
                document.getElementsByClassName('nav_weixin_hover')[0].style.display = 'block'
            }  
            if(type == 'c'){
                document.getElementsByClassName('nav_upload')[0].style.background = '#33B3FF'
                document.getElementsByClassName('nav_upload')[0].style.color = '#ffffff'
                this.uploadShow = false;
            }  
        },
        mouseLeave(type){
            if(type == 'd'){
                document.getElementsByClassName('nav_tolt_hover')[0].style.display = 'none'
                document.getElementsByClassName('nav_tolt')[0].style.background = '#FFFFFF'
                document.getElementsByClassName('nav_tolt')[0].style.color = '#1E1E1E'
                this.totalShow = true;
            } 
            if(type == 'a'){
                document.getElementsByClassName('nav_weixin_hover')[0].style.display = 'none'
            } 
            if(type == 'c'){
                document.getElementsByClassName('nav_upload')[0].style.background = '#FFFFFF'
                document.getElementsByClassName('nav_upload')[0].style.color = '#1E1E1E'
                this.uploadShow = true;
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
	right: 2.3%;
	top: 40%;
    z-index: 999999;
}
.nav_logo{
    height: 112px;
    position: relative;
    top: 60px;
    z-index: -1;
}
.nav_upload{
    width: 91.53px;
    height: 66px;
    z-index: 999999;
    background: #FFFFFF;
    color: #1E1E1E;
    font-size: 14px;
    border-top: 1px solid #0066B4;
    border-left: 1px solid #0066B4;
    border-right: 1px solid #0066B4;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.nav_tolt{
    width: 91.53px;
    height: 66px;
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
    width: 91.53px;
    height: 94px;
    border-left: 1px solid #0066B4;
    border-right: 1px solid #0066B4;
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
	width: 91.53px;
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