import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { saveToken } from "../../../utils/use-axios";
import useAxios from "../../../utils/use-axios";
import { API_URL } from "../../../utils/config";


export const getAllDisputes = createAsyncThunk(
  "transactions/getAllDisputes",
  async (data: any, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/transactions/disputes/types/get`,
        method: "get",
      });
      return response.data.data
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const mss = error.response.data.message
        return thunkAPI.rejectWithValue(mss);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);
