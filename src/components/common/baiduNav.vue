<template>
	<div class="baidu-nav">
		<div class="nav-item" 
			v-for="(item, index) in navList"
			:key="index">
			<a :href="item.web"><img :src="item.img"></a>
		</div>
	</div>
</template>
<script>
export default {
	name: "baiduNav",
	data () {
		return {
			baiduNavList: [
				{ id: 1, web: "http://www.nuomi.com/?cid=xsydh02", img: "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/9358d109b3de9c8283eb86356781800a18d843f9.jpg"},
				{ id: 2, web: "http://www.jd.com/", img: "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/1c950a7b02087bf4c7c62953f9d3572c11dfcf66.jpg"},
				{ id: 3, web: "http://www.yhd.com/", img: "https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/super/pic/item/5fdf8db1cb13495442e597de5d4e9258d0094a94.jpg"},
				{ id: 4, web: "http://www.suning.com/", img: "https://ss2.baidu.com/-vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/a8773912b31bb0514df6cc923d7adab44bede0be.jpg"},
				{ id: 5, web: "http://www.vip.com/", img: "https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/super/pic/item/7af40ad162d9f2d3869f5b55a2ec8a136227ccfa.jpg"},
				{ id: 6, web: "http://www.dangdang.com/", img: "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/super/pic/item/8644ebf81a4c510f214a9da06b59252dd52aa5fa.jpg"},
			],
		}
	},
	computed: {
		navList () {
			return this.baiduNavList
				.concat(this.baiduNavList,this.baiduNavList,this.baiduNavList)
		}
	}
}
</script>
<style lang="less" scoped>
.baidu-nav {
	padding: 20px;
	padding-right: 5px;
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	.nav-item {
		width: 120px;
		height: 60px;
		background: #fff;
		margin-top: 15px;
		margin-right: 15px;
	}
}
</style>


