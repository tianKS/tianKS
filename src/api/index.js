//当前这个模块：API进行统一管理
import requests from "./request";
import mockRequests from "./mockAjax"
//三级联动接口
// /api/product/getBaseCategoryList  get  无参数
//发请求:axios发请求返回结果Promiase对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList');


//获取banner（Hemo首页轮播图接口）
export const reqGetBannerList = ()=> mockRequests.get('/banner');


//获取floor数据
export const reqFloorList = () => mockRequests.get('/floor');


//获取搜索模块数据 地址：/api/list  请求的参数是post  需要带参数
/*{
  "category3Id": "61",
  "categoryName": "手机",
  "keyword": "小米",
  "order": "1:desc",
  "pageNo": 1,
  "pageSize": 10,
  "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
  "trademark": "4:小米"
}
*/
//当前的这个函数需不需要接受外部传递参数
//当前这个接口。给服务器传递参数params,至少是一个空对象
export const reqGetSearchInfo = (params) => requests({url:"/list",method:"post",data:params});



//获取产品详情信息的接口  URL：/api/item/{ skuId } 请求的方式是get
export const reqGoodsInfo = (skuId) => requests({url:`/item/${skuId}`,method:'get'});


//将产品添加到购物车中（获取更新某一个更新产品的个数产品） URL: /api/cart/addToCart/{ skuId }/{ skuNum } 请求的方式是post
export const reqAddOrUpdateShopCart = (skuId,skuNum) =>requests({url:`/cart/addToCart/${ skuId }/${ skuNum }`,method:'post'});



//获取购物车列表数据 
//URL:/api/cart/cartList   method:get
export const reqCartList = () => requests({url:"/cart/cartList",method:'get'});



//删除购物车商品
//URL:/api/cart/deleteCart/{skuId}  method:delete
export const reqDeleteCartById = (skuId) => requests({url:`/cart/deleteCart/${skuId}`,method:'delete'});


//修改商品选中的状态
//URL:/api/cart/checkCart/{skuID}/{isChecked} method:get
export const reqUpdateCheckedByid = (skuId,isChecked) => requests({url:`/cart/checkCart/${skuId}/${isChecked}`,method:'get'});


//获取验证码
//URL:/api/user/passport/sendCode/{phone} method:get
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`,method:'get'});

//用户注册
//URL /api/user/passport/register  method:post
export const reqUserRegister = (params) => requests({url:"/user/passport/register",data:params,method:"post"});

//登录
//url:/api/user/passport/login method:post phone password
export const reqUserLogin = (data) => requests({url:'/user/passport/login',data,method:'post'});    


//获取用户的信息[带着用户的token 向服务器要用户信息]
//URL：/api/user/passport/auth/getUserInfo method:get
export const reqUserInfo = () =>requests({url:'/user/passport/auth/getUserInfo',method:'get'});

//退出登录
//URL:/api/user/passport/logout get
export const reqLogout = () => requests({url:'/user/passport/logout',method:'get'});

//获取用户地址信息
//URL:/api/user/userAddress/auth/findUserAddressList method:get
export const reqAddressInfo = () =>requests({url:'/user/userAddress/auth/findUserAddressList',method:"get"});

//获取商品清单
//URL：/api/order/auth/trade  method:get
export const reqOrderInfo =()=>requests({url:'/order/auth/trade',method:"get"});

//提交订单
// URL：/api/order/auth/submitOrder?tradeNo={tradeNo}  method:get
export const reqSubmitOrder =(tradeNo,params)=>requests({url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,data:params,method:'post'});

//获取支付信息
//URL:/api/payment/weixin/createNative/{orderId}  GET
export const reqPayInfo =(orderId)=> requests({url:`/payment/weixin/createNative/${orderId}`,method:'get'});

//获取支付订单状态
//URL: /api/payment/weixin/queryPayStatus/{orderId}
export const reqPayStatus = (orderId)=>requests({url:`/payment/weixin/queryPayStatus/${orderId}`,method:'get'});

//获取个人中心我的订单
// URL:/api/order/auth/{page}/{limit}  mrthods: get
export const reqMyOrderList = (page,limit) => requests({url:`/order/auth/${page}/${limit}`,method:'get'});