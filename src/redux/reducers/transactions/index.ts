import { createSlice } from "@reduxjs/toolkit";
import { 
  getAllTransactions, 
  getTransactionRange,
  getAllIntitutions,
  editInstistution,
  updateStatus,
  getInstitutionByContact,
  editContact,
  deleteContact,
  createContact
 } from "./thunkAction";

import { 
  getInstitutionTypes,
  createInstistution
 } from "./thunkActions_2";

import { transgateMenuTypes } from "../../../utils/utils";
import { Institutions } from "../../../pages/institutions";

interface IState {
  allTransactions: [];
  loading: "failed" | "pending" | "successful" | "idle",
  isLoading: "failed" | "pending" | "successful" | "idle",
  isDeleting: "failed" | "pending" | "successful" | "idle",
  allInstitutions: [],
  allInstitutionContact: [],
  InstitutionTypes: []
}


const initialState: IState = {
  allTransactions: [],
  loading: "idle",
  isLoading:'idle',
  isDeleting: 'idle',
  allInstitutions: [],
  allInstitutionContact: [],
  InstitutionTypes: []
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(getAllTransactions.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getAllTransactions.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
        allTransactions: action.payload,
      };
    });
    builder.addCase(getAllTransactions.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    //transaction range
    builder.addCase(getTransactionRange.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getTransactionRange.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
        allTransactions: action.payload,
      };
    });
    builder.addCase(getTransactionRange.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     //get institutions
     builder.addCase(getAllIntitutions.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getAllIntitutions.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
        allInstitutions: action.payload,
      };
    });
    builder.addCase(getAllIntitutions.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     //edit institutions
     builder.addCase(editInstistution.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(editInstistution.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
      };
    });
    builder.addCase(editInstistution.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     //updatate institutions status
     builder.addCase(updateStatus.pending, (state) => {
      return { ...state, isLoading: "pending" };
    });
    builder.addCase(updateStatus.fulfilled, (state, action) => {

      return {
        ...state,
        isLoading: "successful",
      };
    });
    builder.addCase(updateStatus.rejected, (state, action) => {
      return { ...state, isLoading: "failed" };
    });

     //all institutions contact
     builder.addCase(getInstitutionByContact.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getInstitutionByContact.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
        allInstitutionContact: action.payload
      };
    });
    builder.addCase(getInstitutionByContact.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     //edit contact
     builder.addCase(editContact.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(editContact.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
      };
    });
    builder.addCase(editContact.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

     //delete contact
     builder.addCase(deleteContact.pending, (state) => {
      return { ...state, isDeleting: "pending" };
    });
    builder.addCase(deleteContact.fulfilled, (state, action) => {

      return {
        ...state,
        isDeleting: "successful",
      };
    });
    builder.addCase(deleteContact.rejected, (state, action) => {
      return { ...state, isDeleting: "failed" };
    });

    //create contact
    builder.addCase(createContact.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(createContact.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
      };
    });
    builder.addCase(createContact.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    //institution types
    builder.addCase(getInstitutionTypes.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(getInstitutionTypes.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
        InstitutionTypes: action.payload
      };
    });
    builder.addCase(getInstitutionTypes.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });

    //create institution
    builder.addCase(createInstistution.pending, (state) => {
      return { ...state, loading: "pending" };
    });
    builder.addCase(createInstistution.fulfilled, (state, action) => {

      return {
        ...state,
        loading: "successful",
      };
    });
    builder.addCase(createInstistution.rejected, (state, action) => {
      return { ...state, loading: "failed" };
    });


  },
});
export const transactionsReducer = transactionsSlice.reducer;
