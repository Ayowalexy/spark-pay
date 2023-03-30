import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { RootStacks } from "./stacks";

export const RootNavigation = () => (
  <NavigationContainer>
    <RootStacks />
  </NavigationContainer>
);
