import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  email: '',
  created_at: '',
  full_name: '',
  avatar_url: '',
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      return {
        id: action.payload.id,
        email: action.payload.email,
        created_at: action.payload.created_at,
        full_name: action.payload.identity_data.full_name,
        avatar_url: action.payload.identity_data.avatar_url,
        isAuthenticated: true,
      };
    },
    logout: () => {
      return {
        id: '',
        email: '',
        created_at: '',
        full_name: '',
        avatar_url: '',
        isAuthenticated: false,
      };
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
