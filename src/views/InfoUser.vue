<template>
  <div class="infoUserTop">
    <img :src="userDetail.profile.avatarUrl" alt="" class="img">
    <div class="name">{{userDetail.profile.nickname}}</div>
  </div>

</template>

<script>
import {getLoginUser, loginStatus} from "@/request/api/login";
import store from "@/store";

export default {
  name: "InfoUser",
  data(){
    return{
      userDetail:[]
    }
  },
  methods:{
    getUserDetail:async function (){
      let status = await loginStatus()
      console.log(status.data.data.account.status)
      if (status.data.data.account.status===0){

        let res = await getLoginUser(status.data.data.account.id)
        this.userDetail = res.data
        console.log(this.userDetail)
      }else {
        store.state.isLogin=false
        this.$router.push('/login')
      }
    }
  },
  beforeMount() {
    this.getUserDetail()
  }
}
</script>

<style lang="less" scoped>
.infoUserTop{
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
  .name{
    font-size: 0.4rem;
    font-weight: 700;
  }
}
</style>