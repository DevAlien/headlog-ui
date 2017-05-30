import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import {connect} from 'react-redux';
import Input from 'react-toolbox/lib/input/Input';
import Editor from '../Components/Editor/Editor';
import ToHTML from '../Components/Editor/toHtml';
import VisibilitySensor from 'react-visibility-sensor';

import ProgressiveImage from '../Components/General/ProgressiveImage';

class Post extends Component {

  constructor(props) {
    super(props);
    this.state = {
      state: false,
      title: ''
    }
  }

  onChangeState = (state) => {
    this.setState({state: state.state});
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
      <div>
        <ProgressiveImage pname="first" src='https://api.dripr.io/files/HkZV8GwbZ/get?w=780&q=100' placeholder='https://api.dripr.io/files/rknXqZDW-/get?w=20&h=12.51&b=1'>
        </ProgressiveImage>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />

        <ProgressiveImage pname="second" src='https://api.dripr.io/files/rknXqZDW-/get?w=1280&q=100' placeholder='https://api.dripr.io/files/rknXqZDW-/get?w=20&b=2'>
        </ProgressiveImage>
        
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    loginError: state.app.loginError || {},
    isFetching: state.app.fetching || false
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);