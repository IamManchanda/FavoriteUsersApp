import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider } from "react-redux";
import LoginScreen from "./src/screens/Login/LoginScreen";
import DashboardScreen from "./src/screens/Dashboard/DashboardScreen";
import DashboardHeaderTitle from "./src/components/Dashboard/DashboardHeaderTitle";
import { store } from "./src/store/store";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{
              headerTitleAlign: "center",
              headerTitle: DashboardHeaderTitle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
