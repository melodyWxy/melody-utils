export default class VDom {
    constructor(type,props,key){
        if(key && typeof key !== 'string' && typeof key !== 'number'){
            console.error(new Error(`key must be string or number`));
        }
        this.props = props;
        this.type = type;
        this.key = key;
    }

}


export class MWNode {
    constructor(type,props,key){
        this.props = props;
        this.type = type;
        this.key = key || null;
    }
}