import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../../assets/Home/logo.svg";

const Header = () => {
  return (
    <View style={styles.logoContainer}>
      <Logo width="57%" height="30%" />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
});
