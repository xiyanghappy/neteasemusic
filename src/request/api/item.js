import service from "@/request";
//获取歌单详情
export function getMusicItemList(id){
    return service({
        method:'get',
        url:`/playlist/detail?id=${id}`
    })
}
//获取歌单的歌曲
export function getMusicList(id){
    return service({
        method:'get',
        url:`/playlist/track/all?id=${id}&limit=20&offset=1`
    })
}
//获取歌词
export function getMusicLyric(id){
    return service({
        method:'get',
        url:`/lyric?id=${id}`
    })
}