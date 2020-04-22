import MC from '../utils/MelodyComponent.mjs';
import MW from '../utils/lib/MW/index.mjs';



class App extends MC{
    constructor(props){
        super(props);
        this.state = {
            count:1
        }
    }

    render = ()=> MW.ceateElement('div',{
        // value:'嘻嘻',
        innerText:this.state.count,
        className:'box'  
    })

    beforeRender = () => {
        this.state.count++;
        console.log(this.state);
    }
    
    afterRender = () => {
        this.state.count ++ 
        console.log(this.state);
    }
}

MW.mount(new App(),document.getElementById('root'));