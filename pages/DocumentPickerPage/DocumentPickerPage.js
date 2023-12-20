// import React, { useRef, useState } from "react";
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
//   Image,
//   Alert,
// } from "react-native";
// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// import * as ImagePicker from "expo-image-picker";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useNavigation } from "@react-navigation/native";
// import { useDispatch, useSelector } from "react-redux";
// import { predictImage } from "../../redux/imageSlice";

// const DocumentPickerPage = () => {
//   const [cameraPhoto, setCameraPhoto] = useState(null);
//   const navigation = useNavigation();
//   const dispatch = useDispatch();
//   const prediction = useSelector((state) => state.image.prediction);
//   const isLoading = useSelector((state) => state.image.uploading);
//   const fileInputRef = useRef(null);

//   React.useEffect(() => {
//     // Request permission for camera
//     (async () => {
//       const { status } =
//         await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== "granted") {
//         Alert.alert("Permission needed", "Please grant camera permission");
//       }
//     })();
//   }, []);

//   const openCamera = async () => {
//     try {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.cancelled) {
//         setCameraPhoto(result.uri);
//         dispatch(predictAndNavigate(result.uri));
//       }
//     } catch (err) {
//       console.error("Error opening camera:", err);
//     }
//   };

//   const predictAndNavigate = async (imageUri) => {
//     try {
//       const formData = new FormData();
//       formData.append("image", {
//         uri: imageUri,
//         name: "image.jpg",
//         type: "image/jpeg",
//       });

//       dispatch(predictImage(imageUri));

//       const response = await fetch("http://127.0.0.1:5000/predict", {
//         method: "POST",
//         headers: {
//           // Don't set Content-Type here, let the browser set it automatically for FormData
//           // Add any other headers as needed
//         },
//         body: formData,
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Error calling API: ${response.status} ${response.statusText}`
//         );
//       }

//       const apiResponse = await response.json();
//       console.log("API Response:", apiResponse);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleLogout = async () => {
//     try {
//       // Clear user authentication data from AsyncStorage
//       await AsyncStorage.removeItem("token");
//       // Additional cleanup if needed
//       navigation.navigate("LoginPage");
//     } catch (error) {
//       console.error("Error during logout:", error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
//         <Text style={styles.logoutButtonText}>Logout</Text>
//       </TouchableOpacity>
//       <Image
//         source={require("../../assets/AlzAware.png")}
//         style={{ width: 200, height: 60 }}
//       />
//       <Text
//         style={{
//           fontSize: 16,
//           marginLeft: -180,
//           marginBottom: -10,
//           color: "white",
//           fontWeight: "700",
//         }}
//       >
//         MRI Test:
//       </Text>
//       <TouchableOpacity onPress={openCamera} style={styles.iconContainer}>
//         <FontAwesome5 name="camera" size={80} color="yellow" />
//         <Text style={{ color: "white", fontWeight: "400", marginTop: 10 }}>
//           Open Camera to Upload Scan
//         </Text>
//       </TouchableOpacity>
//       <input
//         type="file"
//         ref={fileInputRef}
//         style={{ display: "none" }}
//         // onChange={handleFileInputChange}
//       />
//       {isLoading && <Text style={styles.loadingText}>Predicting...</Text>}
//       {prediction && (
//         <TouchableOpacity
//           onPress={() => navigation.navigate("ReportPage")}
//           style={styles.iconContainer}
//         >
//           <FontAwesome5 name="file" size={80} color="green" />
//           <Text style={{ color: "white", fontWeight: "400", marginTop: 10 }}>
//             View Report
//           </Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default DocumentPickerPage;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "space-evenly",
//     alignItems: "center",
//     backgroundColor: "#4477CE",
//   },
//   iconContainer: {
//     width: "80%",
//     alignItems: "center",
//     borderWidth: 4,
//     borderStyle: "dashed",
//     borderColor: "white",
//     padding: 30,
//     borderRadius: 20,
//     backgroundColor: "#6992d7",
//   },
//   logoutButton: {
//     position: "absolute",
//     top: 40,
//     right: 5,
//     padding: 10,
//     backgroundColor: "green",
//     borderRadius: 20,
//   },
//   logoutButtonText: {
//     color: "white",
//   },
//   loadingText: {
//     color: "white",
//     marginTop: 10,
//   },
// });

import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
// import axios from "axios";

const DocumentPickerPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);

  const handleImageChange = (event) => {
    setSelectedImage(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedImage);

      const response = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();
      setPredictionResult(responseData);

      // Log the response data to the console
      console.log("API Response:", responseData);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    // <div>
    //   <input type="file" accept="image/*" onChange={handleImageChange} />
    //   <button onClick={handleUpload}>Upload</button>

    //   {predictionResult && (
    //     <div>
    //       <p>Predicted Class: {predictionResult.message}</p>
    //       <p>
    //         Class Probabilities:{" "}
    //         {JSON.stringify(predictionResult.class_probabilities)}
    //       </p>
    //     </div>
    //   )}
    // </div>
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity> */}
      <Image
        source={require("../../assets/AlzAware.png")}
        style={{ width: 200, height: 60 }}
      />
      <Text
        style={{
          fontSize: 16,
          marginLeft: -180,
          marginBottom: -10,
          color: "white",
          fontWeight: "700",
        }}
      >
        MRI Test:
      </Text>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={handleUpload}>Upload</button>

        {predictionResult && (
          <div>
            <p style={{ fontSize: "38px" }}>
              <span style={{ fontSize: "48px" }}>Predicted Class:</span>{" "}
              {predictionResult.message}
            </p>
            <p>
              Class Probabilities:{" "}
              {JSON.stringify(predictionResult.class_probabilities)}
            </p>
          </div>
        )}
      </div>
    </View>
  );
};

export default DocumentPickerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#4477CE",
  },
  iconContainer: {
    width: "80%",
    alignItems: "center",
    borderWidth: 4,
    borderStyle: "dashed",
    borderColor: "white",
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#6992d7",
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
  loadingText: {
    color: "white",
    marginTop: 10,
  },
});
