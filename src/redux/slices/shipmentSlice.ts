// src/redux/slices/shipmentSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ShipmentState {
  address: string;
  city: string;
  postalCode: string;
  deliveryDate: string;
  deliveryTime: string;
  shippingMethod: string;
  finalPrice: number;
}

const initialState: ShipmentState = {
  address: '',
  city: '',
  postalCode: '',
  deliveryDate: '',
  deliveryTime: '',
  shippingMethod: 'standard',
  finalPrice: 0,
};

const shipmentSlice = createSlice({
  name: 'shipment',
  initialState,
  reducers: {
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setPostalCode: (state, action: PayloadAction<string>) => {
      state.postalCode = action.payload;
    },
    setDeliveryDate: (state, action: PayloadAction<string>) => {
      state.deliveryDate = action.payload;
    },
    setDeliveryTime: (state, action: PayloadAction<string>) => {
      state.deliveryTime = action.payload;
    },
    setShippingMethod: (state, action: PayloadAction<string>) => {
      state.shippingMethod = action.payload;
    },
    setFinalPrice: (state, action: PayloadAction<number>) => {
      state.finalPrice = action.payload;
    },
    clearShipment: state => {
      state.address = '';
      state.city = '';
      state.postalCode = '';
      state.deliveryDate = '';
      state.deliveryTime = '';
      state.shippingMethod = 'standard';
      state.finalPrice = 0;
    },
  },
});

export const {
  setAddress,
  setCity,
  setPostalCode,
  setDeliveryDate,
  setDeliveryTime,
  setShippingMethod,
  setFinalPrice,
  clearShipment,
} = shipmentSlice.actions;

export default shipmentSlice.reducer;
