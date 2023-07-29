## saga-cli


版本:`1.0.6`

用于快速创建React Saga项目

### Install

	npm install -g saga-cli

### start

直接开始:初始化一个纯净的项目(只有核心代码、推荐大神使用)

	saga-cli init TestProject

或者

(`推荐`) 初始化一个带默认示例的业务项目(saga、router、bundle都集成了)


    saga-cli demo TestProject

或者查看帮助

	saga-cli --help

Example


      随便进入到一个目录:
        $ saga-cli init SagaTest
      执行完成后:
        $ cd SagaTest
        $ npm install
      启动项目:
        $ npm run dev      //开发环境
      或者:
        $ npm run build    //用于生产环境代码打包


# saga-cli 默认模板项目

#### 项目集成

	//webpack
	npm install --save-dev webpack
	npm install --save-dev webpack-dev-server

	//react 
	npm install --save react react-dom
	//router v4版本
	npm install --save react-router react-router-dom
	//redux
	npm install --save redux react-redux redux-saga

	//babel
	npm install --save-dev babel-core babel-loader babel-preset-react babel-preset-es2015 babel-preset-stage-0 babel-preset-stage-3


## 项目结构

    project
    │  .babelrc
    │  .gitignore
    │  package.json
    │  README.md
    │  test.txt
    │  webpack.config.js
    │  
    └─src
        │  app.jsx							# 项目初始化
        │  main.jsx							# 项目入口
        │  template.html					# 自动生成页面的模板
        │  
        ├─common
        │  │  util.js					  	# Redcer工具方法
        │  │  wish.js					  	# 自用工具方法：fetch
        │  │  
        │  ├─api
        │  │      index.js				  	# action type映射接口url
        │  │      
        │  └─styles
        │          app.less
        │          theme.less
        │          
        ├─layout
        │  │  Header.jsx				  	# 布局组件（业务相关）
        │  │  RouteLayout.jsx			  	# 根路由配置组件（业务相关）
        │  │  SilderLayout.jsx			  	# 侧边栏组件（业务相关）
        │  │  
        │  └─styles
        │          layout.less
        │          
        ├─router						  	# 由于这里按路由划分模块、所以使用router命名
        │  │  reducer.js				  	# 模块公用的reducer
        │  │  
        │  ├─about
        │  │      index.jsx				  	# about业务模块组件、没有实际业务
        │  │      
        │  └─home
        │      │  actions.jsx			  	# home模块的actions配置
        │      │  index.jsx			  	  	# home模块的主业务容器组件
        │      │  reducer.js			  	# home模块的reducer定义
        │      │  
        │      ├─components					# home模块的所用到的组件
        │      │      ArticleCollect.jsx
        │      │      ArticleEdit.jsx
        │      │      ArticleList.jsx
        │      │      
        │      └─styles
        │              index.less
        │              
        └─saga
                core.js					  	# saga核心包


## 说明

部分代码说明

### 初始化saga

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

    /**
     * 接口url和action type的映射关系模块
     */
    import urls from 'src/common/api/index';

    /**
     * 所有模块的reducer
     */
    import AppReducer from 'src/router/reducer';
    import HomeReducer from 'src/router/home/reducer';

    const reducer={
    	app:AppReducer,
    	home:HomeReducer
    }

    wish.bindUrls(urls);
    wish.create();

    //通过SagaCore模块直接生成Store
    var Store=SagaCore.init(reducer,function(action={data:{}}){
    	return wish.fetch({name:action.type,...action.data},action.method).then((res)=>res);
    })

### 新增reducer

在main.jsx中直接引入，如：

	import AppReducer from 'src/router/reducer';
	import HomeReducer from 'src/router/home/reducer';
	
	+import UserReducer from '...'

	const reducer={
		app:AppReducer,
		home:HomeReducer,
	+	user:UserReducer
	}


### 按需加载

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

	
	

