<template>
  <ItemMusicTop :playlist="state.playlist"></ItemMusicTop>
  <ItemMusicList :musicList="state.musicList" :subscribedCount="state.playlist.subscribedCount"></ItemMusicList>
</template>

<script>
import ItemMusicTop from "@/components/item/ItemMusicTop.vue";
import {onMounted, reactive} from "vue";
import {useRoute} from "vue-router";
import {getMusicItemList,getMusicList} from "@/request/api/item";
import ItemMusicList from "@/components/item/ItemMusicList.vue";

export default {
  name: "ItemMusic",
  components: {ItemMusicList, ItemMusicTop},
  setup(){
    const state = reactive({
      playlist:{},
      musicList:[],
      subscribedCount: 0
    })
    onMounted(async ()=>{
      let itemMusicId = useRoute().query.id
      let res = await getMusicItemList(itemMusicId)
      state.playlist = res.data.playlist
      //获取歌单的歌曲
      let result = await getMusicList(itemMusicId)
      state.musicList = result.data.songs
      //防止页面刷新时数据丢失
      sessionStorage.setItem('itemDetail',JSON.stringify(state))
    })
    return {state}
  }
}
</script>

<style scoped>

</style>