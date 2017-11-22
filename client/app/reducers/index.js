import { persistCombineReducers } from 'redux-persist'
import { routerReducer as router } from 'react-router-redux'
import storage from 'redux-persist/es/storage'
import twitter from './twitter'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = persistCombineReducers(persistConfig, {
  twitter,
  router,
})

export default rootReducer
