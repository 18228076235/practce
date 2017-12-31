<template>
  <div class="main">
    <router-view></router-view>
     <v-foot></v-foot>
  </div>
</template>

<script>
import Foot from "../components/foot.vue"
export default {
    components:{
        "v-foot":Foot
    }
}
</script>

<style>

</style>
