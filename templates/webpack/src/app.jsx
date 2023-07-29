import 'antd/dist/antd.less';
import 'src/common/styles/app.less';

import React, {Component, PropTypes } from 'react';
import {Provider } from 'react-redux'; 
import {Link, HashRouter as Router } from 'react-router-dom';


class AppContainer extends Component {

    constructor(props){
        super(props);
    }

    shouldComponentUpdate() {
        return false
    }
    render() {
        const {store} = this.props;
        return (
            <Provider store={store}>
                <Router>
                    <div className="app-container">
                         
                    </div>
                </Router>
            </Provider>
        )
    }
}

export default AppContainer