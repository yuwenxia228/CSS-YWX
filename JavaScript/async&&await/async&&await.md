<!-- 
    初步了解：
    1.async与await的作用
    2.async与await的优势【处理then链】

    深入了解：
    1.async/await的实质是什么？【涉及generator
-->
【async与await的作用】
async是“异步”的简称，用于申明一个异步函数
await是async wait的简写，用于等待一个异步方法执行完成

根据语法规定，await函数只能出现在async函数中——>那么async函数该如何调用？
1.前面加await调用，await async f(){await f1()}，陷入无限循环
2.直接调用，似乎await就没有啥作用了

【问题的关键在于async是如何处理返回值的？】
1.如果async函数有返回值——>返回一个promise对象（如果不是promise对象则会通过Promise.resolve方法转为promise对象
<!-- 
async function test1(){
    return 'a'
} 
输出：
a
Promise {<resolved>: undefined}
-->
2.如果async函数没有返回值——>执行Promise.resolve(undefined)，还是返回一个promise对象
<!-- 
async function test2(){
    console.log('a');
} 
输出：
Promise {<resolved>: "a"}
-->

【async函数返回的是一个promise对象】
1.没有await的情况下执行async函数会立即执行，不会阻塞后面的代码
2.因为async返回的是promise对象，所以不使用await执行的话，可以使用then方法执行
<!-- 
test2().then(data=>console.log(data))
输出：
a
Promise {<resolved>: "undefined"}
-->

【await在等待什么？】
1.等待async函数返回的promise——>阻塞后面的代码直到promise对象返回resolve后的值，resolve后的值就是这个表达式的结果
2.等待任何表达式的结果——>await表达式的运算结果就是这个表达式的结果


【参考链接】https://segmentfault.com/a/1190000007535316#articleHeader6