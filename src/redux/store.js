import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './counterSlice'
import cryptoPriceDataReducer from './cryptoPriceDataSlice'
import notificationsReducer from './notificationsSlice'


export const store = configureStore({
    reducer: {
        counter: counterReducer,
        notif: notificationsReducer,
        crypto: cryptoPriceDataReducer
    },
})