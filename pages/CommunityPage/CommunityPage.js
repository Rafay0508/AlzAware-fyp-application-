import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { createMessage, fetchAllMessages } from "../../redux/messageSlice"; // Adjust the import path
import { setToken } from "../../redux/userSlice"; // Adjust the import path
import AsyncStorage from "@react-native-async-storage/async-storage";

const CommunityPage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const userToken = useSelector((state) => state.user.token);

  useEffect(() => {
    // Fetch messages when the component mounts
    dispatch(fetchAllMessages());
  }, []);

  const handleLogout = async () => {
    try {
      // Clear user authentication data from AsyncStorage and Redux state
      await AsyncStorage.removeItem("token");
      dispatch(setToken(null));
      // Additional cleanup if needed
      navigation.navigate("LoginPage");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      // Dispatch the sendMessage action with the message data and token
      dispatch(
        createMessage({ user: "User", content: inputMessage }, userToken)
      );

      // Clear the input field
      setInputMessage("");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <Text style={styles.heading}>Community Chat Support</Text>
      <ScrollView style={styles.messageList}>
        {/* Display messages from the Redux state
        {messages.map((message) => (
          <View key={message.id}>
            <Text style={styles.senderName}>{message.user}</Text>
            <View style={styles.messageCard}>
              <Text>{message.content}</Text>
            </View>
          </View>
        ))} */}
      </ScrollView>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={inputMessage}
          onChangeText={(text) => setInputMessage(text)}
        />
        <TouchableOpacity onPress={handleSendMessage}>
          <View style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommunityPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#3479CC",
  },
  heading: {
    fontSize: 24,
    textAlign: "center",
    marginVertical: 10,
    color: "yellow",
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
  messageList: {
    flex: 1,
    marginVertical: 10,
    marginLeft: 10,
  },
  messageCard: {
    width: "50%",
    alignSelf: "flex-start",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    margin: 1,
    marginBottom: 10,
    padding: 10,
  },
  senderName: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  inputSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#3479CC",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  input: {
    flex: 1,
    height: 37,
    backgroundColor: "white",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  sendButton: {
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  sendButtonText: {
    fontSize: 16,
    color: "white",
  },
});
