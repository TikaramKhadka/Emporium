import { createSlice } from "@reduxjs/toolkit";

// Initial state for the user slice
const initialState = {
  userDetails: null,
};

// Create user slice
const userSlice = createSlice({
  name: "user",
  initialState, // Use the defined initial state
  reducers: {
    // Set login action
    setUser: (state, action) => {
      if (action.payload && typeof action.payload === "object") {
        state.userDetails = action.payload; // Store user details on login
      } else {
        console.error("Invalid payload for setUser action");
      }
    },
    // Set logout action
    removeUser: (state) => {
      state.userDetails = null; // Reset to initial state
    },
    // Update specific fields in userDetails (optional)
    updateUserField: (state, action) => {
      if (state.userDetails) {
        state.userDetails = {
          ...state.userDetails,
          ...action.payload, // Update only the fields passed in payload
        };
      }
    },
  },
});

// Export actions to be used in your components
export const { setUser, removeUser, updateUserField } = userSlice.actions;

// Export the reducer to be used in the store
export default userSlice.reducer;
