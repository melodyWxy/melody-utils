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
        // this.state.count++;
        this.setState({
            count:2
        },()=>{
            this.setState({
                count:4
            },state=>console.log(state,'试试啊'))
        })
        this.setState({
            count:3
        },console.log)
       
    }
    
    afterRender = () => {
        // this.state.count ++ 
        // this.setState({
        //     count:8
        // })
        // console.log(this.state,'after');
    }
}

MW.mount(new App(),document.getElementById('root'));