import { Text, TextProps } from "./Themed";

export function IText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        props.style,
        { fontFamily: props.type === "lg" ? "PoppinsBold" : "PoppinsRegular" },
      ]}
    />
  );
}
