import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import 'element-ui/lib/theme-chalk/index.css';
import {Button,MessageBox} from 'element-ui'
//第一个参数：全局组件的名字 第二个参数是：哪一个组件
Vue.component(TypeNav.name,TypeNav);
Vue.component(Carousel.name,Carousel);
Vue.component(Pagination.name,Pagination)
//注册全局组件
Vue.component(Button.name,Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
//引入路由
import router from './router';
//引入仓库
import store from '@/store'
//测试
//引入MockServer.js---Mock数据
import '@/mock/mockServe';
import "swiper/css/swiper.css";
//统一接口api文件夹里面的全部请求函数
import * as API from '@/api';
import fgyr from '@/assets/富冈.jpg'

//引入插件
import VueLazyload from 'vue-lazyload';
// 注册插件
Vue.use(VueLazyload,{
  // 懒加载默认图
  loading: fgyr
});
Vue.config.productionTip = false

// 引入自定义插件
// import myPlugins from './plugins/myPlugins';

// Vue.use(myPlugins,{
//   name:'upper'  
// });

// 引入校验插件
import "@/plugins/validate";
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  store
}).$mount('#app')
