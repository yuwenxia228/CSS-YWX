/*
    业务场景
    马上大促要来了，我们本次大促要做差异化询价。
    啥是差异化询价？就是说同一个商品，我通过在后台给它设置不同的价格类型，可以让它展示不同的价格。
    具体的逻辑如下：
    - 当价格类型为“预售价”时，满 100 - 20，不满 100 打 9 折
    - 当价格类型为“大促价”时，满 100 - 30，不满 100 打 8 折
    - 当价格类型为“返场价”时，满 200 - 50，不叠加
    - 当价格类型为“尝鲜价”时，直接打 5 折

    将四种价格进行标签化
    预售价 - pre
    大促价 - onSale
    返场价 - back
    尝鲜价 - fresh
*/

// 为了得到最终的价格，我们需要知道2个变量——1.价格类型 2.具体价格
function askPrice(tag,originPrice){
    if(tag==='pre'){
        if(originPrice>=100){
            return originPrice - 20
        }
        return originPrice*0.9
    }
    if(tag === 'onSale'){
        if(originPrice>=100){
            return originPrice - 20
        }
        return originPrice*0.8
    }
    if(tag === 'back'){
        if(originPrice >= 200) {
            return originPrice - 50
        }
        return originPrice
    }
    if(tag === 'fresh'){
        return originPrice*0.5
    }
}
/*
    以上函数乍一看没有什么问题，但实际上违背了两个原则
    1.违背了“单一功能原则”，这个函数里实际上处理了4个逻辑
    带来问题：一旦其中的一行代码出错整个询价函数就无法运行;难以定位问题出在哪里:

    2.违背了“开放封闭原则”
    如果要求新增一个“新人价”，需要在askPrice函数中进行改动，整个函数进行改动，一旦改动的逻辑不对，可能会影响之前的业务
*/

// 重构——>单一功能改造，将4个逻辑提取出来
function prePrice(originPrice){
    if(originPrice>=100){
        return originPrice - 20
    }
    return originPrice*0.9
}
function salePrice(originPrice){
    if(originPrice>=100){
        return originPrice - 20
    }
    return originPrice*0.8
}
function backPrice(originPrice){
    if(originPrice >= 200) {
        return originPrice - 50
    }
    return originPrice
}
function freshPrice(originPrice){
    return originPrice*0.5
}
function askPrice(tag,originPrice){
    if(tag==='pre'){
        return prePrice(originPrice)
    }
    if(tag === 'onSale'){
        return salePrice(originPrice)
    }
    if(tag === 'back'){
        return backPrice(originPrice)
    }
    if(tag === 'fresh'){
        return freshPrice(originPrice)
    }
}
/*
    这样改造后的好处是，如果我调用askPrice('pre',1000)报错了，我可以直接定位到prePrice函数中寻找错误，
    而不是在askPrice函数中寻找对应的逻辑。
*/

// 重构——>开放封闭改造
/*
    如果需要新增一个“新人价”，经过改造后的函数仍然需要修改askPrice的函数体，
    新写一个newUserPrice函数，再把这个函数塞到askPrice中，不够灵活。
    为了解决这个问题，我们可以利用“对象映射”来修改。
*/
// 定义一个询价处理器对象
const priceProcessor = {
    prePrice(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 20;
      }
      return originPrice * 0.9;
    },
    salePrice(originPrice) {
      if (originPrice >= 100) {
        return originPrice - 30;
      }
      return originPrice * 0.8;
    },
    backPrice(originPrice) {
      if (originPrice >= 200) {
        return originPrice - 50;
      }
      return originPrice;
    },
    freshPrice(originPrice) {
      return originPrice * 0.5;
    },
};
function askPrice(tag,originPrice){
    return priceProcessor[tag](originPrice)
}
askPrice('prePrice',1000)//处理预售价
askPrice('salePrice',200)//大促价
askPrice('salePrice',200)//返场价
askPrice('salePrice',200)//尝鲜价
// 增加新人价，并不改变原有逻辑，而只是单纯新增了功能
priceProcessor.newUserPrice = function(originPrice){
    return originPrice - 80
}








