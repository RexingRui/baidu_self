<template>
	<div class="up-loader">
		<div class="container">
			<div class="iconfont loader" @click="handleLoaderClick">&#xe797;</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "upLoader",
	methods: {
		handleLoaderClick () {
			console.log("up-loader");
		}
	}
}
</script>
<style lang="less" scoped>
	.container {
		position: absolute;
		width: 58px;
		height: 58px;
		border-radius: 50%;
		background: rgba(10, 10, 10, 0.5);
		bottom: -25px;
		left: 0;
		right: 0;
		margin: 0 auto;
		cursor: pointer;
		.loader {
			position: absolute;
			color: #fff;
			transform: scale(2);
			left: 36%;
			top: 13%;
			animation: uploader 1.5s ease 1s infinite;
			@keyframes uploader {
				0% { top: 13%; }
				50% { top: 32%; } 
				100% { top: 13%; }
			}

		}
	}
</style>
