import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './module'
import { env } from './config/global'

const middlewares = [thunk]

if (env === 'dev') {
  const createLogger = require(`redux-logger`)
  const logger = createLogger()
  middlewares.push(logger)
}

const enhancer = applyMiddleware(...middlewares)

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('./module/index', () => {
      const nextRootReducer = require('./module/index')

      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
