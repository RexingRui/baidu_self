<template>
	<div class=sider @mouseleave="handleMouseLeave">
		<div class="sider-box">更多产品</div>
		<div class="nuomi sider-box">
			<a class="sider-icon" href="http://www.nuomi.com/?cid=002540">
				<img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/bdbri_72.png?v=md5">
				<div class="sider-icon-fag">糯米</div>
			</a>
		</div>
		<div class="tuiguang sider-box">
			<a  class="sider-icon" href="http://e.baidu.com/">
				<img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/tuiguang_72.png?v=md5">
				<div class="sider-icon-fag">推广</div>
			</a>
		</div>
		<div class="wenku sider-box">
			<a class="sider-icon" href="http://wenku.baidu.com">
				<img src="https://ss0.bdstatic.com/5aV1bjqh_Q23odCf/static/superman/img/topnav/wenku_72.png?v=md5">
				<div class="sider-icon-fag">文库</div>
			</a>
		</div>
		<div class="sider-box last-sider-box"><a class="sider-icon" href="http://www.baidu.com/more/">全部产品>></a></div>
	</div>
</template>
<script>
export default {
	name: "mySider",
	data () {
		return {
			myshow: true,
		}
	},
	methods: {
		handleMouseLeave () {
			this.myshow = false;
			this.$emit("close-sider", this.myshow);
		}
	}
}
</script>
<style lang="less" scoped>
	.sider {
		z-index: 100;
		position: absolute;
		width: 75px;
		padding: 0 5px;
		height: 100%;
		background: #eeebeb;
		border-right: 1px solid #eeebeb;
		right: 0;
		.sider-box {
			line-height: 32px;
			text-align: center;
			padding-bottom: 5px;
			border-bottom: 1px solid #dbd9d9;
			.sider-icon {
				display: block;
				margin: 0 auto;
				margin-top: 10px;
				width: 45px;	
				text-decoration: none;	
				color: rgb(119, 116, 116);	
				.sider-icon-fag {
					margin-top: -15px;
				}	
				img {
					width: 100%;
				}
			}
		}
		.last-sider-box {
			border: none;
			.sider-icon {
				width: 100%;
				font-size: 12px;
			}
		}
	}
</style>
