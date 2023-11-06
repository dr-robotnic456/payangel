import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  user: {},
  userProfile: {},
  token: "",
  tokenExpiration: null,
 
};

const userSlice = createSlice({
  name: "USER",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
      state.tokenExpiration = action.payload;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.token = null;
      state.tokenExpiration = null;
      state.isLoggedIn = false;
    },
  
  },
});

export const { setUser, setToken, logoutUser, setUserProfile, } =
  userSlice.actions;
export default userSlice.reducer;
