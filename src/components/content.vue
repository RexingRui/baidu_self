<template>
	<div class="content">
		<tabs v-model="activeKey">
			<panels label="我的关注" name="1" :closable="true">
				<baidu-follow></baidu-follow>
			</panels>
			<panels label="推荐" name="2" :closable="false">
				<template class="baidu-rec">
					<baidu-recommend></baidu-recommend>
					<baidu-hot></baidu-hot>
				</template>
			</panels>
			<panels label="导航" name="3" :closable="false">
				<baidu-nav></baidu-nav>
			</panels>
		</tabs>
	</div>
</template>
<script>
import tabs from "./common/tabs.vue";
import panels from "./common/panels.vue"
import baiduRecommend from "./common/baiduRecommend.vue"
import baiduHot from "./common/baiduHot.vue"
import baiduNav from "./common/baiduNav.vue"
import baiduFollow from "./common/baiduFollow.vue"

export default {
	name: "myContent",
	components: {
		tabs,
		panels,
		baiduRecommend,
		baiduHot,
		baiduNav,
		baiduFollow
	},
	data() {
		return {
			activeKey: "2"
		}
	}
}
</script>
<style lang="less" scoped>
	.content {
		position: relative;
		width: 886px;
		height: 400px;
		background: rgba(255, 255, 255, 0.5);
		margin: 0 auto;
		margin-top: 340px;
	}
</style>

