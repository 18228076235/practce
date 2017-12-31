<template>
  <div>
      <ul class="mgz">
        <li v-for="(v,i) in mgzdata" :key="i">
          <img :src="v.image" alt="">
        </li>
      </ul>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  computed:{
    ...mapState([
      "mgzdata"
    ])
  },
  methods:{
   ...mapActions([
     "changmgz"
   ])
  },
  mounted(){
    this.changmgz()
  }
}
</script>

<style>
  .mgz{
    width: 100%;
    height: 1200px;
    overflow: auto;
  }
</style>
