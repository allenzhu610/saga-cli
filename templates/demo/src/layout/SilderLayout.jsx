import React from 'react';
import {Link } from 'react-router-dom';

import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;

import 'src/layout/styles/layout.less';

export default class SilderLayout extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			collapsed:false
		}
	}
	render() {
		return (
			<div className="silder-layout">
				<Menu
		          defaultSelectedKeys={['1']}
		          defaultOpenKeys={['sub1']}
		          mode="inline"
		          theme="dark"
		          inlineCollapsed={this.state.collapsed}
		        >
		          <Menu.Item key="1">
		            <Link to="/home/list" className="app-link">
		            	<Icon type="pie-chart" />
		            	我的文章
		            </Link>
		          </Menu.Item>
		          <Menu.Item key="2">
		          	<Link to="/home/edit" className="app-link">
		            	<Icon type="pie-chart" />
		            	写文章
		            </Link>
		          </Menu.Item>
		          <Menu.Item key="3">
		          	<Link to="/home/collect" className="app-link">
		            	<Icon type="pie-chart" />
		            	采集文章
		            </Link>
		          </Menu.Item>
		        </Menu>
			</div>
		)
	}
}