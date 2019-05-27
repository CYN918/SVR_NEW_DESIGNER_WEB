<template>
	<div>
		<ListTemp :config="configData">
			<template v-slot:todo="{ todo }">
				<div v-if="todo && todo.user_info" class="homeList">
					<div class="homeList_1" :style="setImg(todo.face_pic)"></div>
					<div class="homeList_2 nox"><span>{{backName(todo.work_name)}}</span><span class="tjImg"><img v-if="todo.is_recommend==1" src="/imge/svg/zs_icon_tj.svg"/></span></div>
					<div class="homeList_3 nox">{{todo.classify_1_name+'-'+todo.classify_2_name}} <span class="rigto">{{backtime(todo.create_time)}}</span></div>
					<div class="homeList_4 nox">
						<img class="avater" :src="todo.user_info.avatar" alt="">{{backName(todo.user_info.username)}}
						<span class="rigto svg_01 svg_01R"><img src="/imge/svg/see/zs_icon_xx.svg" alt="">{{todo.comment_num}}</span>
						<span class="rigto svg_01"><img src="/imge/svg/see/zs_icon_dz.svg" alt="">{{todo.like_num}}</span>	
					</div>
				</div>
			</template>				
		</ListTemp>
	</div>
</template>

<script>
import ListTemp from '../../components/list';
export default {
	components:{ListTemp},
	name: 'home',
	data(){
		return {
			configData:{ajaxUrl:'getHList'},
		}
	},
	
	mounted: function () {	
	
	}, 
	methods: {
		setImg(ur){
			return 'background-image: url('+ur+');';
		},
		backtime(time){
			return	window.getTimes(time);
		},
		backName(n){
			if(!n){
				return
			}
			return n.slice(0,10);
		}
	}
}
</script>

<style>
.homeList{
	width: 14.3rem;
	margin: 0 auto 1.7rem;
	
}
.homeList_1{
    width: 100%;
    height: 9.4rem;
    border-radius: .4rem;
    background-size: cover;
    background-repeat: no-repeat;
	margin-bottom: .6rem;
}
.nox{
	padding: 0 .5rem;
}
.homeList_2{
    font-size: .74rem;
    margin-bottom: .4rem;
    height: .7rem;
    line-height: .7rem;
}
.homeList_3{
	font-size: .45rem;
	color: #878787;
    margin-bottom: .5rem;
}
.homeList_4{
	font-size: .5rem;
	color: #878787;
	margin-bottom: .5rem;
}
.homeList_4 .avater{
	width: .9rem;
	height: .9rem;
    border-radius: 50%;
	vertical-align: middle;
	margin-right: .4rem;
}
.rigto{    
	float: right;
    font-size: .46rem;

}
.svg_01{
	
	margin-top: .07rem;
	margin-right: .2rem;
}
.svg_01>img{
	display: inline-block;
	vertical-align: middle;
	width: .55rem;
	margin-right: .2rem;
	
}
.svg_01R{
	margin-left: 1.2rem;
    
}
.tjImg{float: right;margin-top: .05rem;}
.tjImg>img{
	display: block;
	width: .58rem;
}
</style>
