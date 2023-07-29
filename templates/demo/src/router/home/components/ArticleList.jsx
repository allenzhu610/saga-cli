import React from 'react';
import { connect } from 'react-redux';

export default class ArticleList extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var {articles=[]}=this.props.home;
        return (
            <div className="article-list">
                {articles.map(item=>{
                    return <div className="article-item">
                                <div className="article-image">
                                    <img src={item.image} alt=""/>
                                </div>
                                <div className="article-title">
                                    <div>{item.title}</div>
                                    <div>{item.abstract}</div>
                                </div>
                            </div>
                })}

                
            </div>
        )
    }

    componentDidMount(){
        this.props.loadData();
    }

}

function mapStateToProps(state) {
    return {
       ...state
    }
}

//export default connect(mapStateToProps)(ArticleList)