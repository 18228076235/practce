<template>
  <footer>
      <div v-for="(v,i) in footdata" :key="i">
          <router-link :to="{name:v.name}">
              <i class="iconfont" v-html="v.icon"></i>
              <span>{{v.txt}}</span>
          </router-link>
      </div>
  </footer>
</template>

<script>
import {mapState} from "vuex";
export default {
  computed:{
    ...mapState([
      "footdata"
    ])
  }
}
</script>

<style>

</style>
