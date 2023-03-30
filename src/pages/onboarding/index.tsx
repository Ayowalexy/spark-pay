import React from "react";
import { Text, View } from "../../components/custom/Themed";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Image } from "react-native";
import { OnboardImg } from "../../../assets/images/svgs/onboarding";
import { colors } from "../../utils/colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/stacks";

type OnboardingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Onboarding"
>;

 export type props = {
  navigation: OnboardingScreenNavigationProp;
};

export const Onboarding = ({ navigation }: props) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <OnboardImg />
        <View style={{ alignSelf: "flex-start", padding: 20 }}>
          <Text type="lg" style={styles.header}>
            Quick money recovery
          </Text>
          <Text style={{ paddingTop: 10, color: colors.light.black }}>
            Recover and lodge issue complain quickly and easily. Get access to
            analytics to monitor your account and uch more
          </Text>
          <View style={styles.flex}>
            <Text style={{ color: colors.light.black }}>Sign up</Text>
            <View style={styles.box_parent}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Login");
                }}
                style={styles.box}
              >
                <Ionicons
                  name="ios-arrow-forward-outline"
                  size={25}
                  color={colors.light.background}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    backgroundColor: colors.light.background,
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 70,
  },
  img: {
    width: 200,
    height: 200,
  },
  header: {
    fontSize: 30,
    paddingTop: 10,
  },
  box: {
    width: 60,
    height: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  box_parent: {
    width: 68,
    height: 68,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.primary,
    borderWidth: 1,
  },
});
