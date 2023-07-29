import React from 'react' // 引入react

import {Route, Switch } from 'react-router-dom';

import Bundle from 'src/bundle.jsx';

/**
 * 加载模块的根业务组件
 */
import HomeContainer from 'bundle-loader?lazy!src/router/home/index';
import AboutContainer from 'bundle-loader?lazy!src/router/about/index';


/**
 * Bundle加载业务组件
 * @Author   WangBing
 * @DateTime 2017-11-24
 * @param    {[type]}   props [description]
 * @returns  {[type]}         [description]
 */
const RouterHome=(props)=>{
	return <Bundle load={HomeContainer}>
    	{(Container) => <Container {...props}/>}
  	</Bundle>
}

const RouterAbout=(props)=>{
	return <Bundle load={AboutContainer}>
    	{(Container) => <Container {...props}/>}
  	</Bundle>
}


/**
 * 按照正常路由配置、配置组件
 * @Author   WangBing
 * @DateTime 2017-11-24
 * @returns  {[type]}   [description]
 */
export default () => {
	return <Switch>
	        <Route exact path="/"  component={RouterHome}/>
	        <Route path="/home"  component={RouterHome} />
	        <Route path="/about"   component={RouterAbout} />
        </Switch>

}