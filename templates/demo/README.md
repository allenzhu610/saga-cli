# saga-cli 默认模板项目

## 集成

	AntD
	React
	Redux
	React-Redux
	Redux-Saga
	axios
	React-Router V4

## 功能

+ +[x]	1 封装saga初始化函数、用于快速初始化saga
+ +[x]	2 封装了axios fetch请求,提供wish包
+ +[x]	3 Action Type 和异步接口名称知己映射
+ +[x]	4 集成React Router V4 按需加载、

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
        │  app.jsx						# 项目初始化
        │  bundle.jsx						# 按需加载组件
        │  main.jsx						# 项目入口
        │  template.html					# 自动生成页面的模板
        │  
        ├─common
        │  │  util.js					  # Redcer工具方法
        │  │  wish.js					  # 自用工具方法：fetch
        │  │  
        │  ├─api
        │  │      index.js				  # action type映射接口url
        │  │      
        │  └─styles
        │          app.less
        │          theme.less
        │          
        ├─layout
        │  │  Header.jsx				  # 布局组件（业务相关）
        │  │  RouteLayout.jsx			  # 根路由配置组件（业务相关）
        │  │  SilderLayout.jsx			  # 侧边栏组件（业务相关）
        │  │  
        │  └─styles
        │          layout.less
        │          
        ├─router						  # 由于这里按路由划分模块、所以使用router命名
        │  │  reducer.js				  # 模块公用的reducer
        │  │  
        │  ├─about
        │  │      index.jsx				  # about业务模块组件、没有实际业务
        │  │      
        │  └─home
        │      │  actions.jsx			  # home模块的actions配置
        │      │  index.jsx			  	  # home模块的主业务容器组件
        │      │  reducer.js			  # home模块的reducer定义
        │      │  
        │      ├─components				# home模块的所用到的组件
        │      │      ArticleCollect.jsx
        │      │      ArticleEdit.jsx
        │      │      ArticleList.jsx
        │      │      
        │      └─styles
        │              index.less
        │              
        └─saga
                core.js					  # saga核心包


## 说明

开发者只需要自定义`layout` 和 `router`即可

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

