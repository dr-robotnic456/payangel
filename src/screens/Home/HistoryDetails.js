import {
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  LayoutAnimation
} from "react-native";
import React,{useState} from "react";
import Navbar from "../../components/Global/Navbar";
import { LinearGradient } from "expo-linear-gradient";
import CamImgNext from "../../assets/Home/cameraNext.svg";
import { CustomButton, EventCarousel, HeaderBanner } from "../../components/Global";
import PresecLogo from "../../assets/Home/presecLogo.svg"
import { useSelector } from "react-redux";
const HistoryDetails = ({ navigation, route }) => {
  const {eventData} = useSelector((state) => state.home);
  const { item } = route.params;
  console.log(item);
  const handleHistory = () => {
    navigation.navigate("BarScanner");
  };
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsExpanded(!isExpanded);
  };
  const handleDetails = () => {
    navigation.navigate("TicketDetails");
  };
  const data1 = [
    {
      id: 1,
      name: "Dianne Russel",
      email: "debbie.baker@example.com",

      number: 10,
    },
    {
      id: 2,
      name: "Total Admitted",
      email: "debbie.baker@example.com",

      number: 90,
    },
    {
      id: 3,
      name: "Expected Admissions",
      email: "debbie.baker@example.com",

      number: 10,
    },
    {
      id: 4,
      name: "Pending",
      email: "debbie.baker@example.com",

      number: 100,
    },
    {
      id: 5,
      name: "Pending",
      email: "debbie.baker@example.com",

      number: 100,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View style={styles.container}>
        <HeaderBanner  
        // toggleDropdown={toggleDropdown} isExpanded={isExpanded}
        />
        <View style={styles.contentContainer}>
        <EventCarousel data={eventData} />

          <Text style={styles.Headertext}>
            {item}
          </Text>
          <FlatList
            data={data1}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View key={item.id} style={styles.container1}>
                {/* <TouchableOpacity onPress={handleDetails}> */}
                  <View
                    style={styles.gradientContainer}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        
                      }}
                    >
                      <View>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.textEmail}>{item.email}</Text>

                        <Text style={styles.numberText}>{item.number}</Text>
                      </View>
                      {/* <View
                        style={{
                          padding: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      > */}
                        {/* <Text
                          style={{
                            color: "#35495E",
                            fontWeight: "bold",
                            fontSize: 24,
                          }}
                        >
                          600
                        </Text> */}
                      {/* </View> */}
                    </View>
                  </View>
                {/* </TouchableOpacity> */}
              </View>
            )}
          />
<View style={{  justifyContent: "flex-end" }}>
          <CustomButton
            onPress={handleHistory}
            type="scanTicketHistory"
            text="Scan Ticket"
          />
        </View>
          
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HistoryDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    // marginTop: 20,
    // marginHorizontal: 8,
  },
  contentContainer: {
    flex: 1,
    top: 10,
    marginHorizontal:16,

    // marginBottom: 50,
  },
  Headertext: {
    fontSize: 24,
    fontWeight: "600",
    color: "#35495E",
    marginVertical:8

  },

  container1: {
    flex: 1,
    // top:13
    // marginTop: 20,
  },
  gradientContainer: {
    borderRadius: 15,
    borderWidth: 1,
    backgroundColor:"rgba(82, 82, 82, 0.15)",
    borderColor: "rgba(82, 82, 82, 0.15)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginVertical: 8,
  },
  text: {
    color: "#35495E",
    fontSize: 18,
    fontWeight: "500",
    bottom: 8,
    marginBottom: 5,
  },
  textEmail: {
    color: "#35495E",
    fontSize: 12,
    fontWeight: "500",
    bottom: 8,
  },
  numberText: {
    color: "#35495E",
    fontSize: 18,
    fontWeight: "400",
  },
});
