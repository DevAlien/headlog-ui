import React, { Component } from 'react';
import Button from 'react-toolbox/lib/button/Button';
import {connect} from 'react-redux';
import Card from 'react-toolbox/lib/card/Card';
import CardActions from 'react-toolbox/lib/card/CardActions';
import CardTitle from 'react-toolbox/lib/card/CardTitle';
import CardText from 'react-toolbox/lib/card/CardText';
import Input from 'react-toolbox/lib/input/Input';

const style = {
  maxWidth: 400,
  margin: '50px auto'
};

class Login extends Component {

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
      <div>
        <div className="login-logo">
          <img src="/logo.png" />
        </div>
        <Card style={style}>
          <CardTitle
            title="Login"
            subtitle="Login With Your Credentials"
          />
          <CardText>
            <Input
              type='text'
              label='E-Mails' name='email'
              value={this.state.email}
              onChange={this.onChange.bind(this, 'email')}
            />
            <Input
              type='password'
              label='Password' name='password'
              value={this.state.password}
              onChange={this.onChange.bind(this, 'password')}
            />
          </CardText>
          <CardActions>
            <Button label='Login' raised primary onClick={this.makeLogin}/>
          </CardActions>
        </Card>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);