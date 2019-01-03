<<template>
	<div class="header">
		<div class="header-left">
			<ul>
				<li class="area main-li"><a><span>地区</span></a></li>
				<li class="skin main-li"><a><span>换肤</span></a></li>
				<li class="msg main-li"><a><span>消息</span></a></li>
			</ul>
		</div>
		<div class="header-right">
			<ul>
				<li class="news main-li"><a><span>新闻</span></a></li>
				<li class="set main-li">
						设置
						<div class="set-content">
							<div class="trangle"><span></span></div>
							<ul class="additional-li">
								<li><a>搜索设置</a></li>
								<li><a>高级设置</a></li>
								<li><a>搜索设置</a></li>
							</ul>
						</div>
				</li>
				<li 
					class="msg main-li"
					@mouseenter="handleMouseEnter">
					<a><span >更多产品</span></a>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	name: "myHeader",
	// props: {
	// 	show: {
	// 		type: Boolean,
	// 		default: false
	// 	}
	// },
	data () {
		return {
			myshow: false
		}
	},
	methods: {
		handleMouseEnter () {
			this.myshow = true;	
			this.$emit("open-sider", this.myshow)	
		}
	}
	
	
}
</script>
<style lang="less" scoped>
.header {
  z-index: 10;
	position: absolute;
	background: rgba(15,25,50,.3);
	width: 100%;
	min-width: 700px;
	line-height: 32px;
	.main-li {
		color: white;
		display: inline-block;
		text-decoration: underline;
		list-style-type: none;
		cursor: pointer;
	}
	.header-right {
		position: absolute;
		right: 0;
		top: 0;
		li {
			margin-right: 15px;
			.set-content {
				display: none;
				left: 15%;
				position: absolute;
				background: #ffffff;
				width: 50%;
				text-align: center;
				padding: 1%;
				.trangle {
					width: 0;
					height: 0;
					border-width: 10px;
					border-style: solid;
					border-color: transparent transparent #fff;
					position: absolute;
					top: -20%;
					left: 30%;
				}
				li {
					color: #000;
					font-size: 12px;
					list-style-type: none;
					margin: 0;
					&:hover {
						background: #398bfb;
					}
				}
			}
		}
		.set {
			&:hover {
				.set-content {
					display: block;
				}
			}
		}
		.msg {
			background: #398bfb;
			text-decoration: none;
			margin:0;
			padding: 0 15px;
		}
	}
	.header-left {
		li {
			margin-left: 10px;
		}
	}
	
}
</style>
