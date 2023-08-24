import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: { 
        setCredentials: (state, action) => {
            // console.log(action.payload)        //If this line is removed, the application will crash
            state.userInfo = action.payload; //SETTING THE STATE
            localStorage.setItem('userInfo', JSON.stringify(action.payload)); //SETTING THE LOCALSTORAGE
        },
        logout: (state, action) => {
            state.userInfo = null; //CLEARING THE STATE
            localStorage.removeItem('userInfo') //CLEARING THE LOCALSTORAGE
        }
    }
})
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;