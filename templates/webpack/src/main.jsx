import 'babel-polyfill'

import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';

/**
 * 我封装的常用工具方法
 * 1 axios封装的fetch
 */
import wish from 'src/common/wish';

/**
 * 我封装的SagaCore模块
 * 1 创建Store
 * 2 创建Saga
 * 3 内置默认reducer信息
 */
import SagaCore from 'src/saga/core';

import AppContainer from './app';

/**
 * 接口url和action type的映射关系模块
 */
import urls from 'src/common/api/index';

/*import rootSaga from 'src/saga/index';
import Store from 'src/saga/store';
Store.run(rootSaga);*/


const reducer={
}

wish.bindUrls(urls);
wish.create();



//通过SagaCore模块直接生成Store
var Store=SagaCore.init(reducer,function(action={data:{}}){
	return wish.fetch({name:action.type,...action.data},action.method).then((res)=>res);
})




ReactDOM.render(<AppContainer store={Store}></AppContainer>, document.getElementById('test'));