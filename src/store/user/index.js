import { reqGetCode, reqLogout, reqUserInfo, reqUserLogin, reqUserRegister } from "@/api";
import { setToken ,getToken,removeToken } from "@/utils/token";
//登录与注册的模块
const state = {
  code:'',
  token:getToken(),
  userInfo:{}
};

const mutations = {
  GETCODE(state,code){
    state.code = code;
  },
  USERLOGIN(state,token){
    state.token = token;
  },
  GETUSERINFO(state,userInfo){
    state.userInfo = userInfo;
  },
  //清除本地数据
  CLEAR(state){
    //仓库用户信息清空
    state.token = '';
    state.userInfo={};
    //本地存储清空
    removeToken();
  },
};

const actions = {
  //获取验证码
  async getCode({commit},phone){
    let result = await reqGetCode(phone);
    if(result.code==200){
      commit('GETCODE',result.data);
      return 'ok'
    }else{
      return Promise.reject(new Error('faile'));
    }
  },

  //用户的注册
  async userRegister({commit},user){
    let result = await reqUserRegister(user);
    if(result.code == 200){
      console.log(741);
      return 'ok';
    }else{
      return Promise.reject(new Error(faile));
    }
  },

  //用户登录模块
  async userLogin({commit},data){
      let result = await reqUserLogin(data);
      //服务器下发的token,是用户的唯一标识
      if(result.code == 200){
        commit('USERLOGIN',result.data.token);
        //本地持久化存储
        setToken(result.data.token);
        return 'ok';
      }else{
        return Promise.reject(new Error("faile"));
      }
  },

  //获取用户信息
  async getUserInfo({commit}){
    let result = await reqUserInfo();
    if(result.code == 200){
      // 提交用户信息
      commit("GETUSERINFO",result.data);
      return 'ok';
    }else{
      return Promise.reject(new Error('faile'));
    }
  },

  //退出登录
  async userLogout({commit}){
    // 通知服务器清除token
    let result = await reqLogout();
    if(result.code == 200){
      commit("CLEAR");
      return 'ok';
    }else{
      return Promise.reject(new Error(faile));
    }
  },
};

const getters = {

};

export default{
  state,
  actions,
  mutations,
  getters
}