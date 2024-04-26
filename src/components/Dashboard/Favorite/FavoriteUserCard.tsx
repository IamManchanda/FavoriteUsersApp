import React from "react";
import { useDispatch } from "react-redux";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SimplifiedUser } from "../../../types/user";
import { removeFromFavorites } from "../../../store/reducers/userReducer";
import { APP_COLORS } from "../../../constants/colors";

type FavoriteUserCardProps = {
  user: SimplifiedUser;
};

const FavoriteUserCard: React.FC<FavoriteUserCardProps> = ({ user }) => {
  const { name, picture } = user;
  const fullName = `${name.first} ${name.last}`;
  const dispatch = useDispatch();

  const handleUnfavorite = () => {
    dispatch(removeFromFavorites(user.login.uuid));
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: picture.large }} style={styles.image} />
      <Text style={styles.name}>{fullName}</Text>
      <Pressable onPress={handleUnfavorite} style={styles.unfavoriteButton}>
        <AntDesign name="star" size={24} color={APP_COLORS.primary} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: APP_COLORS.white,
    borderRadius: 5,
    borderBottomColor: APP_COLORS.greyLighter,
    borderBottomWidth: 1,
  },
  image: {
    width: 35,
    height: 35,
    borderRadius: 30,
  },
  name: {
    flex: 1,
    marginLeft: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  unfavoriteButton: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
});

export default FavoriteUserCard;
