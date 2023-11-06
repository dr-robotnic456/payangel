import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  LayoutAnimation,
  ActivityIndicator,
} from "react-native";
import React,{useState} from "react";
import Navbar from "../../components/Global/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import CamImgNext from "../../assets/Home/cameraNext.svg";
import { CustomButton, EventCarousel, HeaderBanner } from "../../components/Global";
import PresecLogo from "../../assets/Home/presecLogo.svg"
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { useScannedEventHistoryQuery } from "../../Redux/ApiSlice/Queries/homeQuery";
const History = ({ navigation }) => {
  const {eventData,eventId} = useSelector((state) => state.home);
  
  const {data,isLoading} =useScannedEventHistoryQuery({eventId})
  // console.log("---data",data)
  const handleHistory = () => {
    // navigation.navigate("History");
  };
  const handleDetails = (item) => {
    // console.log("---history", item);
    navigation.navigate("HistoryDetails", { item });
  };

  const handleScan = () => {

    navigation.navigate("BarScanner");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
     
      <View style={styles.container}>
      <HeaderBanner 
       />

        <View style={styles.contentContainer}>
          <EventCarousel data={eventData} />
          <Text style={styles.Headertext}>History</Text>
        {isLoading ? <ActivityIndicator /> :
          // <FlatList data={data.data} 
          // keyExtractor={(item) => item.id}
          // showsVerticalScrollIndicator={false}
          // renderItem={({ item }) => (
          //   <View key={item.id} style={styles.container1}>
          //   <TouchableOpacity onPress={() => handleDetails(item)}>
          //     <View
          //       style={styles.gradientContainer}
          //     >
          //       <Text style={styles.text}>{item.expectedAdmissions}</Text>
          //       <Text style={styles.numberText}>{item.number}</Text>
          //     </View>
          //   </TouchableOpacity>
          // </View>
          // )} />
          <View  style={styles.container1}>
            {/* <TouchableOpacity onPress={() => handleDetails(item)}> */}
            <TouchableOpacity onPress={() => handleDetails("expectedAdmissions")}>

              <View
                style={styles.gradientContainer}
              >
                <Text style={styles.text}>Expected Admission</Text>
                <Text style={styles.numberText}>{data?.data?.expectedAdmissions}</Text>
              </View>
              </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDetails("pendingAdmissions")}>

              <View
                style={styles.gradientContainer}
              >
                <Text style={styles.text}>Pending Admission</Text>
                <Text style={styles.numberText}>{data?.data?.pendingAdmissions}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDetails("totalAdmitted")}>

              <View
                style={styles.gradientContainer}
              >
                <Text style={styles.text}>Total Admitted</Text>
                <Text style={styles.numberText}>{data?.data?.totalAdmitted}</Text>
              </View>
            </TouchableOpacity>
            {/* </TouchableOpacity> */}
          </View>
          }
         
         
          <View style={{  justifyContent: "flex-end",flex:1 }}>
          <CustomButton
            onPress={handleScan}
            type="scanTicketHistory"
            text="Scan Ticket"
          />
        </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 8,
  },
  contentContainer: {
    flex: 1,
    marginHorizontal: 14,
  },
  Headertext: {
    fontSize: 24,
    fontWeight: "600",
    color: "#35495E",
  },

  container1: {
    top: 10,
    
    // marginTop: 20,
  },
  gradientContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.15)",
    backgroundColor:"rgba(82, 82, 82, 0.15)",
    height: 90,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  text: {
    color: "#35495E",
    fontSize: 19,
    fontWeight: "500",
   
  },
  numberText: {
    color: "#35495E",
    fontSize: 35,
    fontWeight: "bold",
    alignItems: "center",
  },
});
