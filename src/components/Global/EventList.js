import { StyleSheet, TouchableOpacity, Image, Text, View } from "react-native";
import React from "react";

const EventList = ({ item, handleScan, selectedItemId }) => {
  const handleClick = () => {
    handleScan(item);
  };
  return (
    <View style={styles.cardBody}>
      <TouchableOpacity onPress={handleClick}>
        <View style={styles.cardContent}>
          <View style={styles.header}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <View style={{ marginVertical: 5 }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: "400",
                  color: "#FFFFFF",
                  width: 180,
                }}
              >
                {item.title}
              </Text>
              {item.schedule.map((info) => (
                <Text
                  key={info.uuid}
                  style={{
                    fontSize: 14,
                    color: "#FFFFFF",
                    fontWeight: "400",
                    marginVertical: 5,
                  }}
                >
                  {info.start_date}
                </Text>
              ))}
             
            </View>
            <View
              style={{
                width: 20,
                height: 20,
                top:27,
                backgroundColor:
                  item?.uuid === selectedItemId?.uuid ? "#DA4749" : "white",
                borderWidth: 2,
                borderColor: "gray",
                borderRadius: 5,
              }}
            ></View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EventList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardBody: {
    flex: 1,
    height: 105,
    marginTop: 35,
    backgroundColor: "#35495E",
    borderWidth: 1,
    borderColor: "rgba(82, 82, 82, 0.15)",
    borderRadius: 10,
  },
  cardContent: {
    paddingHorizontal: 10,
    marginVertical: 15,
    justifyContent: "center",
    // paddingVertical:20
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "center",
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "cover",
    // marginHorizontal: 8,
  },
});
