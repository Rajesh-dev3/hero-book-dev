import { configureStore } from '@reduxjs/toolkit'
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query'
import { sportList } from './services/sport/sportList'
import { matchList } from './services/sport/matchList'
import { login } from './services/auth/Login'
import { eventDetails } from './services/sport/eventDetail'
import { eventSession } from './services/fancy/Fancy'
import { accountStatement } from './services/accountStatement/accountStatement'
import { casinoResult } from './services/casinoResult/casinoResult'
import {activityLog } from './services/activityLog/activityLog'
import { casino } from './services/casino/casino'
import { myBet } from './services/myBet/myBet'
import { changePassword } from './services/changePassword/ChangePassword'
import { walletBalance } from './services/walletBalance/WalletBalance'
import { betPlace } from './services/betPlace/BetPlace'
import { stakeUpdate } from './services/stakeUpdate/stakeUpdate'
import { betList } from './services/betList/BetList'
import { scoreBoard } from './services/scoreBoard/scoreBoard'
import { inPlayEvent } from './services/sport/inPlayEvent'
import { telegramOtpVerification } from './services/otpVerifiaction.js/OtpVerification'
import { saveTelegramDisableCode } from './services/otpVerifiaction.js/SaveTelegramDisable'

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [sportList.reducerPath]: sportList.reducer,
    [matchList.reducerPath]: matchList.reducer,
    [login.reducerPath]: login.reducer,
    [eventDetails.reducerPath]: eventDetails.reducer,
    [eventSession.reducerPath]: eventSession.reducer,
    [accountStatement.reducerPath]: accountStatement.reducer,
    [casinoResult.reducerPath]: casinoResult.reducer,
    [activityLog.reducerPath]: activityLog.reducer,
    [casino.reducerPath]: casino.reducer,
    [myBet.reducerPath]: myBet.reducer,
    [changePassword.reducerPath]: changePassword.reducer,
    [walletBalance.reducerPath]: walletBalance.reducer,
    [betPlace.reducerPath]: betPlace.reducer,
    [stakeUpdate.reducerPath]: stakeUpdate.reducer,
    [betList.reducerPath]: betList.reducer,
    [scoreBoard.reducerPath]: scoreBoard.reducer,
    [inPlayEvent.reducerPath]: inPlayEvent.reducer,
    [telegramOtpVerification.reducerPath]: telegramOtpVerification.reducer,
    [saveTelegramDisableCode.reducerPath]: saveTelegramDisableCode.reducer,
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
  .concat(casinoResult.middleware)
  .concat(activityLog.middleware)
  .concat(casino.middleware)
  .concat(myBet.middleware)
  .concat(changePassword.middleware)
  .concat(walletBalance.middleware)
  .concat(betPlace.middleware)
  .concat(stakeUpdate.middleware)
  .concat(betList.middleware)
  .concat(scoreBoard.middleware)
  .concat(inPlayEvent.middleware)
  .concat(telegramOtpVerification.middleware)
  .concat(saveTelegramDisableCode.middleware)
  ,
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)