<template>
    <div class="tixtD">
		<div contenteditable="true"
		     v-html="innerText"
		     @input="changeText"></div>
	</div>
</template>
<script>
    export default {
        props: ['value'],
        data(){
            return {innerText:this.value}
        },
        methods:{
            changeText(){
                this.innerText = this.$el.innerHTML;
                this.$emit('input',this.innerText);
            }
        }
    }
</script>
<style>
.tixtD{
	display: inline-block;
	vertical-align: top;
	
}
.tixtD>div{
	outline: none;
}
</style>