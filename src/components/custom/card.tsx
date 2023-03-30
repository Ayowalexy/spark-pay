import React from "react";
import { Text, View } from "./Themed";
import { StyleSheet } from "react-native";
import { DefaultTheme } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

import { colors } from "../../utils/colors";

type props = {
  name: string;
  id: string;
  setSelected: React.Dispatch<React.SetStateAction<object>>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: any;
  type?: string;
};

export const CardBox = (props: props) => {
  const data = props.data;
  return (
    <TouchableOpacity
      onPress={() => {
        // const item = {
        //   "SRC account number": data.srcAccountNumber,
        //   "SRC account name": data.srcAccountName,
        //   "SRC KYC Level": data.srcKycLevel,
        //   "SRC BVN": data.srcBvn,
        //   "SRC amount": data.srcAmount,
        //   "DEST account number": data.destAccountNumber,
        //   "DEST account name": data.destAccountName,
        //   "DEST KYC Level": data.destKycLevel,
        //   "DEST BVN": data.destBvn,
        //   "DEST amount": data.destAmount,
        //   Narration: data.narration,
        //   "Transaction date": new Date(
        //     data.transactiondate
        //   ).toLocaleDateString(),
        //   "SRC institution name": data.srcInstitutionName,
        //   "DEST institution name": data.destInstitutionName,
        // };
        props.setSelected(data);
        props.setShowModal(true);
      }}
      style={styles.flexer}
    >
      <View style={[styles.flex]}>
        <View style={styles.box}>
          <Text type="sm" style={{ fontSize: 20, textTransform: "uppercase" }}>
            {props.name.charAt(0)}
            {props.name.charAt(1)}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.light.background,
            marginLeft: 5,
          }}
        >
          <Text numberOfLines={1} type="lg">
            {props.name.length > 25
              ? props.name.slice(0, 25).concat("...")
              : props.name}
          </Text>
          <Text style={{ fontFamily: "PoppinsLight", fontSize: 12 }}>
            {props.id}
          </Text>
        </View>
      </View>
      {props.type !== "Disputes" && (
        <Text style={{ color: colors.primary }}>View</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  flexer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.light.background,
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 100,
    backgroundColor: DefaultTheme.colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  flex: {
    flexDirection: "row",
    alignItems: "center",
  },
});
