import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { showMessage } from './notificationsSlice';

const initialState = {
    fetchedCurrenciesInBtc: [],
}

export const cryptoPriceDataSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    loadFetchedValues: (state, action) => {
        console.log('loadFetchedValues: ', action);
        state.fetchedCurrenciesInBtc = action.payload
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})


// Action creators are generated for each case reducer function
export const { loadFetchedValues, decrement, incrementByAmount } = cryptoPriceDataSlice.actions

export default cryptoPriceDataSlice.reducer


export const fetchLatestPrices = (callback) => {
    return async (dispatch) => {
        await fetch('https://bitpay.com/api/rates/BTC')
                .then(response => response.json())
                .then(data => {
                    dispatch(loadFetchedValues(data));
                    console.log('from fetchLatestPrices: ', data);
                    dispatch(showMessage("PRICES UPDATE"));
                } )
                .catch(error => console.log({error}));
    };
  };