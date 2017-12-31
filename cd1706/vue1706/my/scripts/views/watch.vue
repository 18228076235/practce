<template>
  <div class="section">
      <header>
       <ul>
         <li v-for="(v,i) in headlist" :key="i" @click="changmian(i)" class="onn">
           <p :class="navindex==i?'headactive':''">{{v}}</p>
           <i class="iconfont icon-icon_hot"></i>
         </li>
       </ul>    
      </header>
       <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide wachlist">           
              <mt-swipe :auto="4000" class="banner" :show-indicators="true">
                <mt-swipe-item v-for="(v,i) in bannerdata" :key="i">
                    <img :src="v.image" alt="">
                </mt-swipe-item>       
            </mt-swipe> 
             <dl v-for="(v,i) in toutiao" :key="i">
                 <router-link :to="{name:'detil',query:{id:v.id}}"> <dt><img :src="v.cover" alt=""></dt></router-link>
                  <dd>
                      <h6>{{v.title}}</h6>
                      <p>
                          <span>{{v.tag}}</span>
                          <i class="iconfont icon-icon_hot"></i>
                          <span>{{v.likenum}}</span>
                          <i class="iconfont icon-icon_hot"></i>
                          <span>{{v.readingNumber}}</span>       
                      </p>
                  </dd>
              </dl>
            </div>
            <div class="swiper-slide">
              <v-walist></v-walist>    
            </div>
            <div class="swiper-slide">
              <v-walist></v-walist>
              </div>
            <div class="swiper-slide"> <v-walist></v-walist></div>
            <div class="swiper-slide"> <v-walist></v-walist></div>
           
          </div>
      </div>
      <div class="swiper-pagination"></div>
  </div>
</template>

<script>

import Wachlist from "../components/wachlist.vue"
import {mapState,mapActions} from "vuex";
export default {
  data(){
    return{
       navindex:0
    }
   
  },
  components:{
    "v-walist":Wachlist
  },
  computed:{
    ...mapState([
      "headlist",
      "bannerdata",
      "toutiao", 
    ])  
  },
 
  methods:{
     ...mapActions([
      "changm", 
      "gettdata",  
      "banner"
    ]),
     changmian(i){
    this.changm(i)
    this.navindex=i;
   
      var mySwiper = new Swiper('.swiper-container',{
      })
     
      mySwiper.slideTo(i, 1000, false);//切换到第一个slide，速度为1秒
     
    //this.mySwiper.slideTo(i);
   
    }
  },
  mounted(){
     this.$nextTick(()=>{
        var that =this;
          var mySwiper = new Swiper('.swiper-container', { 
            onSlideChangeEnd: function(swiper){
              that.navindex=swiper.activeIndex;
              that.changm(swiper.activeIndex)
             }
          })
     })
  
    this.banner("/banner");
  }
}
</script>

<style scoped>
      .section,.swiper-container,.swiper-wrapper,.swiper-slide{
        width: 100%;
        height: 97%;
      } 
      .mint-swipe,.mint-swipe-items-wrap,img{
        height: 423px;
        width: 100%;
      }
      .swiper-slide{
        overflow: auto;
      }
</style>
