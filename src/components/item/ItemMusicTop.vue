<template>
  <div class="itemMusicTop">
    <img :src="playlist.coverImgUrl" alt="" class="bgimg">
    <div class="itemLeft">
      <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <span>歌单</span>
    </div>
      <div class="itemRight">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiao"></use>
        </svg>
      </div>
  </div>

  <div class="itemMusicCreator">
    <img :src="playlist.coverImgUrl" alt="">
    <div class="creatorRight">
      <span class="gedanName">{{playlist.name}}</span>
      <div class="creator">
        <img :src="playlist.creator.avatarUrl" alt="">
        <span>{{playlist.creator.nickname}}</span>
      </div>
      <span class="musicDes">{{playlist.description}}</span>
    </div>
  </div>
  <div class="iconList">
    <div class="iconItem">
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-pinglun"></use>
    </svg>
    <span>{{playlist.commentCount}}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
      <span>{{playlist.shareCount}}</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="iconItem">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "ItemMusicTop",
  setup(props){
    console.log(props)
    //通过props传值，判断数据拿不到就从sessionstorage取
    if ((props.playlist.creator="")){
      props.playlist.creator = JSON.parse(sessionStorage.getItem('itemDetail').playlist).creator
    }
  },
  props:['playlist']
}
</script>

<style lang="less" scoped>
.itemMusicTop{
  width: 100%;
  height: 1rem;
  display: flex;
  justify-content: space-between;
  position: relative;
  .itemLeft,.itemRight{
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    span{
      font-size: 0.4rem;
      color: #fff;
    }
    .icon{
      fill: #fff;
    }
  }
  .bgimg{
    width: 100%;
    height: 6rem;
    position: fixed;
    z-index: -1;
    filter: blur(20px);
  }
}
.itemMusicCreator{
  margin-top: 0.4rem;
  display: flex;
  img{
    width: 2.5rem;
    height: 3rem;
    margin-left: 0.4rem;
    border-radius: 10px;
  }
  .creatorRight{
    margin: 0 10px;
    display: flex;
    flex-direction: column;
    .gedanName{
      color: white;
      font-weight: 900;
    }
    .musicDes{
      width: 100%;
      height: 70px;
      overflow: hidden;
    }
    .creator{
      width: 100%;
      margin-top: 10px;


      span{
        display: inline-block;
        line-height: 40px;

      }
      img{
        border-radius: 50%;
        width: 30px;
        height: 30px;
        margin: 0;
      }
    }
  }
}
.iconList{
  width: 100%;
  height: 1rem;
  margin-top: 10px;
  display: flex;
  justify-content: space-around;
  .iconItem{
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    span{
      margin-top: 0.14rem;
    }
  }
}
</style>