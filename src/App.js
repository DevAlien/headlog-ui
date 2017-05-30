import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {MatchWithSubRoutes} from './Tools/Utils';
// import config from './config';
// import Cookie from 'js-cookie';
import routes from './Routes';
import './App.css';
class App extends Component {

  static propTypes = {
    children: PropTypes.node,
    location: PropTypes.object
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div>
        {routes.map((route, i) => (
          <MatchWithSubRoutes key={i} {...route}/>
        ))}
      </div>
    );
  }
}

export default App;
