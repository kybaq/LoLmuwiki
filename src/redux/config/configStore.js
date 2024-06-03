import { configureStore } from '@reduxjs/toolkit';
import postSlices from '../slices/postSlices';

const store = configureStore({
  reducer: {
    totalPosts: postSlices,
  },
});

export default store;
