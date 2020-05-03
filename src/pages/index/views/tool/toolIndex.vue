<template>
	<div>
		<div class="ntob">
			<div class="toolBox">
				<toolHead v-model="da"></toolHead>
				<toolCent class="toolCents"></toolCent>
				<toolFooter></toolFooter>
			</div>
			
			<audio 
			class="ntob_cent_l_1"
			@timeupdate="audioOn"
			@ended="audioEnd()"
			ref="setAdios"></audio>
			<video 
			class="ntob_cent_l_1"
			@timeupdate="videoOn" 
			muted 
			@loadeddata="csy" 
			></video>
		</div>
	</div>
</template>

<script>
import toolHead from './toolHead';
import toolCent from './toolCent';
import toolFooter from './toolFooter';
export default {
	components:{toolHead,toolCent,toolFooter},
	data(){
		return{
			da:{
				title:'',
			},
		}
	},
	methods:{
		save(){
			
		},
		over(){
			
		},		
		audioOn(){
			
		},
		audioEnd(){
			
		},
		videoOn(){
			
		},
		csy(){
			
		},
	}
}
</script>

<style>
#app>div>div.ntob {
	padding: 0;
	min-height: 100%;
	overflow-y: hidden;
	min-width: 1300px;
}
.ntob_cent_l_1 {
	display: none;
	position: absolute;
	bottom: 0;
	left: 0;	
}
.toolBox{
	display: flex;
	flex-direction: column;
	height: 100%;
}
.toolCents{
	flex: 1;
}
</style>
