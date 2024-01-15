import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import colors from "../../constants/colors";

const Button = ({ children, onPress, mode, style }) => {
  return (
    <View style={[style]}>
      <Pressable onPress={onPress}>
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.text, mode === "flat" && styles.flatText]}>{children}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: colors.primary500,
    minWidth: 64,
  },
  flat: {
    backgroundColor: "transparent",
  },
  text: {
    color: colors.primary50,
    textAlign: "center",
  },
  flatText: {
    color: colors.primary200,
  },
  pressed: {
    opacity: 0.5,
    backgroundColor: colors.primary100,
    borderRadius: 4,
  },
});
