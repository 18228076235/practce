<template>
  <div class="detil">
     <h2><span>精选文章</span></h2>
      <i class="iconfont icon-arrows-1-7" @click="goback"></i>
       <div v-for="(v,i) in did" :key="i" class="aoto">
            <div class="main">
                <img :src="v.cover" alt="">       
                 <h6>{{v.title}}</h6>
                <p> <span>{{v.tag}}</span><i>{{time}}</i></p>
            </div>
            <div class="aticl">          
                <p>本季，为了纪念“Off The Wall”品牌精神50多年来的传承与延续，原创极限运动品牌Vans 将携经典鞋型Sk8-Hi再度来袭，秋冬配色棋盘格元素在经典款式上推陈出新，向人们诠释Vans不拘一格的品牌态度（Not Just One Thing）。</p>
                  <img :src="v.cover" alt="">
                <p>本系列共有三个颜色，包括黑白棋盘格，蓝绿拼接色，以及经典黑色。黑白棋盘格鞋款，将鞋身棋盘格花纹延伸至鞋底两侧，打破Vans纯色护条的传统。蓝绿拼接色款，则使用海军蓝和军绿色作为鞋身配色，复古而独特。黑色鞋款以鞋后跟的拉链设计为亮点，更大程度地方便了日常穿脱。</p>
            </div>
            <div class="zan">
                <div><i @click="likeadd(v.id)" id="like">❤</i></div>  
                <p>{{v.likenum}}</p>
                <ul class="ico">
                    <li><i class="iconfont icon-weixinhudong"></i><span>微信</span></li>
                        <li><i class="iconfont icon-yuan"></i><span>朋友圈</span></li>
                        <li><i class="iconfont icon-qq"></i><span>QQ</span></li>
                        <li><i class="iconfont icon-weibo"></i><span>微博</span></li>
                </ul>
                <router-link :to="{name:'watch'}">
                    型不型.合集 >
                </router-link>       
            </div>
            <div class="comment">
                <h3>▌热门评论</h3>
                <div v-if="commentdata==0" class="nop">
                    暂无评论,快去抢沙发吧
                </div>
                <div v-else>
                <dl v-for="(v,i) in commentdata" :key="i">
                    <dt>
                        <p class="avator">
                            <img src="http://tp4.sinaimg.cn/1847817515/180/5674140299/1" alt="" >
                        </p>
                        <p class="name">
                            <b{{v.username}}</b><i>{{v.time}}</i>
                        </p>
                        <p class="com">{{v.cont}}</p>
                    </dt>    
                    <dd>
                         <span class="like" @click="v.like++">{{v.like}}&nbsp;&nbsp;☺</span>
                    </dd>
                </dl> 
                </div>    
           </div>
        </div>
    <div class="foot">
        <span @click="comment">✎评论一下</span>
        <div>
            <i>❤</i>
            <i>☪</i>
            <i>➹</i>
        </div>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
import router from "./router";
import { MessageBox } from 'mint-ui';
import axios from "axios";

export default {
     computed:{
    ...mapState([
      "toutiao", 
      "did",
      "time",
      "commentdata",
     
    ])  
  }, 
  methods:{
     ...mapActions([
      "changm", 
      "detil",  
      "detilcg",
      "changcomment",
      "userlike"
    ]),
    comment(){  
        if(localStorage.usename==undefined){
            router.push({name:"login"})
        }else{
            MessageBox.prompt('写评论').then(({ value, action }) => {
           console.log(localStorage.usename)
           var url ="/comment";
           var data=new Date()
           var time=data.getMonth()+'-'+data.getDate()+" "+data.getHours()+":"+data.getMinutes();
           axios.post(url,{id:this.$route.query.id,cont:value,time:time,usename:localStorage.usename})
                .then((res)=>{
                    console.log(res.data)
                })
             });  
        }
     
    },
    goback(){
        router.go(-1)
    },
    likeadd(i){
        document.getElementById("like").style.pointerEvents='none';
         document.getElementById("like").style.color='red'
        this.did[0].likenum++;
        var username=localStorage.usename;
       this.userlike({id:i,username:username})
    }
   
  },
  mounted(){  
    this.detilcg(this.$route.query.id) 
    this.changcomment(this.$route.query.id) 
  }
}
</script>

<style>
  
</style>
