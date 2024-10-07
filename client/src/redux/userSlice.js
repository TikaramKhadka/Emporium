import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
    userDetails: null,
  };

// Create user slice
 const userSlice = createSlice({
  name: 'user',
  initialState,  // Use the defined initial state
  reducers: {
    // Set login action
    setUser: (state, action) => {
      state.userDetails = action.payload;  // Store user details on login
    },
    // Set logout action
    removeUser: (state) => {
      return initialState;  // Reset to initial state
    },
  }
});

// Export actions to be used in your components
export const { setUser, removeUser } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;