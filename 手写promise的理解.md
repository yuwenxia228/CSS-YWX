```
class Ywxpromise{
  constructor(fn) {
    this.state = 'pendding';
    this.value = undefined;
    this.reason = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];
    let resolve = (val) => {
      if(this.state === 'pendding') {
        this.state = 'fulfilled';
        this.value = val;
      }
    }
    let reject = (err) => {
      if(this.state === 'pendding') {
        this.state = 'rejected';
        this.reason = err;
      }
    }
    fn();
  }
  
  then(onFulfilled, onRejected){
    let promise2; { //then返回一个promise对象才能形成链式调用
    if(this.state === 'fulfilled'){
      promise2 = newYwxpromise((resolve, reject){
      //怎么是放在这里的？
        let x = onFulfilled(this.value);//在自定义的成功回调函数中传入resolve成功后的值，失败同理
        resolvePromise(promise2, x, resolve, reject);
      })
    }
    if(this.state === 'rejected'){
      promise2 = newYwxpromise((resolve, reject){
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      }     
    }
    if(this.state === 'pendding'){
      this.onFulfilledCallbacks.push(() => {
        let x = onFulfilled(this.value);
        resolvePromise(promise2, x, resolve, reject);
      })
      this.onRejectedCallbacks.push(() => {
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
      })
    }
    return promise2;
  }
}

//resolvePromise为promise/A+规范
//要求必须resolve一个值，不能是promise对象
resolvePromise(promise2, x, resolve, reject){
  //promise2是新初始化的promise对象，x是onFulfilled函数return的结果，为什么要把这两个拿过来呢？
  //因为最后返回的结果取决于这两个参数
  //1、如果x是一个基本值，最后直接resolve(x)
  //2、如果x是一个promise对象，最后要把这个promise对象里的值取出来，再resolve传给下一个then
  //3、
  //4、
  if(promise2 === x) {
    return reject(TypeError('循环引用')); //这里为什么会有循环引用的错误呢？
    //在上文then方法里，我们写了这样一段代码：let promise2 = new Ywxpromise((resolve, reject)=>{let x = onFulfilled();})这里返回的也有可能是promise2
    //就相当于这种情况let p2 = p1.then((data)=>{return p2;}) p2在等待then执行完才能完成变量创建，而return只有在p2创建后才能完成，形成了一个死循环
    if(x !== null && (typeof x === 'Object' || typeof x === 'Function')){
      let called;
      then = x.then;
      if(typeof x === 'Function'){ //进一步验证x是promise对象,如果then不是一个方法就不是promise对象
        then.call(x, y =>{
          //成功回调,就是onFulfilled
          if(called) return;
          called = true;
          resolvePromise(promise2, y, resolve, reject) //y就相当于onFulfilled里传的值，就是外层promise返回的值？？？
        },err => {
          if(called) return;
          called = true;
          reject(err);
        })
      }else{
      resolve(x);
      }
    }else{ 
      //如果不是promise对象
      resolve(x);
    }
  }
}
```
