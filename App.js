// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store"; // Import your Redux store
import LoginPage from "./pages/LoginPage/LoginPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
// import MainPage from "./pages/MainPage/MainPage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomNavigationComp from "./component/BottomNavigation/BottomNavigationComp";
import CommunityPage from "./pages/CommunityPage/CommunityPage";
import GetStartedPage from "./pages/GetStartedPage/GetStartedPage";
import DocumentPickerPage from "./pages/DocumentPickerPage/DocumentPickerPage";

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"GetStartedPage"}>
          <Stack.Screen
            name="LoginPage"
            component={LoginPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUpPage"
            component={SignUpPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="MainPage"
            component={BottomNavigationComp}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CommunityPage"
            component={CommunityPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GetStartedPage"
            component={GetStartedPage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DocumentPickerPage"
            component={DocumentPickerPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
