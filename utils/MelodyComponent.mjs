import deepClone from './lib/deepClone.mjs';
import { expectOneType } from './lib/expectOneType.mjs';
// import MW from './lib/MW/index.mjs';

export default class MelodyComponent{

    constructor(props={}){
        this.props = deepClone(props);
        this.MW_initLife();
    }


    // component init render lifes
    MW_initLife = () => {
        setTimeout(()=>{

            // 代理掉state ,禁止直接修改this.state,设置好setState监听
            this.MW_bindState = deepClone(this.state);
            // 禁止直接修改this.state 并代理 this.state[key]的读取
            this.MW_banStateChange();
             // beforeRender 
            this.beforeRender();
            // init render
            this.MW_ResUI = this.render();
            //afterRender
            setTimeout(this.afterRender);
        })
    }

    // default state Value  => object
    state = {}

    // renderUI 
    MW_ResUI = null;

    MW_stateCallbackQueue = [];

    MW_RunStateChangeCallbackChange = () => {
        // 执行
        this.MW_stateCallbackQueue.forEach((item,index)=>{
            item && item(this.MW_bindState)
        })
        // 置空
        this.MW_stateCallbackQueue = [];
        console.log(this.MW_stateCallbackQueue,'执行完了当前队列')
    }

    // MW_MW_waitAssignStateTimer 用来控制合并setState，性能优化;
    MW_waitAssignStateTimer = null;
    // MW_waitAssignState 预期要合并的对象;
    MW_waitAssignState = {

    }

    // setState方法
    setState = (obj,callback) => {
       
        expectOneType(obj,'object');

        // todo 是否开启这个校验？意义何在？ wait 后续验证
        for(let i in obj){
            if(!(i in this.MW_bindState)){
                throw new Error(
                    `please init this key in this.state at constructor.\n请先在constructor里初始化this.state.${i}的值`
                )
            }
        }
        Object.assign(this.MW_waitAssignState,obj);
        setTimeout(()=>{
            this.MW_stateCallbackQueue.push(callback);
            console.log('当前队列',this.MW_stateCallbackQueue,this.MW_waitAssignStateTimer);    
            clearTimeout(this.MW_waitAssignStateTimer);
            
            this.MW_waitAssignStateTimer = setTimeout(()=>{
                Object.assign(this.MW_bindState,this.MW_waitAssignState);
                console.log('this.setState callback们跑起来了',`当前state为${JSON.stringify(this.MW_bindState)}`)
                this.MW_RunStateChangeCallbackChange();
                this.MW_waitAssignStateTimer = null;
            })
        });




    }

    // banStateChange
    MW_banStateChange = () => {
        Object.defineProperty(this,'state',{
            get:() => {
                return this.MW_bindState;
            },
            set:() => {
                throw new Error(
                    `cann't modify this.state directly,please use "this.setState" to update this.state.\n不能直接修改this.state的值,请用 this.setState 对它进行更新操作.`
                ) 
            }
        })
    }

    beforeRender = ()=>{
        console.log('beforeRender');
    }
    afterRender = () => {
        console.log('afterRender');
    }

    beforeUpdate = () => {
        console.log('beforeUpdate');
    }

    afterUpdate = () => {
        console.log('afterUpdate');
    }

}