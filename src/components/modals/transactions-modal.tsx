import React, { ReactNode } from "react";
import { View, Text } from "../custom/Themed";
import { ModalLayout } from "../layouts/modal-layout";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native";

export type modalProps = {
  modal: {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    data: any;
  };
  children: ReactNode;
};

type props = modalProps["modal"];

export const TransactionsModal = ({ visible, setVisible, data }: props) => {
  return (
    <ModalLayout visible={visible} setVisible={setVisible} title="More details">
      <ScrollView
        style={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {Object.keys(data).map((element: any) => (
          <View key={element.id} style={styles.flex}>
            <Text type="lg" style={{ width: "50%" }}>
              {element}:
            </Text>
            <Text
              style={{
                fontSize: 12,
                width: "50%",
                alignSelf: "flex-end",
                textAlign: "right",
              }}
            >
              {data[element]}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  flex: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 15,
    width: "100%",
  },
});
