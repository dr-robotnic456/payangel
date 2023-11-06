import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  View,
  Image,
} from "react-native";
import React from "react";
import Logo from "../../assets/Home/logo.svg";
import BackGroundImg from "../../assets/Home/SplashBg.png";
import Barcode from "../../assets/Home/barcode.png";
import { CustomButton } from "../../components/Global";
import Header from "../../components/Global/Header";

const Welcome = ({ navigation }) => {
  const handleLoginHome = () => {
    navigation.navigate("login");
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={{ flex: 1, marginTop: 20 }}>
        <ImageBackground
          source={BackGroundImg}
          resizeMode="cover"
          style={styles.imageBg}
        >
          <Header />
          <View
            style={{
              flex: 1,
              // justifyContent: "center",
              // backgroundColor: "red",
              alignItems: "center",
            }}
          >
            <Image source={Barcode} style={{ width: 200, height: 200 }} />
          </View>
          <CustomButton
            onPress={handleLoginHome}
            text="Get Started"
            type="arrow"
          />
        </ImageBackground>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    width: "100%",
  },
});
