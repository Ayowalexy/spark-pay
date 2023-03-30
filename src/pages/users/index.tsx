import React from "react";
import { Text, View } from "../../components/custom/Themed";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import { colors } from "../../utils/colors";

export const Users = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Text>Users</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.light.background,
  },
});
