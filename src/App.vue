<template>
  <div id="app">
    <!-- <h1 v-upper.erha="msg"></h1> -->
    <Header/>
    <!-- 路由组件出口的地方 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from './components/Header'
import Footer from './components/Footer'
export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data() {
    return {
      msg: 'value',
    };
  },
  mounted(){
    //通知Vuex发请求，获取数据，存储于仓库当中
    //派发一个action||获取商品分类的二级列表的数据
    this.$store.dispatch("categoryList");
  }
}
</script>