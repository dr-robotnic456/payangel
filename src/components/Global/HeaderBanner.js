import {
  StyleSheet,
  SafeAreaView,
  TouchableWithoutFeedback,
  Text,
  Image,
  LayoutAnimation,
  TouchableOpacity,
  Animated,
  View,
  FlatList,
  ScrollView,
  Alert,
} from "react-native";

import React from "react";
import Logo from "../../assets/Home/logoNoText.svg";
import ProfileImg from "../../assets/Home/profileImg.png";
import PresecLogo from "../../assets/Home/presecLogo.svg";
import { useSelector,useDispatch } from "react-redux";
import { logoutUser } from "../../Redux/Slicies/userSlice";
import { useNavigation } from "@react-navigation/native";
const HeaderBanner = ({ isExpanded, toggleDropdown, data, selectedItem }) => {
  const navigation =useNavigation()
  const { user } = useSelector((state) => state.user);
  const dispatch=useDispatch()
  // console.log(JSON.stringify(user, null, 2));
  const handleLogout = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Yes',
          onPress: () => {
            // Dispatch logout action here
            dispatch(logoutUser);
            navigation.navigate("login")
          },
        },
        {
          text: 'No',
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header1}>
        <TouchableWithoutFeedback onPress={toggleDropdown}>
          <View style={styles.header}>
            <View style={styles.profileContainer}>
              <TouchableOpacity onPress={handleLogout}>
              <Image source={{uri: user?.avatar}} style={styles.profileImage} />
              </TouchableOpacity>
              <View style={{ marginLeft: 15 }}>
                <Text style={styles.title}>Hi,</Text>
                <Text style={styles.title}>{user?.firstname} {user?.lastname}</Text>
              </View>
            </View>
            <View style={styles.logoContainer}>
              <Logo width={50} height={50} style={styles.logo} />
            </View>
          </View>
        </TouchableWithoutFeedback>

        {isExpanded && (
          <View style={styles.dropdown}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 10,
              }}
            >
              <Text style={{ color: "white", alignItems: "center" }}>
                Manage Event
              </Text>
            </View>
            <FlatList
              data={data}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.id}
              renderItem={({ item, index }) => (
                <View
                  style={[
                    styles.card,
                    {
                      backgroundColor: index == 0 ? "#35495E" : "#57883A",
                      borderColor:
                        selectedItem.id == item.id ? "#35495E" : "#FFFFFF",
                    },
                  ]}
                >
                  <PresecLogo />
                  <View style={{ marginRight: 60 }}>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        alignItems: "center",
                        fontSize: 24,
                        fontWeight: "700",
                        left: 40,
                      }}
                    >
                      {item.event}
                    </Text>
                    <Text
                      style={{
                        color: "#FFFFFF",
                        alignItems: "center",
                        fontSize: 12,
                        fontWeight: "400",
                        left: 40,
                      }}
                    >
                      {item.title}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
        )}
      </View>
    </View>
  );
};

export default HeaderBanner;

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
  },
  header1: {
    alignItems: "center",
    paddingHorizontal: 10,

    marginVertical: 15,

    backgroundColor: "#35495E",
  },
  header: {
    flexDirection: "row",

    marginVertical: 8,
    height: 80,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    top:5
  },
  logo: {
    marginHorizontal: 10,
    resizeMode: "contain",
  },
  titleContainer: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "400",
    lineHeight: 22,
    color: "#FFFFFF",
  },
  profileContainer: {
    flex: 1,
    flexDirection: "row",
    // justifyContent: '',
    top:5,
    alignItems: "center",
  },
  profileImage: {
    width: 55,
    height: 55,
    resizeMode: "cover",
    borderRadius: 30,
  },
  dropdown: {
    bottom: 5,

    overflow: "hidden",
    height: 130,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#35495E",
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 9,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
