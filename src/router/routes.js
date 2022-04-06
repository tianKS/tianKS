// 当打包构建应用时，JavaScript 包会变得非常大，影响页面加载。
// 如果我们能把不同路由对应的组件分割成不同的代码块，
// 然后当路由被访问的时候才加载对应组件，这样就会更加高效。
//路由配置信息
export default [{
    path: "/center",
    component: () => import('@/pages/Center'),
    meta: {
      show: true
    },
    //二级路由组件
    children: [{
        path: 'myorder',
        component: () => import('@/pages/Center/myOrder'),
      },
      {
        path: 'grouporder',
        component: () => import('@/pages/Center/groupOrder'),
      },
      {
        path: '/center',
        redirect: '/center/myorder',
      }
    ]
  },
  {
    path: "/paysuccess",
    component: () => import('@/pages/PaySuccess'),
    meta: {
      show: true
    }
  },
  {
    path: "/pay",
    component: () => import('@/pages/Pay'),
    meta: {
      show: true
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去支付页面，必须从交易页面而来
      if (from.path == "/trade") {
        next();
      } else {
        // 其他组件来的话会停留在当前
        next(false);
      }
    }
  },
  {
    path: "/trade",
    component: () => import('@/pages/Trade'),
    meta: {
      show: true
    },
    // 路由独享守卫
    beforeEnter: (to, from, next) => {
      // 去交易页面，必须从购物车而来
      if (from.path == "/shopcart") {
        next();
      } else {
        // 其他组件来的话会停留在当前
        next(false);
      }
    }
  },
  {
    path: "/shopcart",
    component: () => import('@/pages/ShopCart'),
    meta: {
      show: true
    }
  },
  {
    path: "/addcartsuccess",
    name: "addcartsuccess",
    component: () => import('@/pages/AddCartSuccess'),
    meta: {
      show: true
    }
  },
  {
    path: "/detail/:skuid",
    // 当点击商品图片需要带商品的id传递过去
    component: () => import('@/pages/Detail'),
    meta: {
      show: true
    }
  },
  {
    path: "/home",
    component: () => import('@/pages/Home'),
    meta: {
      show: true
    },
  },
  {
    name: "search",
    path: "/search/:keyWord?",
    component: () => import('@/pages/Search'),
    meta: {
      show: true
    },
    //路由组件能不能传递props数据
    //布尔值写法
    // props:true,
    //对象写法
    // props:{a:1,b:2},
    // 函数写法：可以params参数，query参数，通过props传递给路由组件
    props: ($route) => ({
      keyWord: $route.params.keyWord,
      k: $route.query.k,
    }),
  },
  {
    path: "/login",
    component: () => import('@/pages/Login'),
    meta: {
      show: false
    },
  },
  {
    path: "/register",
    component: () => import('@/pages/Register'),
    meta: {
      show: false
    },
  },
  //重定向，在项目跑起来的时候，立马让它重定向到首页
  {
    path: "*",
    redirect: "/home",
  },
]