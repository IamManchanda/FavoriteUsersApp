import React from "react";
import { StyleSheet, Image } from "react-native";

const logo = require("../../../assets/logo.png");

const DashboardHeaderTitle: React.FC = () => {
  return <Image source={logo} style={styles.image} resizeMode="contain" />;
};

const styles = StyleSheet.create({
  image: {
    width: 30,
    height: 30,
  },
});

export default DashboardHeaderTitle;
