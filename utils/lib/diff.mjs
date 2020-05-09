
/**
 * 比对新旧vdom tree,然后调用更新dom的api;
 */

/**
 * @param oldVDom 
 *      旧的vdom tree
 * @param newVDom 
 *      新的vdom tree   
 */
// 1 自上到下自左到右基于key值遍历
export function diff_render(oldVDomT,newVDomT){

    console.log(oldVDomT,newVDomT,'diff');
    // 根节点比较
    for(let i in oldVDomT){
        if(i==='children'){
            // 这里比较children
        }else {
            if(i==='type'){
                // 比对不同类型的元素
                if(oldVDomT[i] !== newVDomT[i]){
                    //todo  拆卸原有的树，如果有树里有节点为组件实例，要执行该组件的componentWillMount
                    // todo  建立起新的节点树，如果有树里有节点为组件实例，基于newVdomT 转换dom，并挂载到组件的el下后，执行组件的componentDidMount    
                }else{
                    // 比对同一类型的树
                    //保留dom节点，比对 更新有改变的属性
                    
                }
            }
       
           


        }
    }   
}
// 2 如果有新增就直接新增 
function addNode(vDom){
    const {type,props,children} = vDom || {};
    return 

}
