<template>
  <div class="my">
      <header>
        <div class="logo">H</div>
        <div @click="out"><i class="iconfont icon-config"></i></div>
        <h6 id="showname"><router-link :to="{name:'login'}">登录</router-link>/<router-link :to="{name:'register'}">注册</router-link></h6>
        <p>你都来HOT男人了，干嘛不登录</p>
      </header>
      <div class="main">
        <ul>
          <li>
            <i class="iconfont icon-shu"></i>
            <p>我的杂志</p>
          </li>
           <li @click="mylike">
             <i class="iconfont icon-shu1" ></i>
            <p>我的收藏</p>
          </li>
           <li>
             <i class="iconfont icon-rili"></i>
            <p>我的评价</p>
          </li>
           <li>
            <i class="iconfont icon-icon"></i>
            <p>我的打赏</p>
          </li>
           <li>
            <i class="iconfont shoucang_five icon-shoucangfive"></i>
            <p>我的众筹</p>
          </li>
           <li>
             <i class="iconfont icon-msnui-collection"></i>
            <p>精选刊</p>
          </li>
        </ul>
      </div>
      
       <mt-popup   v-model="reVisible"  position="right">  
         <div class="register">
             <h1><i class="iconfont icon-arrows-1-7" @click="goback"></i>系统设置</h1>
             <div class="outmain">
               <p>清除缓存<span>24.30MB</span></p>
               <p>仅在WIFI环境下载杂志<span></span></p>
               <p>账户设置</p>
               <p>意见反馈</p>
               <p>关于我们</p>
               <h3 @click="outlogin">退出登录</h3>
             </div>
        </div>   
      </mt-popup> 
        <mt-popup  v-model="likeVisble"  position="right"> 
         <v-like v-on:other="like"></v-like>
         </mt-popup>   
          
  </div>
</template>

<script>



import Vue from 'vue'
import { Popup } from 'mint-ui';
Vue.component(Popup.name, Popup);
import {mapState,mapActions} from "vuex";
import router from "./router";
import Like from "../components/like.vue"
export default {
  data(){
    return {
      reVisible:false, 
      likeVisble:false,
    }
  },
  // computed:{
  //   ...mapState([
  //     "likeVisble"
  //   ])
  // },
  components:{
    "v-like":Like,
  },
   methods:{
    // ...mapActions([
    //   "closelike"
    // ]),
    like(){
      this.likeVisble=false
      console.log('1')
    },
    out(){
      this.reVisible=true;
    },
    goback(){
      this.reVisible=false;
      router.push({name:"my"})
    },
    outlogin(){
      localStorage.usename="";
      var that=this;
      setTimeout(function() {
         that.reVisible=false;
         router.push({name:"my"})
      }, 100);    
    },
    mylike(){
      if(localStorage.usename==""){
        router.push({name:'login'})
      }else{
        //  this.closelike(true);
        this.likeVisble=true
      }
    }
  },
  mounted(){
    if(localStorage.usename!=""){
      document.getElementById("showname").innerHTML=localStorage.usename
    }
    //this.closelike(true)
   
  }
 }
</script>

<style>
 .mint-popup-bottom{
   width: 100%;
   height: 100%;
 }
 .mint-popup{
   width: 100%;
   height: 100%;
   background: width;
 }
 .v-modal{
   opacity: 0;
 }
</style>
