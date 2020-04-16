import cookieWorker from './utils/Cookie';
import eventStore from './utils/EventStore';





export const cookie = cookieWorker;
export const ES = eventStore;


export default {
    cookie,
    ES,
}
