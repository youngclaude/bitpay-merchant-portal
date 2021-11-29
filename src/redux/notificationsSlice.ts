import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

interface NotifMessage { 
  message: string
}

const initialState: NotifMessage = {
  message: '',
}

export const notificationSlice = createSlice({
  name: 'notif',
  initialState,
  reducers: {
    fireNotif: (state, action: PayloadAction<string>) => {
        state.message = action.payload
        toast(state.message);
    },
  },
})


// Action creators are generated for each case reducer function
export const { fireNotif } = notificationSlice.actions

export default notificationSlice.reducer