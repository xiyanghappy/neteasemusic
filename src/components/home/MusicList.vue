<template>
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="musicContent">
      <van-swipe :loop="false" :width="150" class="musicSwipe" :show-indicators="false">
        <van-swipe-item v-for="item in state.gedanList" :key="item">
          <router-link :to='{path:"/itemMusic",query:{id:item.id}}'>
            <img :src="item.picUrl" alt="">
          <span class="playCount">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-b24gl-play"></use>
          </svg>
            <span class="count">{{changeCount(item.playCount)}}</span>
          </span>
          <span class="name">{{item.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>

    </div>
  </div>

</template>

<script>
import {onMounted, reactive} from "vue";
import {getMusicList} from "@/request/api/home";

export default {
  name: "MusicList",
  setup(){
    const state = reactive({
      gedanList:[]
    })
    onMounted(async ()=>{
      let res = await getMusicList()
      console.log(res)
      state.gedanList = res.data.result
    })
    function changeCount(num){
      if (num>=100000000){
        return (num/100000000).toFixed(1) + '亿'
      }
      if (num>=10000){
        return (num/10000).toFixed(1) + '万'
      }
    }
    return {state,changeCount}
  }
}
</script>

<style lang="less" scoped>
.musicList{
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop{
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title{
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more{
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .musicContent{
    width: 100%;
    height: 4.5rem;
    .musicSwipe{
      height: 100%;
      .van-swipe-item{
        margin: 0 0.16rem;
        img{
          width: 100%;
          height: 3rem;
          border-radius: 0.3rem;
        }
        .playCount{
          color: #ffffff;
          position: absolute;
          left: -90px;
          top: -5px;
          .icon{
            width: 20px;
            margin-top: 10px;
          }
          .count{
            font-size: 10px;
          }
        }
      }

    }
  }
}
</style>