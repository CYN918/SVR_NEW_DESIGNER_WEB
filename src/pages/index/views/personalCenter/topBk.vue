<template>
	<div class="u_top1">
		<div class="upBg">
			<vueCropper
				ref="cropper"
				:info="false"
				:img="option.img"
				:outputSize="option.size"
				:fixed="true"
				:full="false"
				:checkCrossOrigin="false"
				:fixedNumber = [1,.177]
				:outputType="option.outputType"
				:autoCropWidth="option.autoCropWidth"
				:autoCropHeight="option.autoCropHeight"
				:autoCrop="true"
				:fixedBox="true"
				:canMoveBox="false"
				:centerBox="true"				
				:enlarge="2"							
			>
			</vueCropper>
		</div>
		<div class="upBg2">
			<span class="upBg2_1">建议尺寸 1920*260px</span>
			<div class="upBg2_2">
				<img @click="changeScale(1)" :src="imU+'cj_01.png'"/>
				<img @click="changeScale(-1)" :src="imU+'cj_02.png'"/>
				<img @click="rotateLeft" :src="imU+'cj_03.png'"/>
			</div>
		</div>
		<div class="upBg3">
			<span @click="close">取消</span>
			<span @click="startCrop" class="upBg3_1">保存</span>
			<span class="upBg3_2">
					上传图片
				<input type="file" id="uploads" accept="image/png, image/jpeg, image/jpg" @change="uploadImg">	
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: 'topBk',
	props:{
		img:String
	},
	components:{},
	data(){
		return{
			option:{
				img:'',
				outputSize:1,
				outputType:'png',
				autoCrop:true,
				autoCropWidth:1300,
				autoCropHeight:267,
				fixedBox:true,
			},
		}
	},
	mounted: function () {	
		this.init();		
	}, 
	methods:{	
		miss(msg){
			this.$message({message:msg});
		},
		init(){
			this.option.img = this.img;
		},		
		bdtjCom(a){	
			this.bdtj('个人主页','自己视角-'+a,'--');
		},
		close(){
			this.$emit('closeTopBk');
		},
		changeScale(num){	
			let p = '放大';
			if(num==1){
				p = '缩小';
			}
			this.bdtjCom('设置封面图-'+p);
			this.$refs.cropper.changeScale(num); 
		},
		rotateLeft(){	
			this.bdtjCom('设置封面图-旋转');
			this.$refs.cropper.rotateLeft()
		},
		uploadImg(e){
		
			this.bdtjCom('设置封面图-上传图片');
			let file = e.target.files[0];
			if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(e.target.value)||e.target.files.length==0) {
				this.miss('图片格式不正确');
				return
			}
			if(file.size>10*1024*1024){
				this.miss('文件过大');
      			return
      		}
			let reader = new FileReader()
			reader.onload =(e)=> {		
				let data;
				data = e.target.result;
				if (typeof e.target.result === 'object') {
					data = window.URL.createObjectURL(new Blob([e.target.result]))
				} 					
				this.option.img = data;
			}
			reader.readAsArrayBuffer(file);
		},
		startCrop(){
			this.bdtjCom('设置封面图-保存');
			if(this.option.img==this.img){
				this.miss('保存成功');
				this.close();
				return
			}
			
			if(!this.option.img){
				this.miss('请先上传图片');
				return
			}
			if(this.opType==1){
				this.miss('正在上传请稍后');
				return
			}
		
			
			this.$refs.cropper.getCropData(data => {
				let app_secret = '6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY';
				
				let times = (Date.parse(new Date())/1000);
				let arr = [
					1001,
					'6iu9AtSJgGSRidOuF9lUQr7cKkW9NGrY',
					window.userInfo.open_id,
					times
				];

				let formData = new FormData();
				formData.append('app_id',1001);
				formData.append('sign',this.MD5(encodeURIComponent(arr.sort())))
				formData.append('user',window.userInfo.open_id)
				formData.append('file',this.mJs.dataURLtoFile(data))
				formData.append('relation_type','user_info')
				formData.append('related_id',window.userInfo.open_id)
				formData.append('classify_1','avatar')
				formData.append('timestamp',times)
				this.opType=1;
				this.$ajax.post(window.basrul+'/File/File/insert', formData)
				.then((da)=>{	
					
					let ds = da.data;
					if(ds.result==0){						
						let pr = {
							user_center_banner_pic:ds.data.url,
							access_token:window.userInfo.access_token
						};
						this.api.changeUserCenterBanner(pr).then((da2)=>{
						
							this.opType=0;
							if(da2=='error'){return}
							this.miss('保存成功');						
							this.$emit('setSuss',pr.user_center_banner_pic);

						}).catch(()=>{
							this.opType=0;
						});
					
					}else{
						this.opType=0;
					}
				})
				.catch(()=>{
					this.opType=0;
					
				});
			})
		},
	},
	
}
</script>

<style>
</style>