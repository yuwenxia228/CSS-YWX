// async与await的优势【处理then链】


/* 假设有一个业务场景需要实现：
    1秒后红灯亮起
    红灯亮起后过2秒黄灯亮起
    黄灯亮起后过3秒绿灯亮起
*/
function trafficLight(time,msg){
    return new Promise((resolve)=>{
        setTimeout(() => {
            console.log(msg)
            resolve()
        }, time);
    })
}
function lightOn(time,msg){
    return trafficLight(time,msg)
}
// 使用then链处理
lightOn(1000,'red').then(()=>lightOn(2000,'yellow')).then(()=>lightOn(3000,'green'))

// 使用async/await
async function startLightOn(){
    await lightOn(1000,'red');
    await lightOn(2000,'yellow');
    await lightOn(3000,'green');
}
