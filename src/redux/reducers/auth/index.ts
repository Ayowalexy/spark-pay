import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./thunkAction";
import { transgateMenuTypes } from "../../../utils/utils";

interface IState {
  data: object;
  loading: "failed" | "pending" | "successful" | "idle",
  transgateMenu: [],
  sparkpayMenu: []
}


const initialState: IState = {
  data: {},
  loading: "idle",
  sparkpayMenu: [],
  transgateMenu: []
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      const sparkpayMenu = action.payload.sparkpayMenu;
      const transgateMenu = action.payload.transgateMenu
      return { 
          ...state, 
          loading: "successful", 
          sparkpayMenu, 
          transgateMenu, 
          data: action.payload 
      };
    });
    builder.addCase(signIn.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });


  },
});
export const authReducer = authSlice.reducer;
