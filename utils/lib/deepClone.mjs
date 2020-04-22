

// 深克隆obj
export function deepCloneObj(obj,resObj){
    const newObj = resObj?resObj:{}; 
    const type = typeof obj;
    if(type!=='object'){
        throw new Error('参数类型仅支持对象');
    }


    for(let i in obj){
        const itemType = typeof obj[i];
        if(itemType!=='object'){
            newObj[i] = obj[i];
        }else{
            newObj[i] = {};
            deepCloneObj(obj[i],newObj[i]);
        }
    }

    return newObj;

}

export default deepCloneObj