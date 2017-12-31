<template>
  <div class="mylike" id="colse">  
    <h1><i class="iconfont icon-arrows-1-7" @click="goback"></i>我的收藏<span>编辑</span></h1>
    <ul class="main">
        <li v-for="(v,i) in likedata" :key="i">
             <img :src="v.cont[0].cover" alt="">
            <h1>{{v.cont[0].title}}</h1>
        </li>
    </ul>
  </div>
</template>

<script>
import router from "../views/router";
import {mapState,mapActions} from "vuex";
export default {
    data(){
        return{

        }
    },
    props:["like"],
     computed:{
        ...mapState([
            "likedata",   
        ])
    },
    mounted(){
        this.collection(localStorage.usename)
    },
    methods:{
        ...mapActions([
        "collection",
        // "closelike"
    ]),
    goback(){
            // this.closelike(false)
            console.log(this.likeVisble)
            //   this.likeVisble=false
            this.$emit("other")
          
           router.push({name:"my"});
       }    
    } 
}
</script>

<style>

</style>
