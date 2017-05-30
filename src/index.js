import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import App from './App';
import './index.css';

import '../assets/react-toolbox/theme.css'
import theme from '../assets/react-toolbox/theme'
import ThemeProvider from 'react-toolbox/lib/ThemeProvider';

import {Provider} from 'react-redux';
import configureStore from './Redux/configureStore';
import DevTools from './Redux/DevTools';
import ApiClient from './Tools/ApiClient';
import Router from 'react-router-dom/BrowserRouter';
import Cookie from 'js-cookie';

class ProviderWithRouter extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);

    this.store = configureStore({}, ApiClient(Cookie.get('token')), context.router);
  }

  render() {

    return (
      <Provider store={this.store}>
        {this.props.children}
      </Provider>
    );

  }

}

ReactDOM.render(
  (
    <Router>
      <ThemeProvider theme={theme}>
        <ProviderWithRouter>
          <div>
            <App />
            {process.env.NODE_ENV === 'development' && <DevTools />}
          </div>
        </ProviderWithRouter>
      </ThemeProvider>
    </Router>
  ),
  document.getElementById('root')
);
