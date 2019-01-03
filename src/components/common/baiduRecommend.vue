<template>
	<div class="baidu-recommend">
		<div class="content-news">
			<div class="news-hint">
				<div></div>
				<div class="news-hint-word">以下信息根据您的兴趣推荐</div>
				<div></div>
			</div>
			<div class="news"
				v-for="news in recommendlists"
				:key="news.id">
				<div class="news-img">
					<img :src="news.image">
				</div>
				<div class="news-display">
					<div class="news-title">{{news.title}}</div>
					<div class="news-time">{{news.time}}</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: "baiduRecommend",
	data() {
		return {
			recommendlists: [
				{
					id: 1,
					image: "https://ss0.baidu.com/6ONWsjip0QIZ8tyhnq/it/u=3279135327,3530332178&fm=173&app=49&f=JPEG?w=218&h=146&s=1215396C3D73209C7C068C9E0300C09B",
					title:"“圣诞节奇迹”未现 美政府如期“关门”",
					time: " 12-23 10:07"
				},
				{
					id: 2,
					image: "https://ss1.baidu.com/6ONXsjip0QIZ8tyhnq/it/u=3581792254,1787772481&fm=173&app=25&f=JPEG?w=218&h=146&s=DBACB7475B8662D2062E5B6D0300E068",
					title: "分析师观点｜中国股市需要华为精神",
					time: "10-22 05:15"
				}
			],
		}
	},
}
</script>
<style lang="less" scoped>
.content-news {
	width: 60%;
	padding: 20px;
	float: left;
	.news-hint {
		div {
			color: rgba(0, 0, 0, 0.6);
			display: inline-block;
			width: 32%;
			border-bottom: 1px solid rgba(209, 203, 203, 0.7);
			margin-bottom: 5px;
		}
		.news-hint-word {
			border: none;
		}
	}
	.news {
		position: relative;
		padding: 15px 0;
		height: 120px;
		border-bottom: 1px solid rgba(209, 203, 203, 0.7);
		.news-img {
			height: 100%;
			img {
				height: 100%;
			}
		}
		.news-display {
			position: absolute;
			left: 200px;
			top: 40px;
			right: 0;
			.news-title {
				font-size: 18px;
				font-family: arial, "Microsoft Yahei";
				font-weight: 700;
				cursor: pointer;
				&:hover {
					color: #0079f4;
					text-decoration: underline;
				}
			}
			.news-time {
				font-size: 15px;
				margin: 10px 0 0 15px;
			}
		}
	}
}
</style>