import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Text, View } from "react-native";
import RootNavigation from "./src/navigation/RootNavigation";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./src/Redux/Store/store";

const App = () => {
  return (
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="gray" />
      <RootNavigation />
    </SafeAreaView>
    </PersistGate>
    </Provider>
  );
};
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});
