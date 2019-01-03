 <template>
    <div class="custom-follow" v-closeoutside="handleClose">
        <div :class="{changeColor: show}">
            <span class="nav-custom" @click="show=!show">
                <span class="iconfont">&#xe6df;</span>
                自定义
            </span>
        </div>
        <div class="custom-content" v-if="show"
		    @mousemove="handleMouseMove"
            @mouseup="handleMouseUp">
            <div class="triangle-wrapper">
                <em class="triangle"></em>
            </div>
            <div class="follow-title">
                <h3>已关注</h3>
                <h3 class="follow-title-right">未关注</h3>
            </div>
            <div class="move-box">
                <div class="custom-followed">
                    <ul>
                        <li v-for="item in followed" :key="item.id">
                            <span class="iconfont">&#xe6df;</span>
                            {{item.content}}
                        </li>
                        <li v-if="followedMoving"></li>
                    </ul>
                </div>
                <div class="custom-unfollowed">
                    <ul>
                        <li
                            v-for="item in unfollowed"
                            :key="item.id"
                            @mousedown="handleMouseDown"
                            :class="{ 'li-move': eleMoving }"
                        >
                            <span class="iconfont">&#xe6df;</span>{{item.content}}</li>
                        <li v-if="unfollowedMoving"></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "customFollow",
    data() {
        return {
			moveSelf: {},
            mouseX: 0,
            mouseY: 0,
            show: false,
            changeColor: false,
            followedMoving: false,
            unfollowedMoving: false,
            eleMoving: false,
            followed: [{ id: 1, content: "我的导航" }],
            unfollowed: [
                { id: 1, content: "我的股票" },
                { id: 2, content: "我的小说" }
            ]
        };
    },
    directives: {
        closeoutside: {
            bind: function(el, binding) {
                function handleClickOutside(e) {
                    if (el.contains(e.target)) {
                        return false;
                    }
                    if (binding.value) {
                        binding.value(e);
                    }
                }
                document.addEventListener("click", handleClickOutside);
                el.__clickoutside__ = handleClickOutside;
            },
            unbind: function(el, binding) {
                document.addEventListener("click", el.__clickoutside__);
                delete el.__clickoutside__;
            }
        }
    },
    methods: {
        handleClose() {
            this.show = false;
        },
        handleMouseDown(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
			this.liMoving = true;
			this.moveSelf = e.target;
        },
        handleMouseMove(e) {
            if (this.liMoving) {
                this.moveSelf.style.top = e.clientY - this.mouseY + "px";
                this.moveSelf.style.left = e.clientX - this.mouseX + "px";
            }
        },
        handleMouseUp(e) {
			this.moveSelf.style.top = "0px";
			this.moveSelf.style.left = "0px";
			this.moveSelf.style.top = "auto";
			this.moveSelf.style.left = "auto";
			this.liMoving  = false;
			this.moveSelf = null;
        }
    }
};
</script>
<style lang="less" scoped>
.custom-follow {
    margin-top: 10px;
    .nav-custom {
        user-select: none;
        cursor: pointer;
    }
    .changeColor {
        color: #0079f4;
    }
    .custom-content {
        position: relative;
        width: 648px;
        height: 132px;
        margin-top: 8px;
        background: white;
        border: 1px solid #666;
        .triangle-wrapper {
            position: absolute;
            width: 0;
            border: 6px solid transparent;
            border-bottom: 6px solid #666;
            top: -12px;
            left: 45px;
            .triangle {
                position: absolute;
                width: 0;
                border: 6px solid transparent;
                border-bottom: 6px solid white;
                top: -4px;
                left: -6px;
            }
        }
        .follow-title {
            margin: 15px 0 5px 50px;
            h3 {
                display: inline-block;
                color: #666;
                text-align: center;
                font-size: 13px;
                font-weight: normal;
            }
            .follow-title-right {
                margin-left: 240px;
            }
        }
        .move-box {
            display: flex;
            justify-content: space-around;
            width: 90%;
            height: 60%;
            border: 1px solid gray;
            margin-left: 4%;
            div {
                width: 280px;
                border: 1px solid red;
                ul {
                    display: flex;
                    width: 100%;
                    li {
                        width: 76px;
                        text-align: center;
                        margin-right: 3px;
                        position: relative;
                        cursor: pointer;
                        user-select: none;
                    }
                }
            }
            .custom-followed {
                li {
                    border: 1px dashed #c1c1c1;
                    &:hover {
                        border-color: #398bfb;
                        span {
                            background: #398bfb;
                        }
                    }
                    span {
                        display: inline-block;
                        transform: rotate(45deg) scale(0.8);
                        background: #c1c1c1;
                        border-radius: 50%;
                        position: absolute;
                        top: -8px;
                        left: -8px;
                        color: #f1f1f1;
                    }
                }
            }
            .custom-unfollowed {
                li {
                    border: 1px solid #c1c1c1;
                    span {
                        color: #d1d1d1;
                    }
                    &:hover {
                        background: #398bfb;
                        border-color: #398bfb;
                    }
                }
                .li-move {
                    position: relative;
                }
            }
        }
    }
}
</style>


