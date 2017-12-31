import Vue from "vue";
import router from "./router";

import Vuex from "vuex";
Vue.use(Vuex)

import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.use(MintUI)

import store from "../vuex/store.js"

import swiper from "../utils/swiper-3.3.1.min.js"


var vm = new Vue({
    el:"#app",
    data:{
      transitionName:"slide-right"    
    },
    router,
    store,
    watch:{
        "$route":function(to,from){
            var toLength = to.path.split("/").length;
            var fromLength = from.path.split("/").length;
            this.transitionName = toLength>fromLength?"slide-left":"slide-right";
        }
    }
})
