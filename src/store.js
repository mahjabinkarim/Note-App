import { configureStore } from '@reduxjs/toolkit';
import userslice from './slice/userslice';

const store = configureStore({
  reducer: {
    userData: userslice, 
  },
});

export default store;
