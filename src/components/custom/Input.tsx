import React, { useState, ReactNode } from "react";
import {
  TextInput,
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  ViewStyle,
  StyleProp,
} from "react-native";
import { colors } from "../../utils/colors";
import { Text, View } from "./Themed";

interface inputProps {
  RightIcon?: ReactNode;
  LeftIcon?: ReactNode;
  valid?: boolean;
  hasLeftIcon?: boolean;
  hasRightIcon?: boolean;
  otherProps?: TextInputProps;
  onChange?: (e: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  extrastyles?: StyleProp<ViewStyle>;
  err?: boolean;
  errMsg?: string;
  label: string;
  touched?: any;
  value?: string;
}

export const Input = (props: inputProps) => {
  const {
    label,
    onBlur,
    onChange,
    err,
    errMsg,
    hasLeftIcon,
    hasRightIcon,
    RightIcon,
    LeftIcon,
    otherProps
  } = props;
  return (
    <View style={styles.container}>
      {hasRightIcon && <View style={styles.rightIcon}>{RightIcon}</View>}
      {hasLeftIcon && <View style={styles.leftIcon}>{LeftIcon}</View>}
      <Text style={styles.header}>{label}</Text>
      <TextInput
        onChangeText={onChange}
        onBlur={onBlur}
        
        style={[styles.input, {paddingLeft: hasLeftIcon ? 40 : 20}]}
        placeholderTextColor={colors.light.black}
        {...otherProps}
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
    width: "100%",
    justifyContent: "flex-start",
    marginBottom: 20
  },
  header: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 14,
    color: colors.primary
  },
  input: {
    width: "100%",
    height: 55,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D9D7DE',
    backgroundColor: colors.light.bg_input,
    paddingLeft: 20
  },
  rightIcon: {
    position: "absolute",
    zIndex: 1000,
    top: 36,
    right: 20,
  },
  leftIcon: {
    position: "absolute",
    zIndex: 1000,
    top: 35,
    left: 15,
  },
});
