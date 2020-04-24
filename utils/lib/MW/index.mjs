
import VDom from '../VDom.mjs';
import setAttr from '../setAttr.mjs';

class MW {
    constructor(){
    }
    el=null 


    VdomToDom = (vDom) => {
        //根据vDom类型创建dom
        const {type,props,children} = vDom;
        const el = document.createElement(type);

        //遍历props对象，给创建的el设置属性
        for(let i in props){
            setAttr(el,i,props[i]);
        }

        //遍历子节点数组
        Array.isArray(children) && children.forEach(child=>{
            //如果child也是vDom =>递归
            if(child instanceof VDom){
                child = this.VdomToDom(child);
            }else{
                //普通文本内容
                child = document.createTextNode(child);
            }
            //添加进父节点
            el.appendChild(child);
        })

        //返回dom对象; 
        return el;    
    }

    mount = (mc,el) => {
        setTimeout(()=>{
            this.el = el;
            if(!mc.MW_ResUI){
                return ;
            }
            const childNode = this.VdomToDom(mc.MW_ResUI)
            this.el.appendChild(childNode);
        })
    }
    ceateElement = (type,props,children) => {
        return new VDom(type,props,children);
    }


}



export default new MW();