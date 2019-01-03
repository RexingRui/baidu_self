<template>
	<div class="baidu-follow">
		<div class="nav-follow" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
			<div class="nav-follow-title" @click="handleFollowClick">
				<span class="iconfont" :class="{rotate: rotatable}">&#xe644;</span>我的导航<span class="follow-num">(3)</span>
			</div>
			<div class="nav-follow-content" v-show="rotatable">
				<div class="my-follows" v-for="item in follows" :key="item.id">
					<img :src="item.img"><span>{{item.name}}</span>
				</div>
			</div>
		</div>
		<div class="nav-set" v-if="showNavSet" @mouseenter="handleMouseEnter">
			<div class="nav-add nav-set-item">添加</div>
			<div class="nav-edit nav-set-item" @click="handleSelectClick">
				<div class="nav-rectange">
					<span v-if="catagoryDisplay">✓</span>
				</div>
				编辑
			</div>
			<div class="nav-display nav-set-item">分类显示</div>
		</div>
		<custom-follow></custom-follow>
	</div>
</template>
<script>
import customFollow from "./customFollow.vue"

export default {
	components: {
		customFollow
	},
	data () {
		return {
			showNavSet: false,
			catagoryDisplay: false,
			rotatable: false,
			follows: [
				{ id: 1, name: "安徽工业大学", img:"https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/icon/2556.png?3" },
				{ id: 2, name: "五月天", img:"https://ss2.bdstatic.com/lfoZeXSm1A5BphGlnYG/icon/95486.png" },
				{ id: 3, name: "天下足球", img:"https://ss0.bdstatic.com/l4oZeXSm1A5BphGlnYG/icon/2556.png?3"}
			]
		}
	},
	methods: {
		handleFollowClick () {
			this.rotatable = !this.rotatable;
		},
		handleSelectClick () {
			this.catagoryDisplay = !this.catagoryDisplay;
		},
		handleMouseEnter () {
			this.showNavSet = true;
		},
		handleMouseLeave () {
			this.showNavSet = false;
		}
	}
}
</script>
<style lang="less" scoped>
.baidu-follow {
	padding: 20px;
	.nav-follow {
		line-height: 30px;
		.nav-follow-title {
			user-select: none;
			border-bottom: 1px solid rgba(209, 203, 203, 0.7);
			padding-bottom: 5px;
			cursor: pointer;
			.iconfont	{
				display: inline-block;
				margin-right: 5px;
				transform: rotate(-90deg);
			}
			.rotate {
				transform: rotate(0deg);
			}
		}
		.nav-follow-content {
			border-bottom: 1px solid rgba(209, 203, 203, 0.7);
			.my-follows {
				display: inline-block;
				padding: 8px 20px 8px 10px;
				cursor: pointer;
				&:hover {
					background: rgba(231, 226, 226, 0.4);
				}
				img {
					margin: 0 5px -2px 5px;
				}
			}
		}

	}
	.nav-set {
		position: absolute;
		top: 65px;
		right: 45px;
		.nav-set-item {
			display: inline-block;
			margin-right: 10px;
			cursor: pointer;
		}
		.nav-edit {
			margin-left: 25px;
			.nav-rectange {
				top: 3px;
				right: 115px;
				width: 12px;
				height: 12px;
				position: absolute;
				border: 1px solid #0079f4;
				span {
					position: relative;
					top: -3px;
					color: #0079f4;
				}
			}
		}
	}
}
</style>
