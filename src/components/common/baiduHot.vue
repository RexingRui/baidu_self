<template>
	<div class="baidu-hot">
		<div class="content-sidebar">
			<div class="sidebar-head">
				<span>实时热点</span>
				<span class="change-hot">换一换</span>
			</div>
			<ul class="hot-news">
				<li v-for="hot in hotNews" :key="hot.id">
						<a href="#">{{hot.title}}</a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: "baiduHot",
	data() {
		return {
			hotNews: [
				{ id:1, title: "中国学生纽约失联" },
				{ id:2, title: "酒店大门砸伤男童" },
				{ id:3, title: "谢霆锋方否认复合" },
				{ id:4, title: "高铁充足普卧紧俏" },
				{ id:5, title: "王楠接机暴露家底" },
				{ id:6, title: "马克龙访问乍得" },
				{ id:7, title: "萧敬腾暂退出ins" },
				{ id:8, title: "胡歌否认领证结婚" },
				{ id:9, title: "驻华使馆官微罢工" },
				{ id:10, title: "审计署整改养老金" },
				{ id:11, title: "谢霆锋方否认复合" },
				{ id:12, title: "感冒药价格翻倍" },
			],
		}
	},
}
</script>
<style lang="less" scoped>
.content-sidebar {
	float: right;
	width: 34%;
	height: 320px;
	padding: 20px 0 0 5px;
	.sidebar-head {
		font-family: Arial, "Microsoft Yahei";
		margin-bottom: 20px;
		.change-hot {
			margin-left: 120px;
			cursor: pointer;
			&:hover {
				color: #0079f4;
			}
		}
	}
	.hot-news {
		display: flex;
		flex-wrap: wrap;
		li {
			width: 136px;
			line-height: 40px;
			a {
				color: #333;
				&:hover {
					color: #0079f4;
				}
			}
		}
	}
}
</style>


