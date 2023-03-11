import service from "@/request";
//获取首页轮播图

export function getLoginQrKey(timestamp){
    return service({
        method:'get',
        url:`/login/qr/key?timestamp=${timestamp}`
    })
}
export function getLoginQrCode(key,timestamp){
    return service({
        method:'get',
        url:`/login/qr/create?qrimg=true&key=${key}&timestamp=${timestamp}`
    })
}
export function getLoginState(key,timestamp){
    return service({
        method:'get',
        url:`/login/qr/check?key=${key}&timestamp=${timestamp}`
    })
}
export function loginStatus(){
    return service({
        method:'get',
        url:`/login/status`
    })
}
export function subcount(){
    return service({
        method:'get',
        url:`/user/subcount`
    })
}
//获取用户详情
export function getLoginUser(uid){
    return service({
        method:'get',
        url:`/user/detail?uid=${uid}`
    })
}
