<template>
  <router-view/>
  <FooterMusic v-show="$store.state.isFooterMusic"></FooterMusic>
</template>

<style lang="less">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.icon{
  width: 0.5rem;
  height: 0.5rem;
}
a{
  color: black;
}
</style>
<script setup>
import FooterMusic from "@/components/item/FooterMusic.vue";

</script>