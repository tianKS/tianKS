// Vue插件一定暴露一个对象
let myPlugins = {};

myPlugins.install = function(Vue,optioans){
  // Vue.prototype.$bus:任何组件都可以使用
  // Vue.directive
  // Vue.component
  // Vue.filter
  // 全局指令
  Vue.directive(optioans.name, (element,params)=>{
    element.innerHTML = params.value.toUpperCase();
    console.log(params);
  });
}

export default myPlugins;