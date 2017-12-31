<template>
  <div class="register">
      <h1><i class="iconfont icon-arrows-1-7" @click="goback"></i>注册</h1>
      <div class="main">
          <div>+86<input type="text" placeholder="请输入你的手机号码" v-model="phonm"><span @click="cheknum">获取验证码</span></div>
          <div><input type="text" placeholder="请输入密码" v-model="password"></div>
          <p>老用户请用原有的账号登录后进行手机绑定，直接用手机号注册将无法找回原有的优币和杂志，去帮助中心查看详情</p>
           <div class="btn"><button @click="next">下一步</button></div> 
      </div>
  </div>
</template>

<script>
import axios from "axios"
import { Toast } from 'mint-ui';
import router from "../views/router"

export default {
    data(){
        return{
            phonm:"",
            state:false,
            password:""
        }
    },
    methods:{
        cheknum(){
            var reg=/^(13)|(15)|(18)\d{9}$/
            if(reg.test(this.phonm)==false){
                 Toast({
                    message: '格式输入错误',
                    position: 'bottom',
                    duration: 5000
                    });
            }else{
                axios.get("/find",{params:{id:this.phonm}}).then(res=>{
                    console.log(res.data)
                    if(res.data==0){
                        console.log("ok")
                        this.state=true;      
                    }else{
                        Toast({
                        message: '该用户已注册',
                        position: 'bottom',
                        duration: 5000
                        })
                    }
                })
            }
        },
        next(){
            if(this.state==true){
                console.log(this.password,this.phonm);
                axios.post("/register",{username:this.phonm,passwrod:this.password}).then(res=>{
                   if(res.data==1){
                    Toast({
                    message: '注册成功',
                    position: 'bottom',
                    duration: 5000
                    })
                    router.push("/index/login");   
                    }
                })
            }
        },
        goback(){
            router.go(-1)
        }
    }
}
</script>

<style>
    .register{
        width: 100%;
        height: 100%;   
    }
  
</style>
