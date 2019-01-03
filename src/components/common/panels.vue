<template>
	<div class="panels" v-show="show">
		<slot></slot>
	</div>
</template>
<script>
export default {
	name: "panels",
	data () {
		return {
			show: true
		}
	},
	props: {
		name: {
			type: String
		},
		label: {
			type: String,
			default: ""
		},
		closable: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		updateNav () {
			this.$parent.updateNav();
		}
	},
	watch: {
		label () {
			this.updateNav();
		}
	},
	mounted () {
		this.updateNav();
	}
}
</script>
<style lang="less" scoped>

</style>