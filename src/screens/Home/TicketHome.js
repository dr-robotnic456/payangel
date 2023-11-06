 import { StyleSheet, SafeAreaView,TouchableOpacity,LayoutAnimation, Image, Text, View, ScrollView } from "react-native";
import React,{useState} from "react";
import Header from "../../components/Global/Header";
import ScannerImg2 from "../../assets/Home/ReadyScan.svg";
import PresecLogo from "../../assets/Home/presecLogo.svg"
import VectorImg2 from "../../assets/Home/Vector.svg";
import { CustomButton, EventCarousel, HeaderBanner } from "../../components/Global";
import { useSelector } from "react-redux";
const TicketHome = ({ navigation,route }) => {
    const {eventData,eventId} = useSelector((state) => state.home);

  const handleScan = () => {
    // navigation.navigate("TicketSuccess");

    navigation.navigate("BarScanner");
  };


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
    <View style={styles.container}>
      <HeaderBanner selectedItem={eventId}  />
      <View style={{ paddingHorizontal: 20 }}>
        <EventCarousel selectedItem={eventId} data={eventData} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>

      <View style={styles.scannerMain}>

        <ScannerImg2 width={280} height={280} style={styles.scanLogo} />
        <Text style={{fontSize:24,fontWeight:"500",color:"#35495E",marginVertical:20}}>Ready to Scan</Text>

      </View>
      {/* <View style={{ flex: 1, justifyContent: "center",}}> */}
      <CustomButton
          onPress={handleScan}
          type="scanTicket"
          text="Scan Now"
        />
      {/* </View> */}
      
      </ScrollView>
    </View>
  </SafeAreaView>
  );
};

export default TicketHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
  },
  scannerMain: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 27,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#35495E",
    marginVertical: 10,
    marginHorizontal: 20,
  },
  scanLogo: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
