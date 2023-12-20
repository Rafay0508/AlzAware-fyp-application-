import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ReportPage = ({ patientData }) => {
  const navigation = useNavigation();

  const generatePDF = async () => {
    const htmlContent = `
      <h1 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Alzheimer's Report</h1>
      <p><strong style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">Patient's Name:</strong> hello world</p>
      <p><strong style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">Detected Stage:</strong> FN JPEG</p>
    `;

    try {
      const options = {
        html: htmlContent,
        fileName: "AlzheimerReport",
        directory: "Documents",
      };

      const file = await RNHTMLtoPDF.convert(options);
      console.log(file.filePath); // Path to the generated PDF file
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

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
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        style={{ position: "absolute", top: 20, right: 20 }}
        onPress={handleLogout}
      >
        <Text style={{ color: "red", fontSize: 18 }}>Logout</Text>
      </TouchableOpacity>

      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 20 }}>
        Alzheimer's Report
      </Text>

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          Patient's Name:
        </Text>
        <Text style={{ fontSize: 16 }}>HELLO WORLD</Text>
      </View>

      <View style={{ marginBottom: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 5 }}>
          Detected Stage:
        </Text>
        <Text style={{ fontSize: 16 }}>FN JPEG</Text>
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: "#3498db",
          padding: 10,
          borderRadius: 5,
          marginTop: 20,
          alignItems: "center",
        }}
        onPress={generatePDF}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Download PDF</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ReportPage;
