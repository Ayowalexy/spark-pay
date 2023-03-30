import React from "react";
import { ActivityIndicator, Dimensions, Modal, StyleSheet } from "react-native";
import { colors } from "../../utils/colors";
import { View } from "./Themed";

export const Preloader = () => (
  <Modal
    visible={true}
    onRequestClose={() => null}
    animationType="fade"
    transparent={true}
  >
    <View
      style={{
        width: "100%",
        height: Dimensions.get("window").height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
    >
      <ActivityIndicator size="small" color="#fff" />
    </View>
  </Modal>
);
