// 全局过滤
// 全局过滤器
export function getTime(time:any) {
    if(time){
        var str = time.substring(0, 6)
        return str
    }
}
export function getTime1(time:any) {
    if(time){
        var str = time.substring(0, 10)
        return str
    }
}
