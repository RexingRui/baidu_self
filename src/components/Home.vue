<template>
	<div class="home">
		<my-header @open-sider="show=$event"></my-header>
		<transition name="fade">
			<my-sider v-show="show" @close-sider="show=$event"></my-sider>
		</transition>
		<my-search></my-search>
		<!-- <my-content>
			<template slot="up-loader">
				<up-loader></up-loader>
			</template>
			<template slot="back-top">
				<back-top></back-top>
			</template>
		</my-content> -->
		<my-content></my-content>
	</div>
</template>
<script>
import myHeader from "./header.vue"
import mySider from "./sider.vue"
import mySearch from "./search.vue"
import myContent from "./content.vue"
import upLoader from "./common/upLoader.vue"
import backTop from "./common/backTop.vue"

export default {
	name: "home",
	components: {
		myHeader,
		mySider,
		mySearch,
		myContent,
		upLoader,
		backTop
	},
	data () {
		return {
			show: false
		}
	}
}
</script>
<style lang="less" scoped>

.fade-enter-active, .fade-leave-active {
	transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
	opacity: 0;
}
.home {
	overflow: hidden;
}
</style>

