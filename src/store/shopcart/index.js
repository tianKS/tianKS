import {
  reqCartList,
  reqDeleteCartById,
  reqUpdateCheckedByid
} from "@/api";

const state = {
  cartList: []
};
const actions = {
  //获取购物车列表数据
  async getCartList({
    commit
  }) {
    let result = await reqCartList();
    if (result.code == 200) {
      commit("GETCARTLIST", result.data);
    }
  },

  //删除购物车产品
  async deleteCartListByskuId({
    commit
  }, skuId) {
    let result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },

  //修改购物车某一个产品选中的状态
  async updateCheckedById({
    commit
  }, {
    skuId,
    isChecked
  }) {
    let result = await reqUpdateCheckedByid(skuId, isChecked);
    if (result.code == 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'));
    }
  },

  //删除全部选中商品
  deleteAllCheckedCart({
    dispatch,
    getters
  }) {
    //context:小仓库，commit，getters dispatch派发action
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = item.isChecked == 1 ? dispatch('deleteCartListByskuId', item.skuId) : '';
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  },

  //修改全部产品的状态
  updateAllCartIsChecked({dispatch,getters},isChecked) {
    //context:小仓库，commit，getters dispatch派发action
    let PromiseAll = [];
    getters.cartList.cartInfoList.forEach(item => {
      let promise = dispatch('updateCheckedById',{skuId:item.skuId, isChecked});
      PromiseAll.push(promise);
    });
    return Promise.all(PromiseAll);
  }
};
const mutations = {
  GETCARTLIST(state, data) {
    state.cartList = data
  }
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {}
  },
  //计算出来购物车数据
  // cartInfoList(state){
  //   return state.
  // }
};

export default {
  state,
  mutations,
  actions,
  getters
}