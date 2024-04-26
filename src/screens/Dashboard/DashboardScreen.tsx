import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./Home/HomeScreen";
import FavoriteScreen from "./Favorite/FavoriteScreen";
import DashboardBottomTabBar from "../../components/Dashboard/DashboardBottomTabBar";

const Tab = createBottomTabNavigator();

const DashboardScreen: React.FC = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <DashboardBottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Favorite" component={FavoriteScreen} />
    </Tab.Navigator>
  );
};

export default DashboardScreen;
