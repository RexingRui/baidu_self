import Vue from "vue";
import App from "./app.vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import router from "./router/index";
import "./assets/styles/common.css";
import "./assets/styles/iconfont.css";

Vue.use(ElementUI);

new Vue({
	el: "#app",
	router,
	render: h => h(App)
});
	
