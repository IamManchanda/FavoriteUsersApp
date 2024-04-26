import React from "react";
import { useSelector } from "react-redux";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { RootState } from "../../../store/store";
import FavoriteUserCard from "./FavoriteUserCard";
import { APP_COLORS } from "../../../constants/colors";

const FavoriteUserList: React.FC = () => {
  const favorites = useSelector((state: RootState) => state.user.favorites);

  if (favorites.length === 0) {
    return (
      <View style={[styles.container, styles.noUsersContainers]}>
        <Text style={styles.text}>No favorite users yet!</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item }) => <FavoriteUserCard user={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: APP_COLORS.greyLighter,
    borderTopWidth: 1,
  },
  noUsersContainers: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FavoriteUserList;
