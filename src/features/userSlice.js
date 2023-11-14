import { combineReducers, createStore, createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null
  },
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    }
  },
 
});

export const {login, logout} = userSlice.actions;

export const selectUser = (state) => state.user.user;
// console.log(selectUser);
export default userSlice.reducer;

const reducer = combineReducers({
  user: userSlice.reducer
});

export const userReducer = createStore(reducer);