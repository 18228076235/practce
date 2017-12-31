<template>
  <div class="login">
      <div class="log">
      <mt-field label="" placeholder="手机号、用户名" type="tel" v-model="phone"></mt-field>    
      <mt-field label="" placeholder="密码" type="password" v-model="passw"></mt-field>
      <div class="btn">
          <button @click="login">登录</button>
      </div>
      </div>
      <p>我已阅读并同意《用户服务协议》</p>
      <p><span @click="goregister">没有账号？去注册</span><span>忘记密码</span></p>
      <div class="qq">
          <p><span></span>使用社交网络账号登录<span></span></p>
          <div>
              <i class="iconfont icon-qq"></i>
              <i class="iconfont icon-weixinhudong"></i>
              <i class="iconfont icon-weibo"></i>
        </div>
      </div>

  </div>
</template>

<script>
import Vue from "vue";
import {Field} from 'mint-ui';
import { Toast } from 'mint-ui';

import axios from "axios";
import router from "../views/router"
Vue.component(Field.name, Field);
export default {
    data(){
        return{
          phone:'',
          passw:''
        }
    },
    methods:{   
        login(){
           axios.get("/find",{params:{id:this.phone}}).then(res=>{
                    console.log(res.data)
                    if(res.data==0){
                        Toast({
                            message: '你还没有注册哟',
                            position: 'bottom',
                            duration: 5000
                            });
                    }else{
                         console.log("已注册")
                         if(res.data[0].passwrod!=this.passw){
                            Toast({
                            message: '密码输入错误',
                            position: 'bottom',
                            duration: 5000
                            });
                         }else{
                            localStorage.usename=this.phone 
                            setTimeout(function(){
                            router.push("/index/my"); 
                            },1000)                            
                            Toast({
                            message: '登录成功',
                            position: 'bottom',
                            duration: 5000
                            });
                         }
                    }
             })
        },
        goregister(){
            router.push({name:'register'})
        }
    },
   
}
</script>

<style>
      
</style>
