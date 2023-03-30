import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Toast from 'react-native-toast-message';
import { saveToken } from "../../../utils/use-axios";
import useAxios from "../../../utils/use-axios";
import { API_URL } from "../../../utils/config";

export const getAllTransactions = createAsyncThunk(
  "transactions/getAllTransactions",
  async (data: any, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `${API_URL}api/transactions`,
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


export const getTransactionRange = createAsyncThunk(
  "transactions/getTransactionRange",
  async (data: object, thunkAPI) => {
    console.log(data);
    try {
      const response = await useAxios({
        url: `http://68.169.57.98:83/sparkpay/api/transactions-by-date/q/search`,
        method: "post",
        data: data
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


export const getAllIntitutions = createAsyncThunk(
  "transactions/getAllIntitutions",
  async (data: any, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/financial-institutions`,
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



export const editInstistution = createAsyncThunk(
  "transactions/editInstistution",
  async (data: any, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/financial-institutions`,
        method: "post",
        data: data
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


export const updateStatus = createAsyncThunk(
  "transactions/updateStatus",
  async (data: any, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/financial-institutions/${data.code}/${data.email}`,
        method: "delete",
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



export const getInstitutionByContact = createAsyncThunk(
  "transactions/getInstitutionByContact",
  async (data: any, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${API_URL}/financial-institutions/contacts/institution/${data}`,
        method: "get",
      });

      console.log(response.data)
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


export const editContact = createAsyncThunk(
  "transactions/editContact",
  async (data: any, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/financial-institutions/contacts`,
        method: "post",
        data: data
      });
      console.log('edited')
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


export const deleteContact = createAsyncThunk(
  "transactions/deleteContact",
  async (data: any, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/financial-institutions/contacts/${data.id}/${data.email}`,
        method: "delete",
      });
      console.log('deleted')
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


export const createContact = createAsyncThunk(
  "transactions/createContact",
  async (data: any, thunkAPI) => {
    console.log(data)
    try {
      const response = await useAxios({
        url: `${API_URL}/financial-institutions/contacts`,
        method: "put",
        data: data
      });
      console.log('deleted')
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
