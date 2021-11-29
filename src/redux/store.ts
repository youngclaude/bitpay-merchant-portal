import { configureStore } from '@reduxjs/toolkit'
import cryptoPriceDataReducer from './cryptoPriceDataSlice'
import notificationsReducer from './notificationsSlice'


export const store = configureStore({
    reducer: {
        notif: notificationsReducer,
        crypto: cryptoPriceDataReducer
    },
})