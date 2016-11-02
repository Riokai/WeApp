import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './module'

const enhancer = applyMiddleware(thunk)

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
