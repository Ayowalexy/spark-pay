import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { saveToken } from "../../../utils/use-axios";
import useAxios from "../../../utils/use-axios";
import { API_URL } from "../../../utils/config";

export const signIn = createAsyncThunk(
  "auth/login",
  async (data: any, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `${API_URL}/users/login`,
        method: "post",
        data: data,
      });

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Welcome back, continue to your dashboard'
      });
     
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        console.log("error.response", error.response)
        const mss = error.response.data.message
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: mss
        });
        return thunkAPI.rejectWithValue(mss);
      } else {
        return thunkAPI.rejectWithValue(String(error));
      }
    }
  }
);
