<template>
   <section class="section">
       <div class="home">
           <div class="home-box">
               <div class="home-top">
                   <nav @click="change(i)" v-for="(n,i ) in nav" :key="i" :class="navIndex==i?'nav-active':''">{{n}}</nav>
               </div>
               <div class="home-div">
                   <div class="common hot" v-show="show">
                       <div class="home-nav">
                           <div @click="changeIndex(i)" class="nav" v-for="(n,i ) in navList" :key="i" :class="swiperIndex==i?'active':''">{{n}}</div>
                       </div>

                       <div class="home-swiper">
                        
                            <div class="swiper-container mt-1" id="swipe">
                                <div class="swiper-wrapper">
                                    <div class="swiper-slide mt-2 slide1" >
                                      
                                            <ul class="list"
                                          
                                            >

                                                <li v-for="(item,i) in list" :key="i">
                                                    <router-link :to="{name:'movieDetail',params:{id:item.id},query:{name:item.title}}">
                                                        <img :src="item.images.large" alt="">
                                                        <p>{{item.title}}</p>
                                                    </router-link>
                                                </li>
                                            </ul>
                                       
                                    </div>
                                    <div class="swiper-slide mt-2">足球美女</div>
                                    <div class="swiper-slide mt-2">足球生活</div>
                                </div>
                            </div>
                       </div>
                   </div>
                   <div class="common notice" v-show="!show">
                       <h1>关注</h1>
                   </div>
               </div>
           </div>
       </div>
   </section>
</template>