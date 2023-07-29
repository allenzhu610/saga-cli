import util from 'src/common/util';
import {SAVE_CLICK,LOAD_LIST} from 'src/router/home/actions';


const initState={
    counter:0,
    articles:[]
}

export default function HomeReducer(state=initState,action){
    switch(action.type){
        case util.success(SAVE_CLICK):
            console.log(action)
             return Object.assign({},state,action.data);
        case util.success(LOAD_LIST):
            console.log(action)
             return Object.assign({},state,{articles:action.data});
        default :
            return state
    }
}