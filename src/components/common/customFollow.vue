 <template>
    <div class="custom-follow" v-closeoutside="handleClose">
        <div :class="{changeColor: show}">
            <span class="nav-custom" @click="show=!show">
                <span class="iconfont">&#xe6df;</span>
                自定义
            </span>
        </div>
        <div
            class="custom-content"
            v-if="show"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
        >
            <div class="triangle-wrapper">
                <em class="triangle"></em>
            </div>
            <div class="follow-title">
                <h3>已关注</h3>
                <h3 class="follow-title-right">未关注</h3>
            </div>
            <div class="iconfont follow-close" @click="show=!show">&#xe6df;</div>
            <div class="move-box">
                <div :class="['custom-' + item.id]" v-for="item in follow" :key="item.id">
                    <ul>
                        <div v-for="value in item.data" :key="value.id">
                            <li
                                @mousedown="handleMouseDown(value, $event)"
                                @click="handleFollowClick(value, $event)"
                                class="item-followed"
                                :class="{'li-move': value.eleMoving}"
                            >
                                <span class="iconfont">&#xe6df;</span>{{value.content}}</li>
                            <li v-if="value.back" class="back-frame"></li>
                        </div>
                        <li class="welcome-frame" v-if="item.welcomeShow"></li>
                    </ul>
                </div>
                <div class="followed-hint" v-if="showFollowedHint">拖到这里可以继续关注</div>
                <div class="unfollowed-hint" v-if="showUnFollowedHint">拖到这里可以取消关注</div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "customFollow",
    data() {
        return {
            moveSelf: null,
            moveItem: null,
            mouseX: 0,
            mouseY: 0,
            itemX: 0,
            itemY: 0,
            show: false,
            welcomeShow: false,
            changeColor: false,
            moveFag: false,
            movingFag: false,
            mouseDownFlag: false,
            follow: {
                followed: {
                    id: "followed",
                    data: [{ id: "followed-00", content: "我的导航", back: false, eleMoving: false }],
                    welcomeShow: false
                },
                unfollowed: {
                    id: "unfollowed",
                    data: [
                        { id: "unfollowed-10", content: "我的股票", back: false, eleMoving: false },
                        { id: "unfollowed-11", content: "我的小说", back: false, eleMoving: false }
                    ],
                    welcomeShow: false
                }
            }

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
        handleMouseDown (item, e) {
            this.movingFag = false;
            // 更改按压标志
            this.mouseDownFlag = true;
            // 将移动的对象返回给data
            this.moveItem = item;
            // 添加目标的class，让其绝对定位
            this.moveItem.eleMoving = true;
            // 目标的初始位置
            this.itemX = e.target.offsetLeft;
            this.itemY = e.target.offsetTop;
            // 鼠标的初始位置
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            // 将移动目标的dom传给data
            this.moveSelf = e.target;
            // 显示移动目标的虚线框
            this.moveItem.back = true;
        },
        handleMouseMove (e) {
            if (this.mouseDownFlag) {
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
                   // 移动的是未关注项目
                if(this.moveItem.id.search("unfollowed") !== -1) {
                    // 虚线框的位置变化
                    if (movingX > 235) {
                        this.moveItem.back = true;
                        this.follow.followed.welcomeShow = false;
                        this.moveFag = true;
                    } else {
                        this.moveItem.back = false;
                        this.follow.followed.welcomeShow = true;
                    }
                    // 被移动的目标再次返回到
                    if (movingX < 235 && this.moveFag === true) {
                            var _this = this;
                            this.follow.unfollowed.data = this.follow.unfollowed.data.filter(function (value, index, arr) {
                                return value.id !== _this.moveItem.id;
                            });
                            this.follow.unfollowed.data.push(this.moveItem);
                    }
                } else {
                    // 虚线框的位置变化
                    if (movingX < 325) {
                        this.moveItem.back = true;
                        this.moveFag = true;
                        this.follow.unfollowed.welcomeShow = false;
                    } else {
                        this.moveItem.back = false;
                        this.follow.unfollowed.welcomeShow = true;
                    }
                    // 被移动的目标再次返回到
                    if (movingX > 325 && this.moveFag === true) {
                            var _this = this;
                            this.follow.followed.data = this.follow.followed.data.filter(function (value, index, arr) {
                                return value.id !== _this.moveItem.id;
                            });
                            this.follow.followed.data.push(this.moveItem);
                    }
                }
                // 移动目标
                this.moveSelf.style.top =  movingY+ "px";
                this.moveSelf.style.left =  movingX+ "px";
                if (movingX > 5 || movingY > 5) {
                    this.movingFag = true;
                } else {
                    this.movingFag = false;
                }
                console.log(this.movingFag);
            }
        },
        handleMouseUp (e) {
            if (this.moveItem) {
                // 移动目标当前的偏移量
                var offsetX = parseInt(this.moveSelf.style.left.replace("px", ""));
                    // 判断移动目标属于那一类
                    // 移动的是未关注项目
                if(this.moveItem.id.search("unfollowed") !== -1) {
                    // 判断是否进入指定区域
                    if (offsetX < 235) {
                    // 将未关注改为关注
                        var _this = this;
                        this.follow.unfollowed.data = this.follow.unfollowed.data.filter(function (value, index, arr) {
                            return value.id !== _this.moveItem.id;
                        });
                        // 修改id
                        this.moveItem.id = this.moveItem.id.replace("un", "");
                        // 添加到关注项中
                        this.follow.followed.data.push(this.moveItem);
                    }
                } else {
                    if (offsetX > 325) {
                        var _this = this;
                        this.follow.followed.data = this.follow.followed.data.filter(function (value, index, arr) {
                            return value.id !== _this.moveItem.id;
                        })
                        this.moveItem.id = this.moveItem.id.replace("followed", "unfollowed");
                        this.follow.unfollowed.data.push(this.moveItem);
                    }
                }
                // 将目标改为相对定位
                this.moveItem.eleMoving = false;
                // 放回原位置或添加的位置
                this.moveSelf.style.top = "0px";
                this.moveSelf.style.left = "0px";
                // 取消定位，为了二次点击时定位到上次移动的最后位置
                this.moveSelf.style.top = "auto";
                this.moveSelf.style.left = "auto";
                // 恢复初始设置
                this.follow.followed.welcomeShow = false;
                this.follow.unfollowed.welcomeShow = false;
                this.mouseDownFlag = false;
                this.moveFag = false;
                this.moveItem.back = false;
                this.welcomeShow = false;
                this.moveSelf = null;
                this.moveItem = null;
            }
        },
        handleFollowClick(item, e){
            if (!this.movingFag) {
                this.moveItem = item;
                var _this = this;
                if(this.moveItem.id.search("unfollowed") !== -1) {
                    // 延时执行添加
                    var timer1 = setTimeout(() => {
                        clearInterval(interval);
                        _this.follow.unfollowed.data = _this.follow.unfollowed.data.filter(value => {
                            return value.id != _this.moveItem.id;
                        });
                        _this.moveItem.id = _this.moveItem.id.replace("un", "");
                        _this.follow.followed.data.push(_this.moveItem);
                        // 将目标改为相对定位
                        _this.moveItem.eleMoving = false;
                        // 放回原位置或添加的位置
                        e.target.style.top = "0px";
                        e.target.style.left = "0px";
                        // 取消定位，为了二次点击时定位到上次移动的最后位置
                        e.target.style.top = "auto";
                        e.target.style.left = "auto";
                        _this.moveItem = null;
                    }, 500);
                    // 计算每10ms移动的距离
                    this.moveItem.eleMoving = true;
                    var startX = e.target.offsetLeft;
                    var moveDistance = (startX - this.follow.followed.data.length * 80 - 32 ) / 50;
                    var interval = setInterval(() => {
                        startX -= moveDistance;
                        e.target.style.left = startX + "px";
                    }, 10);
                } else {
                    var timer2 = setTimeout(() => {
                        clearInterval(interval2);
                        _this.follow.followed.data = _this.follow.followed.data.filter(value => {
                            return value.id != _this.moveItem.id;
                        });
                        _this.moveItem.id = _this.moveItem.id.replace("followed", "unfollowed");
                        _this.follow.unfollowed.data.push(_this.moveItem);
                        // 将目标改为相对定位
                        _this.moveItem.eleMoving = false;
                        // 放回原位置或添加的位置
                        e.target.style.top = "0px";
                        e.target.style.left = "0px";
                        // 取消定位，为了二次点击时定位到上次移动的最后位置
                        e.target.style.top = "auto";
                        e.target.style.left = "auto";
                        _this.moveItem = null;
                    }, 500);
                    // 计算每10ms移动的距离
                    this.moveItem.eleMoving = true;
                    var startX2 = e.target.offsetLeft;
                    var moveDistance = (this.follow.unfollowed.data.length * 80 + 324 - startX2) / 50;
                    var interval2 = setInterval(() => {
                        startX2 += moveDistance;
                        e.target.style.left = startX2 + "px";
                    }, 10);
                }
            }
            console.log(this.movingFag);
        }
    },
    computed: {
        showFollowedHint () {
            return this.follow.followed.data.length === 0;
        },
        showUnFollowedHint() {
            return this.follow.unfollowed.data.length === 0;
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
        padding-top: 0;
        margin-left: -10px;
        width: 648px;
        height: 142px;
        background: white;
        border: 1px solid #d1d1d1;
        box-shadow: 2px 3px 5px #333;
        .follow-close {
            position: absolute;
            top: 5px;
            right: 10px;
            color: #666;
            transform: scale(1.6) rotate(45deg);
            cursor: pointer;
            &:hover {
                color: #0079f4;
            }
        }
        .triangle-wrapper {
            position: absolute;
            width: 0;
            border: 6px solid transparent;
            border-bottom: 6px solid #d1d1d1;
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
            padding: 10px 0;
            margin: 5px 0 5px 50px;
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
            height: 70%;
            // border: 1px solid gray;
            margin-left: 4%;
            .custom-followed,
            .custom-unfollowed {
                width: 280px;
                // border: 1px solid red;
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
                    .back-frame,
                    .welcome-frame {
                        z-index: 10;
                        border: 1px dashed #38f;
                    }
                }
            }
            .custom-followed {
                .item-followed {
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
                .item-followed {
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
            .followed-hint, .unfollowed-hint {
                position: absolute;
                top: 80px;
                left: 120px;
                width: 150px;
                height: 30px;
                color: #515151;
                font-size: 13px;
            }
            .unfollowed-hint {
                left: 420px;
            }
        }
    }
}
</style>


