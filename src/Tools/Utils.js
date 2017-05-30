import React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect'
import Cookie from 'js-cookie';
export const hasToken = Cookie.get('token') || false;

export const MatchWithSubRoutes = (route) => (
  <Route path={route.path} render={(props) => {
    if (route.logged && !hasToken) {
      return (<Redirect to={{ pathname: '/login', state: { from: props.location }}}/>)
    }
    console.log('path', route)
    return <route.component {...props} routes={route.routes} routeKey={route.routeKey} />
  }} />
)