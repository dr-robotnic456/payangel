import {
  StyleSheet,
  FlatList,
  Image,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import PresecLogo from "../../assets/Home/presecLogo.svg";
import { useDispatch,useSelector } from "react-redux";
import { setEventData, setEventId } from "../../Redux/Slicies/homeSlice";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const EventCarousel = ({ data, selectedItem }) => {
  const {eventData} = useSelector((state) => state.home);
  const navigation=useNavigation()
  const dispatch = useDispatch();
  const [itemSelected, setItemSelected] = useState(data[0].uuid);
  const handleSelected = (id) => {
    const sortedData = [...eventData].sort((a, b) => {
      if (a.uuid === itemSelected.uuid) {
        return -1; 
      } else if (b.uuid === itemSelected.uuid) {
        return 1; 
      }
      return 0; 
    });
    dispatch(setEventData(sortedData));
    dispatch(setEventId(id));
    setItemSelected(id);
  };
  // console.log("----selectedItem",JSON.stringify(itemSelected,null,2))
  return (
    <View>
      <View style={{ flexDirection: "row",alignItems:"center" }}>
        <TouchableOpacity onPress={()=>navigation.goBack()}>
        <FontAwesome name="arrow-left" color="#35495E" size={20} />

        </TouchableOpacity>

        <Text
          style={{
            color: "#35495E",
            fontSize: 24,
            alignItems: "center",
            fontWeight: "500",
            marginHorizontal:20
          }}
        >
          Manage Events
        </Text>
      </View>

      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => handleSelected(item.uuid)}>
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    itemSelected === item.uuid
                      ? "#35495E"
                      : "rgba(82, 82, 82, 0.15)",
                  borderColor: "rgba(82, 82, 82, 0.15)",
                },
              ]}
            >
              {/* <PresecLogo /> */}
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={{ marginRight: 45, }}>
                <Text
                  style={{
                    color: itemSelected === item.uuid ? "#FFFFFF" : "#35495E",
                    alignItems: "center",
                    fontSize: 18,
                    fontWeight: "700",
                    width: 180,
                    left: 30,
                    // marginVertical: 2,
                  }}
                >
                  {item.title}
                </Text>

                {item.schedule.map((info) => (
                  <Text
                    key={info.uuid}
                    style={{
                      color: itemSelected === item.uuid ? "#FFFFFF" : "#35495E",
                      alignItems: "center",
                      fontSize: 13,
                      fontWeight: "400",
                      left: 30,
                      top: 4,
                    }}
                  >
                    {info.start_date}
                  </Text>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EventCarousel;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#35495E",
    borderRadius: 10,
    marginRight: 15,
    // marginHorizontal: 10,
    paddingVertical: 5,
    marginVertical: 11,
    borderWidth: 1,
    height: 100,
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
    marginHorizontal: 8,
  },
});
