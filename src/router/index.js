import Vue from "vue";
import VueRouter from "vue-router";
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter);

//先把VueRouter原型对象的push,先保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

//重写push|replace方法，往哪里跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同点，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数：call传递参数用逗号隔开apply方法执行传递数组
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    //call||apply区别
    //相同点，都可以篡改函数的上下文一次
    //不同点：call与apply传递参数：call传递参数用逗号隔开apply方法执行传递数组
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}
//配置路由
let router = new VueRouter({
  //配置路由
  routes,
  // 滚动行为
  scrollBehavior(to, from, savedPosition) {
    //返回的这个y=0,代表的滚动条在最上方
    return {
      y: 0
    }
  }
});

//全局守卫，前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  //to:你想跳转到哪一个路由信息
  //from:可以获取到你从哪一个守卫的信息
  //next()放行
  let token = store.state.user.token;
  //用户的信息
  let name = store.state.user.userInfo.name;
  //用户已经登录了还想去login休想
  if (token) {
    //用户登陆了
    if (to.path == '/login') {
      next('/home');
    } else {
      //登录了但是去的不是login
      if (name) {
        next();
      } else {
        //没有用户信息，派发action让仓库存储用户信息
        try {
          //获取用户信息在首页进行展示
          //获取用户信息成功
          await store.dispatch('getUserInfo');
          next();
        } catch (error) {
          //token失效,获取不到用户信息，需要重新登录
          //清除token
          await store.dispatch('userLogout');
          next('/login');
        }
      }
    }
  } else {
    //未登录，不能去交易相关，不能去支付相关，不能去个人中心
    //未登录去上面这些路由---登录
    
    let toPath = to.path;
    if(toPath.indexOf('/trade') != -1 || toPath.indexOf('/pay') != -1||toPath.indexOf('/center')!=-1||toPath.indexOf('/shopcart')!=-1){
      // 把未登录的时候向去而设计的信息，存储于地址栏当中【路由】
      next('/login?redirect='+toPath);
    }else{
      //去的不是上面的这些路由---放行
      next();
    }
  }
});

export default router;