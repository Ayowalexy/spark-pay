import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { saveToken } from "../../../utils/use-axios";
import useAxios from "../../../utils/use-axios";
import { API_URL } from "../../../utils/config";




export const getInstitutionTypes = createAsyncThunk(
    "transactions/getInstitutionTypes",
    async (data: any, thunkAPI) => {
      console.log(data)
      try {
        const response = await useAxios({
          url: `${API_URL}/financial-institutions/types`,
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
  

  export const createInstistution = createAsyncThunk(
    "transactions/createInstistution",
    async (data: any, thunkAPI) => {
      console.log(data)
      try {
        const response = await useAxios({
          url: `${API_URL}/financial-institutions`,
          method: "put",
          data: data
        });
        return response.data.data
      } catch (error) {
        console.log(error.response)
        if (axios.isAxiosError(error) && error.response) {
          const mss = error.response.data.message
          return thunkAPI.rejectWithValue(mss);
        } else {
          return thunkAPI.rejectWithValue(String(error));
        }
      }
    }
  );