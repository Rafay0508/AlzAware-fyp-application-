import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const MainPage = () => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      // Clear user authentication data from AsyncStorage
      await AsyncStorage.removeItem("token");
      // Additional cleanup if needed
      navigation.navigate("LoginPage");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Image
        source={require("../../assets/AlzAware.png")}
        style={styles.logo}
      />
      {/* <Text style={styles.welcomeText}>Welcome Back, Abdul Rafay</Text> */}
      <Image
        source={require("../../assets/banner.png")}
        style={{
          marginTop: 10,
          width: "90%",
          alignSelf: "center",
          height: "80%",
          borderRadius: 5,
        }}
      />
      <Text
        style={{
          fontSize: 16,
          color: "white",

          textAlign: "center",
        }}
      >
        Empowering Alzheimer's Patients and Caregivers.
      </Text>
      <View style={{ margin: 10, marginTop: 20 }}>
        <Text
          style={{
            fontSize: 22,
            textDecorationLine: "underline",
            color: "#FFFF66",
          }}
        >
          About Alzheimer Disease:
        </Text>
        <Text style={{ textAlign: "center", padding: 5, color: "white" }}>
          Alzheimer is a neurodegenerative disorder causing memory loss,
          cognitive decline, and behavioral changes. Early detection is vital
          for interventions that slows down progression and enhance patient
          outcomes in millions affected globally.
        </Text>
      </View>
    </ScrollView>
  );
};

export default MainPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    backgroundColor: "#4477CE",
  },
  logo: { width: 200, height: 60, marginTop: 20, alignSelf: "center" },
  welcomeText: {
    marginTop: "6%",
    fontSize: 20,
    color: "pink",
    marginLeft: -50,
    // textDecorationLine: "underline",
    textAlign: "center",
  },
  logoutButton: {
    position: "absolute",
    top: 40,
    right: 5,
    padding: 10,
    backgroundColor: "green",
    borderRadius: 20,
  },
  logoutButtonText: {
    color: "white",
  },
});
