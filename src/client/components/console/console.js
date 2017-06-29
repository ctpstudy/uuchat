import React, {Component} from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

import { Layout, Menu, Icon, message } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import Dashboard from './dashboard';
import Operators from './operators';
import UpgradeNote from './upgradeNote';
import Transcripts from './transcripts';
import Rates from './rates';
import RateList from './rateList';
import RateDetails from './rateDetails';

class Console extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
        current: "dashboard",
        csid: localStorage['uuchat.csid'] || '',
        name: localStorage['uuchat.name'] || '',
        displayName: localStorage['uuchat.displayName'] || '',
        avatar: localStorage['uuchat.avatar'] || '',
    };

    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            mode: collapsed ? 'vertical' : 'inline',
        });
    };

    handleClick = (e) => {
        this.setState({
            current: e.key,
        });
        window.location.href = "#/" + e.key;
    };

    handleHeaderClick = (e) => {
        switch (e.key) {
            case "logout":
                this.logout();
                break;
            default:
        }
    };

    logout() {
        fetch('/logout', {method: 'POST', headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
            .then((res)=>res.json())
            .then(function (d) {
                if (200 === d.code) {
                    window.location.href = '/console';
                }
            })
            .catch(function (e) {
                message.error(e.message, 4);
            });
    }

    render() {

        let { collapsed, mode, current, name, avatar } = this.state;

        let userTitle = (<span style={{margin:'10px'}}>
            <img className="user-avatar"
                 src={ (avatar !=='null' && avatar) ? '/' + avatar : require('../../static/images/contact.png')}
                 alt="avatar"
                 title="avatar"/>
            <a>{ name }</a>
        </span>);

        return (
            <div>
                <UpgradeNote />
                <Layout>
                    <Sider
                        breakpoint="lg"
                        collapsible
                        collapsed={ collapsed }
                        onCollapse={ this.onCollapse }
                        >
                        <div className="logo"/>
                        <Menu
                            theme="dark"
                            onClick={this.handleClick}
                            mode={ mode }
                            defaultOpenKeys={["dashboard"]}
                            selectedKeys={ [current] }
                            >
                            <Menu.Item key="dashboard">
                              <span>
                                <Icon type="laptop"/>
                                <span className="nav-text">Dashboard</span>
                              </span>
                            </Menu.Item>
                            <Menu.Item key="operators">
                              <span>
                                <Icon type="user"/>
                                <span className="nav-text">Operators</span>
                              </span>
                            </Menu.Item>
                            <Menu.Item key="transcripts">
                              <span>
                                <Icon type="database"/>
                                <span className="nav-text">Transcripts</span>
                              </span>
                            </Menu.Item>
                            <Menu.Item key="rates">
                              <span>
                                <Icon type="star-o"/>
                                <span className="nav-text">Rate Report</span>
                              </span>
                            </Menu.Item>
                            <Menu.Item key="rateList">
                              <span>
                                <Icon type="star-o"/>
                                <span className="nav-text">Rate List</span>
                              </span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{ background: '#fff', padding: 0, height: '47px' }}>
                            <div className="rightWarpper">
                                <Menu mode="horizontal" onClick={this.handleHeaderClick}>
                                    <SubMenu style={{ float: 'right' }} title={ userTitle }>
                                        <Menu.Item key="logout">
                                            Sign out
                                        </Menu.Item>
                                    </SubMenu>
                                </Menu>
                            </div>
                        </Header>
                        <Content style={{ margin: '0 16px' }}>
                            <Router>
                                <div style={{ height: '100%'}}>
                                    <Switch>
                                        <Route exact path="/" component={ Dashboard }/>
                                        <Route exact path="/dashboard" component={ Dashboard }/>
                                        <Route exact path="/operators" component={ Operators }/>
                                        <Route exact path="/transcripts" component={ Transcripts }/>
                                        <Route exact path="/rates" component={ Rates }/>
                                        <Route exact path="/rateList" component={ RateList }/>
                                        <Route exact path="/rates/:csid" component={ RateDetails }/>
                                    </Switch>
                                </div>
                            </Router>
                        </Content>

                        <Footer style={{ textAlign: 'center' }}>
                            uuchat ©2017 Built with ♥ in shenzhen.
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default Console;