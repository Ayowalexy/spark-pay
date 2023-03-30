import React, { ReactNode } from "react";
import { Dimensions, Modal, StyleSheet } from "react-native";
import { View } from "../custom/Themed";

type props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

export const ModalLayout = ({ children, visible, setVisible }: props) => (
  <Modal
    visible={visible}
    onRequestClose={() => setVisible(!visible)}
    animationType="slide"
    transparent={true}
  >
    <View style={styles.container}>{children}</View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: Dimensions.get("window").height,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
