<template>
  <div class="wachlist" v-if="(changdata!='undefind'?changdata:toutiao)"> 
    <dl v-for="(v,i) in changdata" :key="i">
        <dt><router-link :to="{name:'detil',query:{id:v.id}}"><img :src="v.cover" alt=""></router-link></dt>
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
</template>

<script>

import {mapState,mapActions} from "vuex";

export default {
    computed:{   
        ...mapState([
            "toutiao",
            "faceindex",
            "changdata"
        ])
    },
    methods:{
        ...mapActions([
             "gettdata",
             "changm"
        ])
    },
    mounted(){   
        this.gettdata("/mantt");
    }
}
</script>

<style>

</style>
