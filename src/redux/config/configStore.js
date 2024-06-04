import { configureStore } from '@reduxjs/toolkit';
import postSlices from '../slices/postSlices';
import authSlice from '../slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    totalPosts: postSlices,
  },
});

export default store;