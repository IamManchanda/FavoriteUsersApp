import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { Entypo, AntDesign } from "@expo/vector-icons";
import { SimplifiedUser } from "../../../types/user";
import { RootState } from "../../../store/store";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../../store/reducers/userReducer";
import { getRandomBadges } from "../../../utils/badges";
import { Badge } from "../../../types/badge";
import { APP_COLORS } from "../../../constants/colors";

type UserCardProps = {
  user: SimplifiedUser;
};

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const { name, picture, location } = user;
  const fullName = `${name.first} ${name.last}`;
  const { city, state, country } = location;
  const locationText = `${state || city}, ${country}`;
  const [randomBadges, setRandomBadges] = useState<Badge[]>([]);

  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const isFavorite = favorites.some(
    (fav) => fav.login.uuid === user.login.uuid,
  );

  const handlePress = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(user.login.uuid));
    } else {
      dispatch(addToFavorites(user));
    }
  };

  useEffect(() => {
    setTimeout(() => {
      // Delay badge generation with setTimeout to avoid multiple re-renders
      setRandomBadges(getRandomBadges(1, 3));
    }, 0);
  }, []);

  return (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: picture.large }} style={styles.image} />
        <View style={styles.info}>
          <Text style={styles.name}>{`${fullName}`}</Text>
          <View style={styles.locationContainer}>
            <Entypo
              name="location-pin"
              size={15}
              color={APP_COLORS.greyDarker}
            />
            <Text style={styles.locationText}>{locationText}</Text>
          </View>
          <View style={styles.badgesContainer}>
            {randomBadges.map((badge) => (
              <View
                key={badge.title}
                style={[styles.badge, { backgroundColor: badge.color }]}
              >
                <Text style={styles.badgeText}>{badge.title}</Text>
              </View>
            ))}
          </View>
        </View>
        <Pressable
          onPress={handlePress}
          style={({ pressed }) => [
            styles.favoriteButtonToggle,
            pressed && styles.pressed,
          ]}
        >
          <AntDesign
            name={isFavorite ? "star" : "staro"}
            size={24}
            color="red"
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "flex-end",
  },
  card: {
    width: "90%",
    flexDirection: "row",
    paddingRight: 10,
    paddingVertical: 15,
    backgroundColor: APP_COLORS.white,
    marginVertical: 5,
    marginRight: 10,
    borderRadius: 10,
  },
  image: {
    width: 65,
    height: 65,
    borderRadius: 30,
    left: -15,
    zIndex: 2,
    borderWidth: 2,
    borderColor: APP_COLORS.white,
  },
  info: {
    justifyContent: "flex-start",
  },
  name: {
    fontWeight: "bold",
    marginBottom: 3,
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  locationText: {
    color: APP_COLORS.greyDarker,
    fontSize: 12,
  },
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  badge: {
    borderRadius: 4,
    paddingVertical: 2,
    paddingHorizontal: 6,
    margin: 2,
  },
  badgeText: {
    color: "white",
    fontSize: 12,
  },
  favoriteButtonToggle: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "flex-start",
    top: 2,
  },
  pressed: {
    opacity: 0.7,
  },
});

export default UserCard;
