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
                        <div  v-for="item in followed" :key="item.id">
                            <li
                                @mousedown="handleMouseDown(item, $event)"
                                 class="item-follow"
                                 :class="{'li-move': eleMoving}"
                            >
                                <span class="iconfont">&#xe6df;</span>
                                {{item.content}}
                            </li>
                            <li v-if="item.back"></li>
                        </div>
                    </ul>
                </div>
                <div class="custom-unfollowed">
                    <ul>
                        <div  v-for="item in unfollowed" :key="item.id">
                            <li
                                @mousedown="handleMouseDown(item, $event)"
                                 class="item-follow"
                                 :class="{'li-move': eleMoving}"
                            >
                                <span class="iconfont">&#xe6df;</span>{{item.content}}</li>
                            <li v-if="showBack" class="back-frame"></li>
                        </div>
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
            moveItem: {},
            mouseX: 0,
            mouseY: 0,
            itemX: 0,
            itemY: 0,
            show: false,
            showBack: false,
            changeColor: false,
            eleMoving: false,
            backContainer: false,
            moveFag: false,
            followed: [{ id: "followed-00", content: "我的导航", back: false }],
            unfollowed: [
                { id: "unfollowed-10", content: "我的股票", back: false },
                { id: "unfollowed-11", content: "我的小说", back: false }
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
        handleMouseDown(item, e) {
            // 将移动的对象返回给data
            this.moveItem = item;
            // 目标的初始位置
            this.eleMoving = true;
            this.itemX = e.target.offsetLeft;
            this.itemY = e.target.offsetTop;
            // 鼠标的初始位置
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
			this.liMoving = true;
            this.moveSelf = e.target;
            this.showBack = true;
        },
        handleMouseMove(e) {
            if (this.liMoving) {
                var movingY = this.itemY + e.clientY - this.mouseY;
                var movingX = this.itemX + e.clientX - this.mouseX;
                // 限定在指定的区域内移动
                if (movingY > 110) {
                    movingY = 110;
                } else if (movingY < 0) {
                    movingY = 0;
                }
                if (movingX > 570) {
                    movingX = 570;
                } else if (movingX < 0) {
                    movingX = 0;
                }
                // 虚线框的位置变化
                if (movingX > 235) {
                    this.showBack = true;
                    this.moveFag = true;
                } else {
                    this.showBack = false;
                }

                if (movingX < 235 && this.moveFag === true) {
                        var _this = this;
                        this.unfollowed = this.unfollowed.filter(function (value, index, arr) {
                            return value.id !== _this.moveItem.id;
                        });
                        this.unfollowed.push(this.moveItem);
                }

                this.moveSelf.style.top =  movingY+ "px";
                this.moveSelf.style.left =  movingX+ "px";
            }
        },
        handleMouseUp(e) {
            if (this.moveItem) {
                // 移动目标当前的偏移量
                var offsetX = parseInt(this.moveSelf.style.left.replace("px", ""));
                    // 判断移动目标属于那一类
                    // 移动的是未关注项目
                if(this.moveItem.id.search("unfollowed") !== -1) {
                    // 判断是否进入指定区域
                    console.log(offsetX);
                    if (offsetX < 235) {
                    // 将未关注改为关注
                        var _this = this;
                        this.unfollowed = this.unfollowed.filter(function (value, index, arr) {
                            return value.id !== _this.moveItem.id;
                        });
                        // 修改id
                        this.moveItem.id = this.moveItem.id.replace("un", "");
                        // 添加到关注项中
                        this.followed.push(this.moveItem);
                    }
                }
                // 将目标改为相对定位
                this.eleMoving = false;
                // 放回原位置或添加的位置
                this.moveSelf.style.top = "0px";
                this.moveSelf.style.left = "0px";
                // 取消定位，为了二次点击时定位到上次移动的最后位置
                this.moveSelf.style.top = "auto";
                this.moveSelf.style.left = "auto";
                this.liMoving  = false;
                this.showBack = false;
                this.moveSelf = null;
                this.moveItem = null;
            }
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
            .custom-followed, .custom-unfollowed {
                width: 280px;
                border: 1px solid red;
                ul {
                    width: 100%;
                    display: flex;
                    li {
                        width: 76px;
                        height: 20px;
                        text-align: center;
                        margin-right: 3px;
                        position: relative;
                        cursor: pointer;
                        user-select: none;
                    }
                    .li-move {
                        position: absolute !important;
                        z-index: 200;
                    }
                    .back-frame {
                         z-index: 10;
                        border:  1px dashed #38f;
                    }
                }
            }
            .custom-followed {
                li {
                    border: 1px dashed #c1c1c1;
                    &:hover {
                        border-color: #38f;
                        span {
                            background: #38f;
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
                .item-follow {
                     z-index: 100;
                    border: 1px solid #c1c1c1;
                    span {
                        color: #d1d1d1;
                    }
                    &:hover {
                        background: #38f;
                        border-color: #38f;
                    }
                }
            }
        }
    }
}
</style>


