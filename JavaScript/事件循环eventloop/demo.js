// 判断代码执行顺序，输出代码执行结果
//1
setTimeout(function () {//简称setTimeout为st
    console.log(1);
});
new Promise(function(resolve,reject){//简称promise为p1
    console.log(2)
    resolve(3)
}).then(function(val){
    console.log(val);
})
console.log(4);
/*
    主线程代码：p1中的console.log(2);console.log(4);
    微任务：p1中的resolve(3)
    宏任务：st中的console.log(1);
    执行顺序：2,4,3,1
*/

//2
setTimeout(()=>{
    console.log('A');//简称st1
},0);
var obj={
    func:function () {
        setTimeout(function () {
            console.log('B')//简称st2
        },0);
        return new Promise(function (resolve) {//简称p1
            console.log('C');
            resolve();
        })
    }
};
obj.func().then(function () {
    console.log('D')
});
console.log('E');
/*
    主线程代码：p1中的console.log('C');console.log('E');
    微任务：p1状态完成后执行的console.log('D')
    宏任务：st1中的console.log('A');st2中的console.log('B');
    执行顺序：C,E,D,A,B
*/
