
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
    // for(let i in oldVDomT){
    //     if(i!=='children'){
    //     }else {
    //         // 同层比较
    //         if(oldVDomT[i]!==newVDomT[i]){
    //             // toDo  

    //         }
    //     }
    // }   
}
// 2 如果有新增就直接新增 
function addNode(vDom){
    const {type,props,children} = vDom || {};
    return 

}
