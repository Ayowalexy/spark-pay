import React, { ReactNode } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { Text } from "./Themed";
import { colors } from "../../utils/colors";

interface buttonProps {
  children: ReactNode;
  onPress: (e: GestureResponderEvent) => void;
  extrastyles?: StyleProp<ViewStyle>;
  loading?: "failed" | "pending" | "successful" | "idle";
}

export const Button = ({
  children,
  onPress,
  extrastyles,
  loading,
}: buttonProps) => {
  return (
    <TouchableOpacity
      disabled={loading === "pending" ? true : false}
      onPress={onPress}
      style={[styles.container, extrastyles]}
    >
      {loading === "pending" ? (
        <ActivityIndicator color={colors.light.background} size="small" />
      ) : (
        <Text type="sm" style={styles.text}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: colors.light.background,
    fontSize: 15,
  },
});
