<template>
	<div class="newTanc">
		<div class="newTanc_1">	
			<slot name="tanBox"></slot>		
			<img @click="clickFn('close')" src="/imge/cj_00.png" class="newTanc_2">
		</div>		
	</div>
</template>
<script>
export default {
	name: 'tacBox',
	methods: {
		clickFn(){
			this.$parent.close();
		}
	}	
}
</script>

<style>
.newTanc{
	position: fixed;
	top:0;
	left: 0;
	background: rgba(0,0,0,.3);
	width: 100%;
	height: 100%
}	
.newTanc_1{
	position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    background: white;
    -webkit-box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
}

.newTanc_2{
	position: absolute;
	right: -36px;
	top: -36px;
	cursor: pointer;
	width: 36px;
	height: 36px;
}
.newTanc_2:hover{
	opacity: .7;
}
</style>
