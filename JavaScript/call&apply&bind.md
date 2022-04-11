# call、apply、bind的比较和实现  
call和apply都可以改变this的指向，他们的区别在于传入参数的方法不一样，call列出所有参数，而apply则传递一个数组。bind的区别是返回一个新函数  
### call的实现
模拟思路：  
1、将函数设置为对象的属性  
2、执行函数  
3、删除属性  
```javascript
Function.prototype.call2 = function (context) {
  const context = context ?? window
  context.method = this
  let args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push(`arguments[${i}]`)
  }
  const result = eval('context.method(' + args + ')')
  delete context.method
  return result
}
```
  
### apply的实现
```javascript
Function.prototype.apply2 = function (context, arr = []) {
  const context = context ?? window
  context.method = this
  let args = []
  for (let i = 1; i < arr.length; i++) {
    args.push(`arguments[${i}]`)
  }
  const result = eval('context.method(' + args + ')')
  delete context.method
  return result
}
```
  
### bind实现
```javascript
Function.prototype.bind2 = function (context) {
  const self = this
  const args1 = Array.prototype.slice.call(arguments, 1)
  return function () {
    const args2 = Array.prototype.slice.call(arguments)
    const args = args1.concat(args2) // bind支持两次传参
    return self.apply(context, args)
  }
}
```
