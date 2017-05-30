import { createStore, applyMiddleware, compose } from 'redux';
//import thunk from 'redux-thunk';
import rootReducer from './reducers';
import DevTools from './DevTools';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(preloadedState, api, router) {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(sagaMiddleware, createLogger()),
      DevTools.instrument()
    )
  );

  sagaMiddleware.run(rootSaga, api, router);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    });
  }

  return store;
}
