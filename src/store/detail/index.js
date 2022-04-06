import { reqAddOrUpdateShopCart, reqGoodsInfo } from "@/api";
// 封装的临时身份模块uuid--->生成一个随机字符串（不能再变）
import { getUUID } from "@/utils/uuid_token"
const state = {
  goodInfo:{},
  //游客的临时身份
  uuid_token:getUUID()
}

const mutations = {
  GETGOODINFO(state,goodInfo){
    state.goodInfo = goodInfo;
  }
}

const actions = {
  //获取产品信息action
  async getGoodInfo({commit},skuId){
    let result = await reqGoodsInfo(skuId);
    if(result.code == 200){
      commit('GETGOODINFO',result.data)
    }
  },
  //将产品添加到购物车当中
  async AddOrUpdateShopCart({commit},{skuId,skuNum}){
    //加入购物车返回的结果
    // 服务器写入数据成功，并没有返回其他的数据，只返回code=200,代表这次操作成功
    //没有返回其他数据故不需要三连环
    let result = await reqAddOrUpdateShopCart(skuId,skuNum);
    if(result.code == 200){
      return "ok"
    }else{
      //代表加入购物车失败
      return Promise.reject(new Error("faile"))
    }
  }
}
//简化数组而生
const getters = {
  //路径导航简化的数据
  categoryView(state){
    //比如：state.goodInfo初始状态是空对象categoryView属性值为undefine
    //当前计算出来的属性值至少是个空对象
    return state.goodInfo.categoryView || {};
  },
  //简化产品信息的数据
  skuInfo(){
    return state.goodInfo.skuInfo || {};
  },
  // 产品售卖属性的简化
  spuSaleAttrList(state){
    return state.goodInfo.spuSaleAttrList || [];
  },
}

export default ({
  state,
  mutations,
  actions,
  getters
})