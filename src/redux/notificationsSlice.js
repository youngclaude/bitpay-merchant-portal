import { createSlice } from '@reduxjs/toolkit'
import { ToastContainer, toast } from 'react-toastify';

const initialState = {
  message: '',
}

export const notificationSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    showMessage: (state, action) => {
    //   state.value += action.payload
        toast(action.payload);
    },
  },
})


// Action creators are generated for each case reducer function
export const { increment, decrement, showMessage } = notificationSlice.actions

export default notificationSlice.reducer