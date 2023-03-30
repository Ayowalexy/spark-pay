import { createSlice } from "@reduxjs/toolkit";
import { 
  getAllDisputes
 } from "./thunkAction";

interface IState {
  allDisputes: [];
  loading: "failed" | "pending" | "successful" | "idle",
}


const initialState: IState = {
  allDisputes: [],
  loading: "idle",
};

const disputesSlice = createSlice({
  name: "disputes",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(getAllDisputes.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getAllDisputes.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
        allDisputes: action.payload,
      };
    });
    builder.addCase(getAllDisputes.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });


  },
});
export const disputesReducer = disputesSlice.reducer;
