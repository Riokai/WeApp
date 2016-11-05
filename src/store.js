import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './module'

const logger = createLogger()

// const enhancer = applyMiddleware(thunk)
const enhancer = applyMiddleware(thunk, logger)

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
