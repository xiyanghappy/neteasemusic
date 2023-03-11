<template>
  <img :src="music.al.picUrl" alt="" class="bgimg">
  <div class="detailTop">
    <div class="detailTopLeft">
      <svg class="icon" aria-hidden="true" @click="backHome">
        <use xlink:href="#icon-zuojiantou"></use>
      </svg>
      <div class="leftMarquee">
        <Vue3Marquee style="color: white">{{music.name}}</Vue3Marquee>
        <span v-for="item in music.ar" :key="item">{{item.name}}</span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiangyoujiantou"></use>
        </svg>
      </div>
    </div>
    <div class="detailTopRight">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang"></use>
      </svg>
    </div>
  </div>
  <div class="detailContent" v-show="!isLyricShow">
    <img src="../../assets/needle-ab.png"  alt="cizhen" class="img_needle" :class="{img_needle_active:!isbtnShow}"/>
    <img src="../../assets/cd.png"  alt="cd" class="img_cd"/>
    <img :src="music.al.picUrl" alt="" class="img_al" :class="{img_al_paused:isbtnShow,img_al_active:!isbtnShow}" @click="isLyricShow=true">
  </div>
  <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
    <p v-for="item in lyric" :key="item" :class="{active:(currentTime*1000>=item.time && currentTime*1000<item.pre)}">{{item.lrc}}</p>
  </div>
  <div class="detailFooter">
    <div class="footerTop">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-jushoucang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai1"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-changpian"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-pinglun"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-liebiao-"></use>
      </svg>
    </div>
    <div class="footerContent">
      <input type="range" class="range" min="0" :max="duration" v-model="currentTime" step="0.05">
    </div>
    <div class="footer">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xunhuan"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
        <use xlink:href="#icon-shangyishoushangyige"></use>
      </svg>
      <svg class="bigicon" aria-hidden="true" @click="play" v-if="isbtnShow">
        <use xlink:href="#icon-bofang_2-copy"></use>
      </svg>
      <svg class="bigicon" aria-hidden="true" @click="play" v-else>
        <use xlink:href="#icon-zanting"></use>
      </svg>
      <svg class="icon" aria-hidden="true" @click="goPlay(1)">
        <use xlink:href="#icon-xiayigexiayishou"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-zu-copy"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import {mapMutations, mapState} from "vuex";
export default {
  data(){
    return{
      isLyricShow:false
    }
  },
  mounted() {
    this.addDuration()
  },
  computed:{
    ...mapState(['lyricList','currentTime','playList','playListIndex','duration']),
    lyric:function (){
      let arr;
      if (this.lyricList.lyric){
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item,i)=>{
          let min = item.slice(1,3)
          let sec = item.slice(4,6)
          let mill = item.slice(9,10)===']'?item.slice(7,9):item.slice(7,10)
          let lrc = item.slice(11,item.length)
          let time = parseInt(min)*60*1000+parseInt(sec)*1000+parseInt(mill)
          return{min,sec,mill,lrc,time}
        })
        arr.forEach((item,i)=>{
          if (i===arr.length-1 || isNaN(arr[i+1].time)){
            item.pre=100000
          }else {
            item.pre = arr[i+1].time
          }
        })
      }
      return arr
    }
  },
  name: "MusicDetail",
  props:['music','play','isbtnShow','addDuration'],
  components: {
    Vue3Marquee,
  },
  methods:{
    ...mapMutations(['updateDetailShow','updatePlayListIndex']),
    backHome:function (){
      this.updateDetailShow()
      this.isLyricShow=false
    },
    goPlay:function (num){
      let index = this.playListIndex+num
      index = index===-1?this.playList.length-1:(index===this.playList.length?0:index)
      this.updatePlayListIndex(index)
    }
  },
  watch:{
    currentTime:function (newValue){
      let p = document.querySelector('p.active')
      if (p){
        if (p.offsetTop>300){
          this.$refs.musicLyric.scrollTop=p.offsetTop-300
        }
      }
      if (newValue===this.duration){
        if (this.playListIndex===this.playList.length-1){
          this.updatePlayListIndex(0)
          this.play()
        }else {
          this.updatePlayListIndex(this.playListIndex+1)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.bgimg{
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: -1;
  filter: blur(70px);
}
.detailTop{
  width: 100%;
  height: 1rem;
  display: flex;
  padding: 0.2rem;
  justify-content: space-between;
  align-items: center;
  fill: #fff;
  .detailTopLeft{
    display: flex;
    align-items: center;
    .leftMarquee{
      width: 3rem;
      height: 100%;
      margin-left: 0.4rem;
      span{
        color: #cccccc;
      }
      .icon{
        width: 0.3rem;
        height: 0.3rem;
        fill: #999;
      }
    }
  }
}
.detailContent{
  width: 100%;
  height: 9rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .img_needle{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(-20deg);
    transition: all 2s;
  }
  .img_needle_active{
    width: 2rem;
    height: 3rem;
    position: absolute;
    left: 46%;
    transform-origin: 0 0;
    transform: rotate(0deg);
    transition: all 2s;
  }
  .img_cd{
    width: 5rem;
    height: 5rem;
    position: absolute;
    bottom: 2.3rem;
    z-index: -1;
  }
  .img_al{
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    position: absolute;
    bottom: 3.14rem;
    animation: rotate_al 15s linear infinite;
  }
  .img_al_active{
    animation-play-state: running;
  }
  .img_al_paused{
    animation-play-state: paused;
  }
  @keyframes rotate_al{
    0%{
      transform: rotateZ(0deg);
    }
    100%{
      transform: rotateZ(360deg);
    }
  }
}
.musicLyric{
  width: 100%;
  height: 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 0.2rem;
  overflow: scroll;
  p{
    color: rgb(190,181,181);
    margin-bottom: 0.3rem;
  }
  .active{
    color: #fff;
    font-size: 0.4rem;
  }
}
.detailFooter{
  width: 100%;
  height: 3rem;
  position: absolute;
  bottom: 0.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .footerTop{
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon{
      width: 0.5rem;
      height: 0.5rem;
      fill: rgb(245,234,234);
    }
  }
  .range{
    width: 100%;
    height: 0.06rem;
    color: #353278;
  }
  .footer {
    width: 100%;
    height: 1rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 0.5rem;
      height: 0.5rem;
      fill: rgb(245, 234, 234);
    }
    .bigicon {
      width: 0.9rem;
      height: 0.9rem;
      fill: rgb(245, 234, 234);
    }
  }
}
</style>