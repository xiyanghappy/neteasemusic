import { createStore } from 'vuex'

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
        id:2014305609
    }],
      playListIndex:0, //默认下标为0
      isbtnShow:true    //暂停按钮的显示

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
      }
  },
  actions: {
  },
  modules: {
  }
})
