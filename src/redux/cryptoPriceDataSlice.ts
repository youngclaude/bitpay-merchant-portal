import { createSlice, Dispatch } from '@reduxjs/toolkit';
import { fireNotif } from './notificationsSlice';

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
    }
  },
})


// Action creators are generated for each case reducer function
export const { loadFetchedValues } = cryptoPriceDataSlice.actions

export default cryptoPriceDataSlice.reducer


export const fetchLatestPrices = () => {
    return async (dispatch: Dispatch) => {
        await fetch('https://bitpay.com/api/rates/BTC')
                .then(response => response.json())
                .then(data => {
                    dispatch(loadFetchedValues(data));
                    console.log('from fetchLatestPrices: ', data);
                    dispatch(fireNotif("PRICES UPDATE"));
                } )
                .catch(error => console.log({error}));
    };
  };