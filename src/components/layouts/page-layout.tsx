import React, { ReactNode } from "react";
import { ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { View, Text } from "../custom/Themed";

type props = {
  page: string;
  children: ReactNode;
};

export const Pagelayout = (props: props) => {
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Text style={{color: colors.light.background, fontSize: 16}} type="sm">{props.page}</Text>
      </View>
      <ScrollView>{props.children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});
