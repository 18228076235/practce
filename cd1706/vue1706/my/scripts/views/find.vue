<template>
  <div class="find">
    <h1>发现</h1>

    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div v-for="(v,i) in findbanner" :key="i" class="swiper-slide">
          <a :href="v.urllink"><img :src="v.pic" alt=""></a> 
           <h4>{{v.title}}</h4>
        </div>
      </div>
    </div>
 
      <div class="findlist">
        <dl v-for="(v,i) in finddata" :key="i">
        <dt><img :src="v.pic" alt=""></dt>
        <dd>
            <h6>{{v.title}}</h6>
            <p>{{v.introduction}}</p>
            <p>     
              <span>{{v.commentcount}}人讨论</span>       
              <span>{{v.viewcount}}人阅读</span>       
            </p>
        </dd>
      </dl>
    </div>
    
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'mint-ui';

import {mapState,mapActions} from "vuex";


  
export default {
  computed:{
    ...mapState([
      "finddata",
      "findbanner"
    ])
  },
  methods:{
   ...mapActions([
     "findchange",
     "changebanner"
   ])
  },
 mounted(){
      this.findchange("/findman")
    this.changebanner("/lsj")
   setTimeout(function() {
      var mySwiper = new Swiper('.swiper-container', { 
      slidesPerView :2,
      autoplay:5000
    })
   }, 500);
 }
}
</script>

<style>
.swiper-wrapper{
  padding: 3%;
}
 .swiper-slide img{
   width: 94%;
   height: 50%;
   border-radius:4%; 
 }

 
</style>
