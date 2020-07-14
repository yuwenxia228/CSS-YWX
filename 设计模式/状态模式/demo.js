/*
    业务场景
    有一台咖啡机能够制作四种咖啡，情况如下，根据以下情况写出咖啡机的类
    - 美式咖啡态（american)：只吐黑咖啡
    - 普通拿铁态(latte)：黑咖啡加点奶
    - 香草拿铁态（vanillaLatte）：黑咖啡加点奶再加香草糖浆
    - 摩卡咖啡态(mocha)：黑咖啡加点奶再加点巧克力
*/

class CoffeeMaker{
    constructor(){
        this.state = 'init'//咖啡机处于初始状态
    }
    changeState(state){
        this.state = state//记录咖啡机切换后的状态
        if(state === 'american'){
            console.log('只吐黑咖啡')
        }else if(state === 'latte'){
            console.log('黑咖啡加点奶')
        }else if(state === 'vanillaLatte'){
            console.log('黑咖啡加点奶再加香草糖浆')
        }else if(state === 'mocha'){
            console.log('黑咖啡加点奶再加点巧克力')
        }
    }
}
let c = new CoffeeMaker()
c.changeState('american')
// 根据“单一功能”和“开放封闭”原则进行修改
class CoffeeMaker{
    constructor(){
        this.state = 'init'//咖啡机处于初始状态
    }
    stateProcessor={
        american(){
            console.log('只吐黑咖啡')
        },
        latte(){
            this.american();
            console.log('加点奶')
        },
        vanillaLatte(){
            this.latte()
            console.log('再加香草糖浆')
        },
        mocha(){
            this.latte()
            console.log('加点巧克力')
        }
    }
    changeState(state){
        this.state = state
        if(!this.stateProcessor[state]){
            return
        }
        return this.stateProcessor[state]()
    }
}
/*
    经过修改后的类仍然存在一个隐患，stateProcessor感知不到咖啡机的状态，
    例如新增一个条件：当剩余牛奶量不足的时候如果切换模式为latte状态，咖啡机会提示牛奶量不足
*/
class CoffeeMaker{
    constructor(){
        this.state = 'init'//咖啡机处于初始状态
        this.milk = 500
    }
    stateProcessor={
        that:this,//感知咖啡机状态的变化
        american(){
            console.log('只吐黑咖啡')
        },
        latte(){
            this.american();
            if(this.that.milk>0){
                console.log('加点奶')
            }else{
                console.log('牛奶量不足，请选择其他模式！')
            }
        },
        vanillaLatte(){
            this.latte()
            console.log('再加香草糖浆')
        },
        mocha(){
            this.latte()
            console.log('加点巧克力')
        }
    }
    changeState(state){
        this.state = state
        if(!this.stateProcessor[state]){
            return
        }
        return this.stateProcessor[state]()
    }
}
let c = new CoffeeMaker()
c.milk = 0
c.changeState('latte')


