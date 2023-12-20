import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userSlice";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignUpPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const [userData, setUserData] = useState({
    fullName: "",
    contact: "",
    email: "",
    password: "",
  });

  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };
  useEffect(() => {
    const checkToken = async () => {
      // Check if a token is stored in AsyncStorage
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        // If a token is found, navigate to MainPage
        navigation.navigate("MainPage");
      }
    };

    checkToken();
  }, [navigation]);

  // useEffect(() => {
  //   if (status === "succeeded") {
  //     Alert.alert("Signup Successful", "You have successfully signed up!");
  //     // Move to the login page after successful registration
  //     navigation.replace("LoginPage");
  //   }
  //   if (status === "failed") {
  //     Alert.alert(
  //       "Signup Failed",
  //       "There was an error during signup. Please try again."
  //     );
  //   }
  // }, [status, navigation]);

  const handleSignUp = () => {
    dispatch(registerUser(userData));
    if (status === "succeeded") {
      // Reset the userData state after successful login
      setUserData({
        username: "",
        contact: "",
        email: "",
        password: "",
      });

      // Navigate to the MainPage
      navigation.navigate("LoginPage");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/AlzAware.png")}
        style={styles.logo}
      />
      <Text style={styles.heading}>Signup</Text>
      {status === "failed" && <Text style={styles.errorText}>{error}</Text>}
      {status === "loading" && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}

      <TextInput
        style={styles.input}
        placeholder="Full Name*"
        keyboardType="text"
        value={userData.fullName}
        onChangeText={(text) => handleInputChange("fullName", text)}
        required
      />

      <TextInput
        style={styles.input}
        placeholder="Contact*"
        keyboardType="numeric"
        value={userData.contact}
        onChangeText={(text) => handleInputChange("contact", text)}
        required
      />

      <TextInput
        style={styles.input}
        placeholder="Email*"
        keyboardType="email-address"
        value={userData.email}
        onChangeText={(text) => handleInputChange("email", text)}
        required
      />

      <TextInput
        style={styles.input}
        placeholder="Password*"
        secureTextEntry={true}
        value={userData.password}
        onChangeText={(text) => handleInputChange("password", text)}
        required
      />

      <TouchableOpacity>
        <Text style={styles.linkText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={handleSignUp}
        disabled={status === "loading"}
      >
        <Text style={styles.buttonText}>
          {status === "loading" ? "Signing up..." : "Signup"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.registrationLink}>
        <Text style={styles.statement}>Already have an account?</Text>
        <Text
          style={styles.registerLink}
          onPress={() => navigation.navigate("LoginPage")}
        >
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#3479CC",
  },
  logo: {
    width: 250,
    height: 130,
    paddingBottom: 0,
    resizeMode: "contain",
    backgroundColor: "transparent",
  },
  heading: {
    fontSize: 40,
    fontWeight: "600",
    fontFamily: "sans-serif",
    color: "#fff",
    marginVertical: 18,
  },
  input: {
    width: 270,
    height: 35,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    marginTop: 10,
    paddingHorizontal: 10,
    margin: 10,
    color: "white",
    borderRadius: 10,
  },
  linkText: {
    marginTop: 10,
    color: "#0047AB",
    fontSize: 15,
    textDecorationLine: "underline",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#48EC16",
    paddingVertical: 13,
    paddingHorizontal: 50,
    borderRadius: 28,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
  },
  registrationLink: {
    marginTop: 15,
  },
  registerLink: {
    marginTop: 20,
    color: "#0047AB",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignUpPage;
