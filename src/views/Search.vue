<template>
  <div class="searchTop">
    <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-zuojiantou"></use>
    </svg>
    <input type="text" placeholder="周杰伦" @keydown.enter="enterKey" v-model.trim="searchKey">
  </div>
  <div class="searchHistory">
    <span class="history">历史</span>
    <span class="spanKey" v-for="item in keyWordList" :key="item" @click="searchHistory(item)">{{item}}</span>
    <svg class="icon" aria-hidden="true" @click="delHistory">
      <use xlink:href="#icon-shanchu"></use>
    </svg>
  </div>
  <div class="musicItem" v-for="(item,index) in searchList" :key="index">
    <div class="musicItemLeft" @click="updateIndex(item,index)">
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
</template>

<script>
import {getSearchMusic} from "@/request/api/home";

export default {
  name: "Search",
  data(){
    return{
      keyWordList:[],
      searchKey:'',
      searchList:[]
    }
  },
  mounted() {
    this.keyWordList = JSON.parse(localStorage.getItem('keyWordList')) || []
  },
  methods:{
    enterKey:async function (){
      if (this.searchKey!=''){
        this.keyWordList.unshift(this.searchKey)
        this.keyWordList = [...new Set(this.keyWordList)]
        localStorage.setItem('keyWordList',JSON.stringify(this.keyWordList))
        let res = await getSearchMusic(this.searchKey)
        this.searchList = res.data.result.songs
        console.log(res)
        this.searchKey=''
      }
    },
    delHistory:function (){
      localStorage.removeItem('keyWordList')
      this.keyWordList = []
    },
    searchHistory:async function (item){
      let res = await getSearchMusic(item)
      this.searchList = res.data.result.songs
      console.log(this.searchList)
    },
    updateIndex:function (item,index){
      this.$store.commit('pushPlayList',item)
      this.$store.commit('updatePlayListIndex',this.$store.state.playList.length-1)
    }
  },
  watch:{
    keyWordList:function (){
      if (this.keyWordList.length>3){
        this.keyWordList.pop()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchTop{
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  align-items: center;
  input{
    margin-left: 0.4rem;
    border: none;
    border-bottom: 1px solid #999;
    width: 90%;
    padding: 0.1rem;
  }
}
.searchHistory{
  width: 100%;
  padding: 0.2rem;
  position: relative;
  .history{
    font-weight: 700;
  }
  .spanKey{
    padding: 0.1rem 0.2rem;
    background-color: rgb(185,169,169);
    border-radius: 0.4rem;
    margin: 0.1rem 0.2rem;
    display: inline-block;
  }
  .icon{
    width: 0.3rem;
    height: 0.3rem;
    position: absolute;
    right: 0.2rem;
  }
}
.musicItem{
  padding: 0.2rem;
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
</style>