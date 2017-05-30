import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import {connect} from 'react-redux';
import {MatchWithSubRoutes} from '../Tools/Utils';
import { Row, Col, ScreenClassRender } from 'react-grid-system';
import Header from '../Components/General/Header.js';
import SidebarMenu from '../Components/General/SidebarMenu.js';

class Main extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
    console.log('dio mio')
  }

  makeLogin = () => {
    this.props.dispatch({
      type: 'LOGIN_FETCH',
      data: this.state
    });
  };

  onChange = (type, text) => {
    this.setState({[type]: text});
  };

  render() {
    return (
      <div className="App">
        <Header />
        <div>
          <Col
            key="navbar"
            sm={4}
            md={3}
            lg={2}
            xl={2}
            className="sidebar"
          >
            <SidebarMenu />
          </Col>
          <Col
            key="mainPage"
            className="mainPage"
            sm={8}
            md={9}
            lg={10}
            xl={10}
            style={{height: 'calc(100vh - 64px)', overflow: 'auto'}}
          >
            {this.props.routes && this.props.routes.map((route, i) => (
              <MatchWithSubRoutes key={i} {...route}/>
            ))}
          </Col>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loaded: state.app.loaded,
    user: state.app.user,
    account: state.app.account,
    snackbar: state.snackbar
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main);