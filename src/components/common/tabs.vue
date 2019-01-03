<template>
	<div class="tabs">
		<div class="tabs-head">	
			<div 
				:class="addClass(item)"
				v-for="(item, index) in navList"
				:key="index"
				@click="handleTabsChange(index)"
				>{{item.label}}</div>
		</div>
		<div class="tabs-content">
			<slot></slot>
		</div>
	</div>
</template>
<script>
export default {
	name: "tabs",
	props: {
		value: [String, Number]
	},
	data: function () {
		return {
			navList: [],
			currentValue: this.value
		}
	},
	methods: {
		getTabs () {
			return this.$children.filter(function (item) {
				return item.$options.name === 'panels';
			});
		},
		updateNav () {
			this.navList = [];
			var _this = this;
			this.getTabs().forEach(function (pane, index) {
				_this.navList.push({
					label: pane.label,
					name: pane.name || index,
					closable: pane.closable || false
				});
				if (!pane.name) pane.name = index;

				if (index === 0) {
					if (!_this.currentValue) {
						_this.currentValue = pane.name || index;
					}
				}
			});
			this.updateStatus();
		},
		updateStatus () {
			var tabs = this.getTabs();
			var _this = this;
			tabs.forEach(function (tab) {
				return tab.show = tab.name === _this.currentValue;
			})
		},
		addClass (item) {
			return [
				'tabs-list', "iconfont",
				{
					'tabs-list-active': item.name === this.currentValue
				}
			]
		},
		handleTabsChange: function (index) {
			var nav = this.navList[index];
			var name = nav.name;
			this.currentValue = name;
			this.$emit('input', name);
		},
	},
	watch: {
		value: function (val) {
			this.currentValue = val;
		},
		currentValue: function () {
			this.updateStatus();
		}
	}
}
</script>
<style lang="less" scoped>
.tabs-head {
	border-bottom: 2px solid rgba(200, 200, 200, 0.3);
	line-height: 36px;
	font-size: 0;
	.tabs-list {
		font-size: 14px;
		vertical-align: bottom;
		display: inline-block;
		padding: 0 23px;
		cursor: pointer;
		&:hover {
			background: rgba(200, 200, 200, 0.5);
		}
	}
	.tabs-list-active {
		background: rgba(200, 200, 200, 0.5);
		font-family: arial, "Microsoft Yahei";
		font-weight: 700;
	}
	.iconfont:nth-of-type(1):before {
		 content: "\e625";
		 padding-right: 5px;
	}
}
</style>
