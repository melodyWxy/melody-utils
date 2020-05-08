import deepClone from './lib/deepClone.mjs';
import { expectOneType } from './lib/expectOneType.mjs';
// import MW from './lib/MW/index.mjs';
import { diff_render } from './lib/diff.mjs';
export default class MelodyComponent{

    constructor(props={}){
        this.props = deepClone(props);
        this.MW_initLife();
    }

    

    // component init render lifes
    MW_initLife = () => {
        setTimeout(()=>{

            // 处理生命周期钩子
            this.MW_dealLifeThis();
            // 代理掉state ,禁止直接修改this.state,设置好setState监听
            this.MW_bindState = deepClone(this.state);
            // 禁止直接修改this.state 并代理 this.state[key]的读取
            this.MW_banStateChange();
             // beforeRender 
            this.beforeMount();
            // init render
            this.MW_ResUI = this.render();
            //afterRender
            setTimeout(this.afterMount);
        })
    }

    // default state Value  => object
    state = {}

    // renderUI 
    MW_ResUI = null;

    MW_stateCallbackQueue = [];

    MW_RunStateChangeCallback = () => {
        // 执行
        this.MW_stateCallbackQueue.forEach((item,index)=>{
            item && item(this.MW_bindState)
        })
        // 置空
        this.MW_stateCallbackQueue = [];
        // console.log(this.MW_stateCallbackQueue,'执行完了当前队列')
    }

    // MW_MW_waitAssignStateTimer 用来控制合并setState，性能优化;
    MW_waitAssignStateTimer = null;
    // MW_waitAssignState 预期要合并的对象;
    MW_waitAssignState = {

    }

    // setState方法  合并更新state  => 生命周期 => diff-render => 生命周期 => callbackList
    setState = (obj,callback) => {
       
        expectOneType(obj,'object');

        // todo 是否开启这个校验？意义何在？ wait 后续验证
        // for(let i in obj){
        //     if(!(i in this.MW_bindState)){
        //         throw new Error(
        //             `please init this key in this.state at constructor.\n请先在constructor里初始化this.state.${i}的值`
        //         )
        //     }
        // }
        // 暂存state更改
        Object.assign(this.MW_waitAssignState,obj);

        setTimeout(()=>{
            this.MW_stateCallbackQueue.push(callback);
            // console.log('当前队列',this.MW_stateCallbackQueue,this.MW_waitAssignStateTimer);    
            clearTimeout(this.MW_waitAssignStateTimer);
            
            
            this.MW_waitAssignStateTimer = setTimeout(()=>{
                // 合并所有暂存的state
                Object.assign(this.MW_bindState,this.MW_waitAssignState);
                console.log('this.setState callback们跑起来了',`当前state为${JSON.stringify(this.MW_bindState)}`);
                this.beforeUpdate();
                // diff-render
                const mwRenderRes = this.render();
                diff_render(this.MW_ResUI, mwRenderRes);
                //执行callbackList
                this.MW_RunStateChangeCallback();
                this.MW_waitAssignStateTimer = null;
            })
        });

    }


    // 生成新的vDom树 => diff-render     
    MW_diff_render = (newDomTree) => {
        // 拿到最新的 mw-render-res
        // 生成新的vDom树
       
        // const vDomTree = MW.VdomToDom(mwRenderRes);
        // diff : 比对两颗虚拟dom树 , 差异render
        console.log('这是最新的render，它的结果为:\n',newDomTree);
        console.log('这是之前的render\n',this.MW_ResUI)
        // console.log(vDomTree);

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

    beforeMount = ()=>{
        console.log('beforeRender');
    }
    afterMount = () => {
        console.log('afterRender');
    }

    beforeUpdate = () => {
        console.log('beforeUpdate');
    }

    afterUpdate = () => {
        console.log('afterUpdate');
    }



    // MW_dealLifeThis 
    MW_dealLifeThis = () => {
        // 生命周期中的this处理
        this.beforeMount = this.beforeMount.bind(this);
        this.afterMount = this.afterMount.bind(this);
        this.beforeUpdate =this.beforeUpdate.bind(this);
        this.afterUpdate = this.afterUpdate.bind(this);
    }
}