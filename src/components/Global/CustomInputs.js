import {
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import React, { useState } from "react";
import { Fontisto, FontAwesome,MaterialIcons } from "@expo/vector-icons";

const CustomInputs = ({
   placeholder,
  value,
  error,
  secureTextEntry,
  keyboardType,
  errorMessage,

  type,
  setValue,
  onFocus = () => {},
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 12,
          paddingHorizontal: 10,
          borderColor: "rgba(82, 82, 82, 0.15)",
          borderRadius: 10,
          borderWidth: 1,
          backgroundColor: "#FFFFFF",
        }}
      >
        <TextInput
          placeholder={placeholder}
          placeholderTextColor="#35495E"
          style={styles.input}
          value={value}
          onChangeText={setValue}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry && !showPassword}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
        {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={toggleShowPassword}
        >
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#a9a9a9"
          />
        </TouchableOpacity>
      )}
      </View>
      {error && (
        <Text
          style={{ marginLeft: 20, bottom: 8, color: "red", fontSize: 12 }}
        >
          {error}
        </Text>
      )}
    </View>
  );
};

export default CustomInputs;

const styles = StyleSheet.create({
  input: {
    flex: 1,
    height: 25,
    margin: 12,
    color: "#2B313D",
  },
});
