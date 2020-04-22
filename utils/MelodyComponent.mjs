import deepClone from './lib/deepClone.mjs';
// import MW from './lib/MW/index.mjs';

export default class MelodyComponent{

    constructor(props={}){
        this.props = deepClone(props);
        this.MW_initLife();
    }


    // component init render lifes
    MW_initLife = () => {
        setTimeout(()=>{
             // beforeRender 
            this.beforeRender();
            //init render
            this.MW_ResUI =  this.render();
            //afterRender
            this.afterRender();
            this.MW_listenStateChange();
        })
    }

    // default state Value  => object
    state = {}

    // renderUI 
    MW_ResUI = null;

    // bindState
    MW_listenStateChange = () => {
        new Proxy(this.state,{
            set: function(...props){
                const [,key,value,] = props;
                
                return Reflect.set(...props);
            }
        })
    }

    beforeRender = ()=>{
        console.log('beforeRender');
    }
    afterRender = () => {
        console.log('afterRender');
    }


    render = () => {
        console.log('render');
    }

    beforeUpdate = () => {
        console.log('beforeUpdate');
    }

    afterUpdate = () => {
        console.log('afterUpdate');
    }

}