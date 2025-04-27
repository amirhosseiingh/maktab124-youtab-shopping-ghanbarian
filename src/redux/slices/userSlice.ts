import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import fetchUser from '@/lib/api/userInfo';


interface User {
  name: string;
  email: string;
}

export const fetchUserData = createAsyncThunk(
  'user/fetchUserData',
  async (_, thunkAPI) => {
    try {
      const user = await fetchUser();
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue('Failed to fetch user');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null as User | null, 
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUserData.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
