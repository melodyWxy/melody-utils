import MC from '../utils/MelodyComponent.mjs';
import MW from '../utils/lib/MW/index.mjs';



class App extends MC{
    constructor(props){
        super(props);
        this.state = {
            count:1
        }
    }

    render = ()=> MW.createElement({
        type:'div',
        props:{
            innerText:this.state.count,
            className:'box'
        },
        key:'key1'
    })

    beforeMount = () => {
        // this.state.count++;
        this.setState({
            count:2
        })
       
    }
    
    afterMount = function(){
        console.log(this,'ar');
    }
}

MW.mount(new App(),document.getElementById('root'));