import * as React from "react";
import { BottomNavigation } from "react-native-paper";
import MainPage from "../../pages/MainPage/MainPage";

// import ReportComponent from "./ReportComponent";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"; // Import FontAwesome5
import DocumentPickerPage from "../../pages/DocumentPickerPage/DocumentPickerPage";
import ReportPage from "../../pages/ReportPage/ReportPage";
import CommunityPage from "../../pages/CommunityPage/CommunityPage";
// import SetReminder from "./SetReminder";

const HomeRoute = () => <MainPage />;
const DocumentRoute = () => <DocumentPickerPage />;
const ReportRoute = () => <ReportPage />;
const CommunityRoute = () => <CommunityPage />;
// ...

const BottomNavigationComp = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {
      key: "home",
      title: "Home",
      focusedIcon: "home",
    },
    {
      key: "camera",
      title: "Camera",
      focusedIcon: "camera",
    },

    { key: "report", title: "Report", focusedIcon: "file" },
    {
      key: "community",
      title: "Community",
      focusedIcon: "users",
    }, // Corrected key
    {
      key: "more",
      title: "More",
      focusedIcon: "ellipsis-v", // Font Awesome icon name
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    camera: DocumentRoute,
    report: ReportRoute,
    community: CommunityRoute,
    // more: ReportRoute,
    // ...
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // Set focused icons using the `focused` prop
      renderIcon={({ route, focused }) => (
        <FontAwesome5
          name={route.focusedIcon}
          size={18}
          color={focused ? "#6200EE" : "#888"}
        />
      )}
    />
  );
};

export default BottomNavigationComp;
