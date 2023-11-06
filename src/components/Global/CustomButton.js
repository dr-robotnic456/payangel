import { StyleSheet, TouchableOpacity, Text, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const CustomButton = ({ text, onPress, type = "main" }) => {
  return (
    <TouchableOpacity onPress={onPress}>
    <LinearGradient
      style={[styles.main, styles[`main_${type}`]]}
      colors={['#DA4749', 'rgba(254, 138, 9, 0.67)']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      locations={[0.1646, 0.818]}
    >
      <Text style={[styles.text, styles[`text_${type}`]]}>{text}</Text>
      {type === 'arrow' && (
        <AntDesign
          name="arrowright"
          style={{ marginRight: 10 }}
          size={24}
          color="#FFFFFF"
        />
      )}
    </LinearGradient>
  </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  main: {
    flexDirection: "row",
    width: "90%",
    height: 50,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginVertical: 20,
    marginHorizontal: 20,
  },
  main_loginButton: {
    width: "100%",
    marginHorizontal: 0,
  },
  main_scanTicket: {
    backgroundColor: "#DA4749",
  },
  main_scanTicketHistory:{
    width:"99%",
    marginHorizontal:0
  },
  text: {
    marginHorizontal: 20,
    fontSize: 18,
    lineHeight: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  text_scanTicket: {
    color: "white",
  },
});
