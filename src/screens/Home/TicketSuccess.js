import {
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import BackGroundImg from "../../assets/Home/SplashBg.png";
import SuccessImg from "../../assets/Home/Success.svg";
import FailImg from "../../assets/Home/FailIcon.svg";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import {
  setTicketFail,
  setTicketSuccess,
  setUnauthorized,
} from "../../Redux/Slicies/homeSlice";

const TicketSuccess = ({ navigation }) => {
  const dispatch = useDispatch();
  const { ticketSuccess, ticketFail, unauthorized } = useSelector(
    (state) => state.home
  );
  const handleHistory = () => {
    navigation.navigate("History");
  };
  const handleBack = () => {
    dispatch(setUnauthorized(false));
    dispatch(setTicketSuccess(false));
    dispatch(setTicketFail(false));
    navigation.goBack();
  };
  const handleBarScanner = () => {
    dispatch(setTicketSuccess(false));
    navigation.navigate("History");
  };
  if (ticketSuccess) {
    setTimeout(() => {
      handleBarScanner();
    }, 1600);
  }
  const data = {
    success: ticketSuccess,
    fail: ticketFail,
    unauthorized: unauthorized,
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={BackGroundImg}
        resizeMode="cover"
        style={styles.imageBg}
      >
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => handleBack()}
            style={styles.backButton}
          >
            <AntDesign
              name="arrowleft"
              style={{ marginRight: 10 }}
              size={28}
              color="#35495E"
            />
          </TouchableOpacity>
          <View style={styles.contentContainer}>
            {data.success && (
              <>
                <SuccessImg width={130} height={130} style={{ bottom: 50 }} />
                <Text style={styles.text}>
                  You have Successfully confirmed the ticket
                </Text>
              </>
            )}

            {data.fail && (
              <>
                <FailImg width={130} height={130} style={{ bottom: 50 }} />
                <Text style={styles.text}>Already Scanned</Text>
              </>
            )}

            {data.unauthorized && (
              <>
                <FailImg width={130} height={130} style={{ bottom: 50 }} />
                <Text style={styles.text}>Ticket Event Mismatch</Text>
              </>
            )}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default TicketSuccess;

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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 22,
    fontWeight: "300",
    color: "#35495E",
    lineHeight: 25,
    width: 280,
    // marginLeft: 40,
    alignItems: "center",
    textAlign: "center",
  },
  img2: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  backButton: {
    position: "absolute",
    top: 45,
    left: 10,
    zIndex: 1,
  },
});
