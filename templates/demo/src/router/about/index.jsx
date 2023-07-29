import React from 'react';
import { connect } from 'react-redux';

import {SAVE_CLICK} from 'src/router/home/actions';

class AboutContainer extends React.Component {

    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{padding:40,textAlign:'center'}}>
               <h1>这是一个saga-cli 模板项目</h1>
            </div>
        )
    }
    load =()=>{
        const {dispatch} =this.props;
        dispatch({type:SAVE_CLICK,data:{counter:new Date().getTime()}});
    }

}

function mapStateToProps(state) {
    console.log("map state",state)
    return {
       ...state
    }
}

export default connect(mapStateToProps)(AboutContainer)