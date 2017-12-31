<template>
<div class="sho">
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="(v,i) in guideImg" :key="i">
            <img :src="v.src" alt="">
            <i class="goto" @click="goIndex">进入HOT男人</i>
        </mt-swipe-item>       
    </mt-swipe>
  </div>  
</template>

<script>

import {mapState,mapActions} from "vuex";
import $ from "../utils/jquery-1.11.2.min"
import router from "./router";
export default {
   computed:{
       ...mapState([
           "guideImg"
       ])
   },
   methods:{
       goIndex(idx){       
          router.push("/index/watch");             
       }
   },
   mounted(){
       $(".goto").eq(3).css('display','block')
   }
}
</script>

<style>
    html,body,.sho,img{
        width: 100%;
        height: 100%;
    }
   
</style>
