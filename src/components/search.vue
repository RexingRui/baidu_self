<template>
	<div class="search">
		<div class="search-img">
			<img src="https://f10.baidu.com/it/u=1018368689,954238853&fm=72">
		</div>
		<div style="margin-top: 15px;">
  		<el-input placeholder="请输入内容" v-model="input4">
				<el-button slot="append" type="primary" icon="el-icon-search">百度一下</el-button>
  		</el-input>
		</div> 
	</div>
</template>
<script>
export default {
	name: "mySearch",
	data () {
		return {
			input4: ""
		}
	}
}
</script>
<style lang="less" scoped>
	.search {
		position: absolute;
		width: 600px;
		top: 90px;
		left: 50%;
		transform: translateX(-50%);
		.search-img {
			width: 250px;
			margin: 0 auto;
			img {
				width: 100%;
			}
		}
		.el-input {
			width: 100%;
				.el-button {
					background: #409EFF;
					color: #fff;
					border: 1px solid #409EFF;
					border-radius: 0;
					margin-right: -22px;
					&:active {
						background: rgb(41, 128, 216);
					}
				}
  }
	}
</style>

