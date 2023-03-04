<template>
  <div class="music">
    <div class="top">
      <div class="playAllMusic">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部</span>
        <span>(共{{musicList.length}}首)</span>
      </div>
      <div class="sub">
        + 收藏({{subscribedCount}})
      </div>
    </div>
    <div class="musicItem" v-for="(item,index) in musicList" :key="index">
      <div class="musicItemLeft" @click="playMusic(index)">
        <span>{{index + 1}}</span>
        <div class="song">
          <span class="songName">{{item.name}}</span>
          <div class="creatorName">
          <span v-for="(creator,i) in item.ar" :key="creator">{{creator.name}}
            <span v-if="i < item.ar.length-1">/</span></span></div>
        </div>
      </div>
      <div class="musicItemRight">
        <svg class="icon" aria-hidden="true" v-if="item.mv != 0">
          <use xlink:href="#icon-bofangshipin"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao-copy"></use>
        </svg>
      </div>
    </div>
  </div>

</template>

<script>
import {mapMutations} from "vuex";

export default {
  name: "ItemMusicList",
  setup(props){
    console.log(props)
  },
  props:['musicList','subscribedCount'],
  methods:{
    playMusic:function (index){
      console.log(this.musicList[0].name)
      this.updatePlayList(this.musicList)
      this.updatePlayListIndex(index)
    },
        ...mapMutations(['updatePlayList','updatePlayListIndex'])
  }
}
</script>

<style lang="less" scoped>
.music{
  width: 100%;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  background: white;
  margin-top: 10px;
  .top{
    display: flex;
    justify-content: space-between;
    .playAllMusic{
      margin: 5px 0 0 10px;
      span:nth-child(2){
        margin-left: 10px;
        font-weight: 900;
      }
      span:nth-child(3){
        color: #787878;
      }
    }
    .sub{
      background: #FF3A3A;
      width: 2.5rem;
      border-radius: 30px;
      height: 0.7rem;
      text-align: center;
      line-height: 0.7rem;
      color: white;
      margin: 5px 10px 0 0;
    }
  }
  .musicItem{
    margin-top: 20px;
    width: 100%;
    height: 0.8rem;
    display: flex;
    justify-content: space-between;
    .musicItemLeft{
      margin-left: 10px;
      display: flex;
      .song{
        margin-left: 10px;
        display: flex;
        flex-direction: column;
        .songName{
          font-weight: 700;
        }
        .creatorName{
          display: flex;
        }
      }
    }
    .musicItemRight{
      margin-right: 10px;
      display: flex;
      justify-content: end;
      width: 20%;
      .icon{
        margin-left: 10px;
      }
    }
  }
}
</style>