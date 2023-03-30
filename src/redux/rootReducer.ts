import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth";
import { transactionsReducer } from "./reducers/transactions";
import { disputesReducer } from "./reducers/disputes";

export const rootReducer = combineReducers({
  authReducer,
  transactionsReducer,
  disputesReducer
  
});
export type RootState = ReturnType<typeof rootReducer>;
