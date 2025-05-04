import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaymentState {
  status: 'paid' | 'pending'; 
}

const initialState: PaymentState = {
  status: 'pending', 
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentStatus: (state, action: PayloadAction<'paid' | 'pending'>) => {
      state.status = action.payload;
    },
  },
});

export const { setPaymentStatus } = paymentSlice.actions;
export default paymentSlice.reducer;
