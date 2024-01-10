import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../../constants/colors";

/**
 * Input component for displaying a label and an input field.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.label - The label text to be displayed.
 * @param {Object} props.style - The custom styles to be applied to the component.
 * @param {Object} props.textInputConfig - The configuration for the TextInput component. will be an object with key value pairs. e.g. { placeholder: "Enter a title" }
 * @returns {JSX.Element} The rendered Input component.
 */
const Input = ({ label, style, textInputConfig }) => {
  let inputStyles = [
    styles.textInput,
    textInputConfig.multiline && styles.inputMultiLine,
    textInputConfig.isInvalid && styles.error,
  ];

  return (
    <View style={[styles.container, style]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput style={inputStyles} {...textInputConfig} />
      {textInputConfig.isInvalid && <Text style={{ color: colors.error500 }}>{textInputConfig.errorText}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    marginHorizontal: 8,
    height: "100%",
  },
  label: {
    color: colors.primary100,
    fontSize: 12,
    marginBottom: 4,
  },
  textInput: {
    backgroundColor: colors.primary100,
    borderRadius: 18,
    padding: 8,
    fontSize: 16,
    color: colors.primary700,
  },
  inputMultiLine: {
    height: 100,
    textAlignVertical: "top",
  },
  error: {
    borderWidth: 1,
    borderColor: colors.error500,
    backgroundColor: colors.error50,
  },
});
