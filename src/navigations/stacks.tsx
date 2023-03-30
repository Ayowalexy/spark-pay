import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

//screens
import { Onboarding } from "../pages/onboarding";
import { Login } from "../pages/onboarding/sign-up";
import { RootTabs } from "./tabs";
import { Transactions } from "../pages/transactions";
import { Institutions } from "../pages/institutions";
import { InstitutionsContact } from "../pages/institutions-contact";
import { Disputes } from "../pages/disputes";
import { Settlements } from "../pages/settlements";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Tabs: undefined;
  Transactions: undefined;
  Institutions: undefined;
  InstitutionsContact: {
    name: string;
  };
  Disputes: undefined;
  Settlements: undefined
};

const Stack = createStackNavigator<RootStackParamList>();

export const RootStacks = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Onboarding" component={Onboarding} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Tabs" component={RootTabs} />
    <Stack.Screen name="Transactions" component={Transactions} />
    <Stack.Screen name="Institutions" component={Institutions} />
    <Stack.Screen name="InstitutionsContact" component={InstitutionsContact} />
    <Stack.Screen name="Disputes" component={Disputes} />
    <Stack.Screen name='Settlements' component={Settlements} />
  </Stack.Navigator>
);
