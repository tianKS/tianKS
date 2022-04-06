import {
  reqCategoryList,
  reqGetBannerList,
  reqFloorList
} from "@/api";

//home模块的小仓库
const state = {
  //state中的数据别瞎写，服务器返回对象，服务器返回数组。
  categoryList: [],
  //轮播图的数据
  bannerList: [],
  //floor组件的数据
  floorList: []
};

const mutations = {
  CATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList
  }
};

const actions = {
  async categoryList({
    commit
  }) {
    let result = await reqCategoryList();
    if (result.code == 200) {
      commit('CATEGORYLIST', result.data)
    }
  },
  //获取首页轮播图数据
  async getBannerList({
    commit
  }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit('GETBANNERLIST', result.data)
    }
  },
  //获取floor数据
  async getFloorList({
    commit
  }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      commit('GETFLOORLIST', result.data)
    }
  }
};

const getters = {};

export default ({
  state,
  mutations,
  actions,
  getters
})