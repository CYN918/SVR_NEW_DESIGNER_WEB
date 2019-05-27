<template>
	<div>
		<topNavCom :Data="topCo"></topNavCom>
		<router-view/>
	</div>
</template>

<script>
import topNavCom from '../topNavcom'
export default {
	components:{topNavCom},
	data(){
		return{
			topCo:{
				title:'上传作品',
				rot:[
					{n:'编辑作品内容',to:'/upload/upload'},
					{n:'其他信息设置',to:'/upload/upload2'}
				]
			}
		}
	}
}
</script>

<style>

</style>
