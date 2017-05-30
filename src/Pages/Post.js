import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import {connect} from 'react-redux';
import Input from 'react-toolbox/lib/input/Input';
import Editor from '../Components/Editor/Editor';
import ToHTML from '../Components/Editor/toHtml';

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
        <Input
          type='text'
          label='Post title'
          name='title'
          value={this.state.title}
          onChange={this.onChange.bind(this, 'title')}
        />
        <div className="editor-container">
          <Editor onChange={this.onChangeState}/>
        </div>
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