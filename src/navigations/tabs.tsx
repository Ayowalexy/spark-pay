import React from "react";
import { Text, View } from "../components/custom/Themed";
import { TouchableOpacity } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView, StyleSheet } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

type props = {
  state: any;
  descriptors: any;
  navigation: any;
};

import { Account } from "../pages/accounts";
import { Cards } from "../pages/cards";
import { Users } from "../pages/users";
import { colors } from "../utils/colors";

function TabBar({ state, descriptors, navigation }: props) {
  return (
    <SafeAreaView>
      <View style={styles.tab}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.bar}
            >
              <Ionicons
                name={
                  label === "Account"
                    ? isFocused ? "home" : 'home-outline'
                    : label === "Cards"
                    ? isFocused ? "card" : 'card-outline'
                    : label === "Users"
                    ? isFocused ? "person" : 'person-outline'
                    : "home"
                }
                size={27}
                color={isFocused ? colors.primary : colors.light.black}
              />
              <Text
                style={{
                  color: isFocused ? colors.primary : colors.light.black,
                  fontSize: 13,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

export const RootTabs = () => (
  <Tab.Navigator
    screenOptions={{
      headerShown: false,
    }}
    tabBar={(props) => <TabBar {...props} />}
  >
    <Tab.Screen name="Account" component={Account} />
    <Tab.Screen name="Cards" component={Cards} />
    <Tab.Screen name="Users" component={Users} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  tab: {
    height: 70,
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 10,
  },
  bar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
