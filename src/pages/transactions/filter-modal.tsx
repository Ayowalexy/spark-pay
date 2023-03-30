import React, { useState } from "react";
import { Text, View } from "../../components/custom/Themed";
import { ModalLayout } from "../../components/layouts/modal-layout";
import { ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../../utils/colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Button } from "../../components/custom/button";
import { Input } from "../../components/custom/Input";
import { Select } from "../../components/custom/select";

type props = {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const FilterModal = ({ visible, setVisible }: props) => {
  const status = [
    {
      value: "Approved or Completed Status",
      label: "Approved or Completed Status",
    },
  ];
  return (
    <ModalLayout visible={visible} setVisible={setVisible} title="Filter">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.flexer}>
            <Text style={{ color: colors.btn }}>Download Sample</Text>
            <Button extrastyles={styles.btn} onPress={() => null}>
              <Text style={{ color: "#fff", fontSize: 12 }}>
                UPLOAD SESSION IDS
              </Text>
            </Button>
          </View>

          <View style={{ marginTop: 10 }}>
            <Input label="Session ID" />
            <Select
              options={status}
              label="Transaction status"
              onChange={() => null}
            />
            <Select
              options={status}
              label="Beneficiary bank"
              onChange={() => null}
            />
            <Select
              options={status}
              label="Source bank"
              onChange={() => null}
            />
            <View style={styles.input_flex}>
              <View style={{ width: "48%" }}>
                <Input label="Min amount" />
              </View>
              <View style={{ width: "48%" }}>
                <Input label="Min amount" />
              </View>
            </View>
            <Input label="Source account name" />
            <Input label="Beneficiary account name" />
          </View>
        </View>
      </ScrollView>
    </ModalLayout>
  );
};

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: colors.light.black,
    borderBottomWidth: 0.5,
    paddingBottom: 15,
  },
  flexer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },
  btn: {
    width: 140,
  },
  input_flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
