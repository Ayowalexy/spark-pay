import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import { Text } from "./Themed";
import { colors } from "../../utils/colors";

export type optionProps = {
  label: string;
  value: string;
};

type selectProps = {
  label: string;
  options: optionProps[];
  search?: boolean;
  onChange: (e: optionProps) => void;
  err?: boolean;
  errMsg?: string;
  valid?: boolean;
  extraStyles?: StyleProp<ViewStyle>;
  placeholder?: string;
};

export const Select = ({
  label,
  options,
  search = false,
  onChange,
  err,
  errMsg,
  valid = true,
  extraStyles,
  placeholder,
}: selectProps) => {
  const [value, setValue] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={[{ width: "100%", marginBottom: 20 }, extraStyles]}>
      {label && (
        <Text type="lg" style={styles.label_tag}>
          {label}
        </Text>
      )}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: colors.primary }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={options}
        maxHeight={300}
        search={search}
        labelField="label"
        valueField="value"
        placeholder={
          !isFocus ? (placeholder ? placeholder : "Select item") : "..."
        }
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          onChange(item);
          setValue(item.value);
          setIsFocus(false);
        }}
      />
      {err && (
        <Text type="sm" style={{ color: "red", fontSize: 12 }}>
          {errMsg}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 16,
  },
  dropdown: {
    height: 55,
    // borderWidth: 0.5,
    borderWidth: 1,
    borderColor: '#D9D7DE',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: colors.light.bg_input,
    // marginBottom: 20
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    paddingLeft: 10,
    color: colors.subText,
  },
  selectedTextStyle: {
    fontSize: 14,
    fontFamily: "PoppinsRegular",
    paddingLeft: 20,
    color: colors.subText,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  label_tag: {
    color: colors.primary,
    fontSize: 12,
    paddingBottom: 5,
    },
});
