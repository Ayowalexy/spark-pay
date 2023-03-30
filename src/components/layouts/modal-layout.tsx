import React, { ReactNode, useState } from "react";
import {
  Modal,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Text, View } from "../custom/Themed";
import AntDesign from "@expo/vector-icons/AntDesign";
import { colors } from "../../utils/colors";

type props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  title?: string;
};

export const ModalLayout = ({
  visible,
  setVisible,
  children,
  title,
}: props) => {
  return (
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(!visible)}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.container}>
          <View style={styles.cont}>
            <View style={styles.flex}>
              <Text type="lg" style={{ fontSize: 20 }}>
                {title}
              </Text>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <AntDesign
                  color={colors.light.black}
                  name="closecircle"
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 50 }}>{children}</View>
          </View>
        </View>
      </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    height: Dimensions.get("window").height,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.light.black,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
    position: "absolute",
    padding: 20,
    zIndex: 10,
    backgroundColor: colors.light.background,
    width: "110%",
    borderRadius: 20,
  },
  flexer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  cont: {
    width: "95%",
    // height: "80%",
    backgroundColor: colors.light.background,
    borderRadius: 20,
    padding: 20,
  },
});
