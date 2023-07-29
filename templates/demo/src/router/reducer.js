const initState={
    location:"上海",
    wether:{
        code:0,
        text:"晴"
    }
}

export default function AppReducer(state=initState,action){
    switch(action.type){
        case "TEST":
             return Object.assign({},state,action.data);
        default :
            return state
    }
}