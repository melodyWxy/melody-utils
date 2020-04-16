
class EventStore {
    eventList = []; 
    on = (key,callback) => {
        const findItem = this.eventList.find(item=>item.key===key);
        findItem? 
            findItem.callbackList.push(callback)
            : 
            this.eventList.push({
                key,
                callbackList: [callback]
            })
    }
    emit = (key,args)=>{
        const findItem = this.eventList.find(item=>item.key===key);
        findItem&&findItem.callbackList.forEach(item=>item(args));
    }
}


// 全局仅可拥有一个实例;
export default new EventStore();  