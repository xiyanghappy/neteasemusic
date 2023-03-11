<template>

  <div class="login">
    <p>请您扫码登录</p>
    <div class="qr">
      <img :src="qrUrl" alt="">
    </div>
    <p class="loginMessage">{{loginMessage}}</p>
  </div>

</template>

<script>

import {getLoginQrCode, getLoginQrKey, getLoginState, getLoginUser, loginStatus, subcount} from "@/request/api/login";

export default {
  name: "Login",
  data(){
    return{
      loginMessage:'',
      qrUrl:'',
      stateCode:0,
      cookie:''
    }
  },
  methods: {
    getLogin: async function (){
      let key = (await getLoginQrKey(Date.now())).data.data.unikey
      this.qrUrl = (await getLoginQrCode(key,Date.now())).data.data.qrimg
      let check = setInterval(async ()=>{
        let res = await getLoginState(key,Date.now())
        this.loginMessage = res.data.message
        if (res.data.code === 800){
          clearInterval(check)
        }
        if (res.data.code === 803){
          clearInterval(check)
          this.$store.commit('updateIsLogin',true)
          this.$router.push('/infoUser')
        }
      },3000)
    },
  },
  mounted() {
    this.getLogin()
  },
}


</script>

<style lang="less" scoped>
.login{
  width: 100%;
  height: 100vh;
  background-color: #FF3A3A;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  p{
    font-size: 25px;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
  }
  .qr{
    background-color: white;
    width: 170px;
    height: 170px;
    display: flex;
    align-items: center;
    justify-content: center;

  }
  .loginMessage{
    font-size: 20px;
    margin-top: 20px;
  }
}
</style>