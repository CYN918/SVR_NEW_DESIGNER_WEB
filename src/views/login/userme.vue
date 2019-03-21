<template>
	<div class="yhtop">
		<div class="yhtop1">用户资料完善</div>
		<div class="yhtop2">基本信息设置</div>
		<div class="yhtop3">
			<div class="nav_tx">
				<span>头像</span>
				<img src="/imge/nav_tx.png" alt="">
			</div>
			<el-form ref="myform" :model="form" :rules="rules">
			<div>
			<el-form-item label="用户名">
				<el-input class="yhtop4" v-model="form.username" placeholder="请输入内容"></el-input>
			</el-form-item>
			</div>
			<div>
				<el-form-item label="性别">
				<el-radio v-model="form.sex" label="1">男</el-radio>
				<el-radio v-model="form.sex" label="2">女</el-radio>
				</el-form-item>
			</div>
			
			<div>
				<el-form-item label="职业">
				<el-select v-model="form.vocation" placeholder="请选择">
					<el-option
					v-for="item in zy"
					:key="item.value"
					:label="item.label"
					:value="item.value">
					</el-option>
				</el-select>
				</el-form-item>
			</div>
			<div>
				<el-form-item label="所在地">
				<el-cascader v-model="form.citye"
				:options="options"
				change-on-select
				>
				</el-cascader>
				</el-form-item>
			</div>
			
			<div class="yhtop5" @click="addSelfInfo">进入首页</div>
			</el-form>
		</div>
	</div>
	
</template>

<script>
export default {
	name: 'login',	 
	data(){		
		return{	
			rules:{},
			form:{},
			zy:[
				{label:"平面设计师",value:"平面设计师"},
				{label:"插画师",value:"插画师"},
				{label:"三维设计师",value:"三维设计师"},
				{label:"网页设计师",value:"网页设计师"},
				{label:"UI设计师",value:"UI设计师"},
				{label:"动画师",value:"动画师"},
				{label:"产品设计师",value:"产品设计师"},
				{label:"室内设计师",value:"室内设计师"},
				{label:"摄影师",value:"摄影师"},
				{label:"学生",value:"学生"},
				{label:"设计爱好者",value:"设计爱好者"},
				{label:"UX设计师",value:"UX设计师"},
				{label:"新媒体设计师",value:"新媒体设计师"},
				{label:"概念设计师",value:"概念设计师"},
				{label:"特效合成师",value:"特效合成师"},
				{label:"建筑师",value:"建筑师"},
				{label:"服装设计师",value:"服装设计师"},
				{label:"手工艺人",value:"手工艺人"},
				{label:"艺术工作者",value:"艺术工作者"},
				{label:"教育工作者",value:"教育工作者"},
			],
			radio:1,
			options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '广州',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }]
		}
	},
	mounted: function () {	
	}, 
	methods: {
		addSelfInfo(){
			console.log(this.form);
			let pr = {
				access_token:localStorage.getItem('userT'),
				avatar:'/imge/nav_tx.png',
				username:this.form.username,
				sex:this.form.sex,
				vocation:this.form.vocation,
				country:this.form.citye[0],
				province:this.form.citye[1],
				city:this.form.citye[2],
			}
			this.api.addSelfInfo(pr);
		}
	}
	
	
	// 
}
</script>

<style>
.yhtop{
	min-width: 1300px;
}
.yhtop1{
	width: 100%;
	height: 60px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	line-height: 60px;
	background: #323232;
}
.yhtop2{
	height: 80px;
	background: #EFEFEF;
	line-height: 80px;
	font-size: 28px;
	color: #333333;
	text-align: left;
	text-indent: 310px;
}
.yhtop3{
	margin: 40px auto 40px;
	padding: 65px 110px;
	box-sizing: border-box;
	width: 860px;
	background: #FFFFFF;
	box-shadow: 0 2px 8px 0 rgba(0,0,0,0.10);
	border-radius: 5px;
}
.yhtop3 input{
	border: none !important;
	border-radius: 0 !important;
	border-bottom: 1px solid #ddd !important;
	width: 128px;
}
.yhtop3 .el-input{
	display: inline-block; 
	width: auto;
}
.yhtop3 .el-form-item__content{
	text-align: left;
}
.nav_tx{
	text-align: left;
}
.nav_tx>img{
	display: inline-block;
	width: 100px;
	height: 100px;
	vertical-align: middle;
	
}
.nav_tx>span{
	display: inline-block;
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
}
.yhtop3 .el-form-item__content,.nav_tx{
	margin-bottom: 41px;
}
.yhtop4 .el-input__inner{
	width: 349px !important;
}

.yhtop3 .el-form-item__label{
	width: 68px;
	text-align: justify;
    text-align-last: justify;
	margin-right: 62px;
	font-size: 16px;
	color: #333333;
	padding: 0;
}
.yhtop5{
	width: 200px;
	height: 40px;
	font-size: 16px;
	color: #FFFFFF;
	text-align: center;
	background: #999999;
	line-height: 40px;
	border-radius: 5px;
	margin: 0 auto;
}
.yhtop5:hover{
	cursor: pointer;
	opacity: .7;
}
</style>
