import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  View,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useState } from "react";
import Logo from "../../assets/Home/logo.svg";
import BackGroundImg from "../../assets/Home/SplashBg.png";
import Barcode from "../../assets/Home/barcode.png";
import { CustomButton, CustomInputs } from "../../components/Global";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Header from "../../components/Global/Header";
import { useLoginUserMutation } from "../../Redux/ApiSlice/Queries/registerQuery";
import { setToken, setUser } from "../../Redux/Slicies/userSlice";
import { useDispatch } from "react-redux";
const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [errors, setErrors] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // console.log(inputs);
  const handleLogin = async () => {
    setErrors({});
      setErrorMsg("");
    let isValid = true;
    if (!inputs.email) {
      handleError("Please enter a email", "email");
      isValid = false;
    }
    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }
    if (isValid) {
      
      const res = await loginUser({ ...inputs });
      
      if (res?.error) {
        const {
          data: { message },
        } = res?.error;
        setErrorMsg(message);
      }
      if (res?.data) {
        const {
          message,
          token,
          data
        } = res?.data;
        const tokenExpiration = new Date().getTime() + 24 * 60 * 60 * 1000;
        dispatch(setUser(data));
        dispatch(setToken({ token, tokenExpiration }));
        setSuccessMessage(message);
        setTimeout(() => {
          navigation.navigate("Events");
          setSuccessMessage("");
        }, 1000);
      }
    }
  };
  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (errors, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: errors }));
  };
  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <ImageBackground
          source={BackGroundImg}
          resizeMode="cover"
          style={styles.imageBg}
        >
          <View style={styles.container}>
            <Header />

            <Text
              style={{
                fontSize: 40,
                fontWeight: "500",
                lineHeight: 40,
                color: "#35495E",
                textAlign: "center",
              }}
            >
              Log in
            </Text>
            <View style={styles.contentContainer}>
              <View style={styles.formContainer}>
                <CustomInputs
                  placeholder="Email"
                  onChangeText={(text) => handleOnchange(text, "email")}
                  error={errors.email}
                  onFocus={() => handleError(null, "email")}
                />
                <Text style={{ color: "red", bottom:10,left:5}}>{errorMsg}</Text>
                <CustomInputs
                  placeholder="Password"
                  secureTextEntry
                  onFocus={() => handleError(null, "password")}
                  onChangeText={(text) => handleOnchange(text, "password")}
                  error={errors.password}
                />
              </View>
            </View>
            <View style={styles.buttonFooter}>
              <Text style={{ color: "green",textAlign: "center" }}>{successMessage}</Text>
              <CustomButton
                onPress={() => handleLogin()}
                text={isLoading ?
               <ActivityIndicator  size="large" color="#00ff00" />
               : "Log In"}
                type="loginButton"
              />
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
};

export default Login;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
    width: "100%",
  },
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 25,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  contentContainer: {
    justifyContent: "center",
  },
  formContainer: {
    marginTop: 20,
  },
  buttonFooter: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 8,
  },
});
