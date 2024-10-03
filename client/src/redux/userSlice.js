import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({   
    name:'user',
    initialState :{
        name:'',
        email:'',
        isLoggedIn:false,
        isPremium:false,
    },
    reducers:{
        setLogin: (state, action) => {
            state.userDetails = action.payload
          },
          setLogout: (state, action) => {
            return  initialState
          },
    }

})

export const {loginUser, logOutUser} =userSlice.actions
export default userSlice.reducer