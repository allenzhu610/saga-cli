import React from 'react';
import { connect } from 'react-redux';
import {Route, Switch } from 'react-router-dom';

import 'src/router/home/styles/index.less';

import SilderLayout from "src/layout/SilderLayout.jsx";

import {SAVE_CLICK,LOAD_LIST} from 'src/router/home/actions';

import ArticleList from 'src/router/home/components/ArticleList';
import ArticleEdit from 'src/router/home/components/ArticleEdit';
import ArticleCollect from 'src/router/home/components/ArticleCollect';

class HomeComp extends React.Component {
    constructor(props) {
        super(props);
    }
    render(){
      var {title,time,content,author}=this.props.home;
      return (
                <div>
                  <button onClick={this.load}>HelloSaga</button>
                 <div>
                     <h2>{title}</h2>
                     <span>{time}</span>
                     <p>{content}</p>
                 </div>
                </div>
        )
    }

    load =()=>{
        const {dispatch} =this.props;
        dispatch({type:SAVE_CLICK,data:{counter:new Date().getTime()}});
    }
}


class HomeContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="home-container">
              <div className="silder">
                <SilderLayout></SilderLayout>
              </div>
              <div className="content">
                  <Route exact path='/' render={this.renderArticle}/>
                  <Route exact path='/home' render={this.renderArticle}/>
                  <Route exact path='/home/list' render={this.renderArticle}/>
                  <Route exact path='/home/edit' component={ArticleEdit}/>
                  <Route exact path='/home/collect' component={ArticleCollect}/>
              </div>
            </div>
        )
    }

    renderArticle=(props)=>{
        return <ArticleList loadData={this.loadArticle} {...props} {...this.props}/>
    }

    loadArticle=()=>{
        const {dispatch} =this.props;

        var params={
            "url": "http://www.jianshu.com",
            "area": ".note-list",
            "tag": ".have-img",
            "attr": [
              {
                "child": "img",
                "attr": "src",
                "name": "image"
              },
              {
                "child": ".title",
                "attr": "text",
                "name": "title"
              },
              {
                "child": ".title",
                "attr": "href",
                "name": "link"
              },
              {
                "child": ".abstract",
                "attr": "text",
                "name": "abstract"
              }
            ]
          }

        dispatch({type:LOAD_LIST,data:{
          body:params
        },method:"POST"});
    }

}

function mapStateToProps(state) {
    return {
       ...state
    }
}

export default connect(mapStateToProps)(HomeContainer)