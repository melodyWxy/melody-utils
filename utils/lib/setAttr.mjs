export default function setAttr(node,key,value){
    //根据key值做处理

    // 1 属性是value要看标签类型，input和textarea的value需要做区别
    if(key === 'value'){
        const tagName = node.tagName.toLowerCase();
        (tagName === 'input' || tagName==='textarea')?
            node.value = value  
            :
            node.setAttribute(key,value)

        return ;
    }

    // 2 如果是style，打到cssText里
    if(key === 'style'){
        node.style.cssText = value;
        return ;
    }

    // other 直接setAttribute
    node[key]=value;
    return ;
}
