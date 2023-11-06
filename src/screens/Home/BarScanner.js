import React, { useState, useEffect,useCallback, useRef } from "react";
import {
  Button,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector,useDispatch } from "react-redux";
import { useFocusEffect } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import { useScanTicketMutation } from "../../Redux/ApiSlice/Queries/homeQuery";
import { setTicketFail, setTicketSuccess, setUnauthorized } from "../../Redux/Slicies/homeSlice";
const BarScanner = ({ navigation }) => {
  const { user } = useSelector((state) => state.user);
const dispatch = useDispatch();
  const [hasPermission, setHasPermission] = useState(null);

const { eventId } = useSelector((state) => state.home);

console.log("----eventIdBARSCANNER",eventId)
  const [scanned, setScanned] = useState(false);
  const [errorMessage, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [cameraType, setCameraType] = useState(
    BarCodeScanner.Constants.Type.back
  );
  const scanningLineAnim = useRef(new Animated.Value(0)).current;
    const [scanTicket,{isLoading,error,status}] = useScanTicketMutation()
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  useEffect(() => {
    startScanningLineAnimation();
  }, []);


  const handleChangeCamera = () => {
    setCameraType(
      cameraType === BarCodeScanner.Constants.Type.back
        ? BarCodeScanner.Constants.Type.front
        : BarCodeScanner.Constants.Type.back
    );
  };

  const startScanningLineAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanningLineAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(scanningLineAnim, {
          toValue: 0,
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

 
  const handleBarCodeScanned = async({ type, data }) => {
    setScanned(true);
   setError(null);
    let info={
      user_id:user.uuid,
      event_id:eventId,
      ticket_id:data
    }
    // console.log("--------",data)
    const scanData =await scanTicket({...info})
    // console.log("----scanData",scanData.error.status)
    // return
    if(scanData?.error?.status===404){
      dispatch(setUnauthorized(true));
      navigation.dispatch(
        StackActions.replace('TicketSuccess')
      );
    }
    if(scanData?.error?.status===400){
      dispatch(setTicketFail(true));
      navigation.dispatch(
        StackActions.replace('TicketSuccess')
      );
      
    }
    if (scanData?.data){
      dispatch(setTicketSuccess(true));
     navigation.dispatch(
        StackActions.replace('TicketSuccess')
      );
    }
   
  };

  useFocusEffect(
    useCallback(() => {
      setScanned(false); 
      return () => {
        setScanned(true); 
      };
    }, [])
  );



  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const screenHeight = Dimensions.get("screen").height;
  const scanningLineHeight = screenHeight * 0.001;
  const scanningLineRange = screenHeight * 0.4;

  return (
    // <View style={styles.container}>
    <LinearGradient
      colors={["#000000", "rgba(240, 255, 255, 0.3)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <TouchableOpacity style={styles.closeButton}>
        <AntDesign
          onPress={() => navigation.goBack()}
          name="close"
          size={30}
          color="white"
        />
      </TouchableOpacity>

      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
        type={cameraType}
      />

      <View style={styles.scanningLineContainer}>
        <Animated.View
          style={[
            styles.scanningLine,
            {
              height: scanningLineHeight,
              transform: [
                {
                  translateY: scanningLineAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [
                      -scanningLineRange / 2,
                      scanningLineRange / 2,
                    ],
                    extrapolate: "clamp",
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.bottomItem}>{/* <Text>hello</Text> */}</View>
        <View style={styles.bottomItem}>
        {errorMessage && (
            <Text style={{ bottom: 10, color: "red" }}>{errorMessage}</Text>
          )}
          {scanned && (
            <Text style={{ bottom: 10, color: "white" }}>Scan Again</Text>
          )}
         
          <TouchableOpacity
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              backgroundColor: "white",
              borderColor: "rgba(196, 196, 196, 0.2)",
              borderWidth: 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            title="Scan Again"
            onPress={() => setScanned(false)}
          ></TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={handleChangeCamera}
          style={styles.bottomItem}
        >
          <View style={styles.cameraSwipeIcon}>
            <AntDesign name="sync" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
    // </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 36,
    // left: 0,
    right: 0,
    zIndex: 1,
    marginHorizontal: 16,
    marginVertical: 16,
  },
  scanningLineContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanningLine: {
    width: "80%",
    backgroundColor: "red",
  },
  bottomContainer: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  bottomItem: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraSwipeIcon: {
    marginLeft: 12,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    backgroundColor: "rgba(196, 196, 196, 0.2)",
  },
});

export default BarScanner;
