<template>
	<div class="back-top">
		<div class="container"
			@mouseenter="handleMouseEnter" 
			@mouseleave="handleMouseLeave">
			<div class="iconfont backtop" v-show="showBackIcon">&#xe7cf;</div>
			<div class="character" v-show="!showBackIcon">回到顶部</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "backTop",
	data () {
		return {
			showBackIcon: true
		}
	},
	methods: {
		handleMouseEnter () {
			this.showBackIcon = false;
		},
		handleMouseLeave () {
			this.showBackIcon = true;
		}
	}
}
</script>
<style lang="less" scoped>
	.container {
		position: absolute;
		right: -55px;
		bottom: 30px;
		width: 40px;
		height: 45px;
		cursor: pointer;
		color: #fff;
		background: rgba(10, 10, 10, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		.backtop {
			transform: scale(2);
		}
		.character {
			text-align: center;
		}
	}
</style>


