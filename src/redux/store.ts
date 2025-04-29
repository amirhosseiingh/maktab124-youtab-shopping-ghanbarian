import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './slices/cartSlice';
import shipmentReducer from './slices/shipmentSlice';
import userReducer from './slices/userSlice'; 

const combinedReducers = combineReducers({
  cart: cartReducer,
  shipment: shipmentReducer,
  user: userReducer, 
});

const persistConfig = {
  key: 'youtab-shop',
  storage,
  whitelist: ['cart', 'shipment', 'user'],
};

const persistedReducers = persistReducer(persistConfig, combinedReducers);

const store = configureStore({
  reducer: persistedReducers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistStoreInstance = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
