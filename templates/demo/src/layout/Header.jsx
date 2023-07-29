import React from 'react';
import {Link } from 'react-router-dom';
import {Icon} from 'antd';

import 'src/layout/styles/layout.less';

export default class HeaderLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			currentPage:"home"
		}
	}
	render() {
		return (
			<div className="header-layout">
				<div className="logo">
					Saga-Cli
				</div>
				<div className="menu">
					<div className={"menu-item"+(this.state.currentPage=="home"?" select":"")}>
						<Link to="/" onClick={()=>{this.setState({currentPage:"home"})}}>Home</Link>
					</div>
					<div className={"menu-item"+(this.state.currentPage=="about"?" select":"")}>
						<Link to="/about"  onClick={()=>{this.setState({currentPage:"about"})}}>About</Link>
					</div>
				</div>
			</div>
		)
	}
}