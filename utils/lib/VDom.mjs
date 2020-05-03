export default class VDom {
    constructor(type,props,children,key){
        this.props = props;
        this.type = type;
        children&&(this.children = children);
        this.key = key;
    }

}


export class MWNode {
    constructor(type,props,children,key){
        this.props = props;
        this.type = type;
        children&&(this.children = children);
        this.key = key;
    }
}