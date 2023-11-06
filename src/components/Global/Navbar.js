import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AntDesign, Ionicons } from "@expo/vector-icons";

const Navbar = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ marginVertical: 20 }}>
      <AntDesign
        name="arrowleft"
        style={{ marginRight: 10, top: 30 }}
        size={28}
        color="#35495E"
      />
    </TouchableOpacity>
  );
};

export default Navbar;

const styles = StyleSheet.create({});
