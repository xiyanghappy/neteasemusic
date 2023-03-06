import { createStore } from 'vuex'
import {getMusicLyric} from "@/request/api/item";

export default createStore({
  state: {
    playList:[{ //播放列表默认值
      al:{
          id: 158202484,
          name: "我怕",
          pic: 109951168299833330,
          picUrl: "https://p1.music.126.net/sug-5rBVQW3UVnz36A61Ig==/109951168299833333.jpg",
          pic_str: "109951168299833333"
      },
        name: "我怕",
        id:2014305609
    }],
      playListIndex:0, //默认下标为0
      isbtnShow:true,    //暂停按钮的显示
      detailShow:false,  //歌曲详情页显示
      lyricList:{},
      currentTime:0, ///当前播放时间
      duration:0,   //歌曲总时长

  },
  getters: {
  },
  mutations: {
      updateIsbtnShow:function (state,value){
          state.isbtnShow=value
      },
      updatePlayList:function (state,value){
          state.playList = value
      },
      updatePlayListIndex:function (state,value){
          state.playListIndex = value
      },
      updateDetailShow:function (state){
          state.detailShow = !state.detailShow
      },
      updateLyricList:function (state,value){
           state.lyricList = value
      },
      updateCurrentTime:function (state,value){
          state.currentTime = value
      },
      updateDuration:function (state,value){
          state.duration = value
      }
  },
  actions: {
      getLyric:async function (context,value){
          let res = await getMusicLyric(value)
          console.log(res)
          context.commit('updateLyricList',res.data.lrc)
      }
  },
  modules: {
  }
})
