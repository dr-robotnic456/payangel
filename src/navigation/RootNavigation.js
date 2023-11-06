import { StyleSheet, Dimensions, Text, View } from "react-native";
import React, { useState,useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import {
  Entypo,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Welcome from "../screens/Registration/Welcome";
import Login from "../screens/Registration/Login";
import { navigateToLogin, setNavigationRef } from './NavigationService';
import {
  BarScanner,
  Event,
  History,
  HistoryDetails,
  TicketHome,
  TicketSuccess,
} from "../screens/Home";
const Stack = createNativeStackNavigator();

// AsyncStorage.clear();
const RootNavigation = () => {
  const [isTokenExpired, setIsTokenExpired] = useState(false);
  const { isLoggedIn, tokenExpiration } = useSelector((state) => state.user);
  useEffect(() => {
    const tokenExpired= tokenExpiration?.tokenExpiration && new Date().getTime() >= tokenExpiration?.tokenExpiration;
    console.log("tokenExpired",tokenExpired)
    setIsTokenExpired(tokenExpired);
    if (isLoggedIn && tokenExpired) {
      
      navigateToLogin();
    }
  }, [isLoggedIn, tokenExpiration?.tokenExpiration]);
  return (
    <NavigationContainer ref={setNavigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn  ? (
        <Stack.Screen name="Events" component={Event} />

        ) : (
          <Stack.Screen name="welcome" component={Welcome} />
        )}
        {/* <Stack.Screen name="welcome" component={Welcome} /> */}
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="TicketHome" component={TicketHome} />
        <Stack.Screen name="BarScanner" component={BarScanner} />
        <Stack.Screen name="TicketSuccess" component={TicketSuccess} />
        <Stack.Screen name="History" component={History} />
        <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
        {/* <Stack.Screen name="Events" component={Event} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;

const styles = StyleSheet.create({
  interaction: {
    bottom: 20,
    width: 65,
    height: 55,
    backgroundColor: "#E83E8C",
    borderRadius: 15,

    textAlign: "center",
  },
});
