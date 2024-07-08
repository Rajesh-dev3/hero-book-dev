import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { sportList } from './services/sport/sportList'
import { matchList } from './services/sport/matchList'
import { login } from './services/auth/Login'
import { eventDetails } from './services/sport/eventDetail'
import { eventSession } from './services/fancy/Fancy'
import { accountStatement } from './services/accountStatement/accountStatement'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [sportList.reducerPath]: sportList.reducer,
    [matchList.reducerPath]: matchList.reducer,
    [login.reducerPath]: login.reducer,
    [eventDetails.reducerPath]: eventDetails.reducer,
    [eventSession.reducerPath]: eventSession.reducer,
    [accountStatement.reducerPath]: accountStatement.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
  .concat(sportList.middleware)
  .concat(matchList.middleware)
  .concat(login.middleware)
  .concat(eventDetails.middleware)
  .concat(eventSession.middleware)
  .concat(accountStatement.middleware)
  ,
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)