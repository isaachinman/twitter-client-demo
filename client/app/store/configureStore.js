import { createStore, applyMiddleware } from 'redux'
import { createBrowserHistory } from 'history'
import { persistStore } from 'redux-persist'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from '../reducers'

export const history = createBrowserHistory()
const router = routerMiddleware(history)
const enhancer = applyMiddleware(thunk, router)
export let persistor

export function configureStore(initialState) {

  const store = createStore(rootReducer, initialState, enhancer)
  persistor = persistStore(store)
  return { store, persistor }

}
