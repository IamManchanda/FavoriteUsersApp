import React from "react";
import { View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { APP_COLORS } from "../../constants/colors";

interface DashboardBottomTabBarProps extends BottomTabBarProps {}

const DashboardBottomTabOptions = ["Home", "Favorite"];

const DashboardBottomTabBar: React.FC<DashboardBottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.tabContainer}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label = route.name;

        if (!DashboardBottomTabOptions.includes(label)) {
          return null;
        }

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            accessibilityState={isFocused ? { selected: true } : {}}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.tab}
          >
            {label === "Home" ? (
              <Ionicons
                name={isFocused ? "home" : "home-outline"}
                size={24}
                color={APP_COLORS.primary}
              />
            ) : (
              <AntDesign
                name={isFocused ? "star" : "staro"}
                size={24}
                color={APP_COLORS.primary}
              />
            )}
            {label && <Text style={styles.label}>{label}</Text>}
            {isFocused && <View style={styles.activeTabIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    height: 80,
    backgroundColor: APP_COLORS.white,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  tab: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 15,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  label: {
    fontSize: 12,
    color: APP_COLORS.primary,
  },
  activeTabIndicator: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 3,
    backgroundColor: APP_COLORS.primary,
  },
});

export default DashboardBottomTabBar;
