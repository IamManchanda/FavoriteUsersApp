import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from "react-native";
import UserCard from "./UserCard";
import { UserApiResponse, SimplifiedUser } from "../../../types/user";
import { getSimplifiedUsers } from "../../../utils/users";
import { CONFIG } from "../../../constants/config";

const UserList: React.FC = () => {
  const [users, setUsers] = useState<SimplifiedUser[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchUsers = async (refresh = false) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    const nextPage = refresh ? 1 : page;

    try {
      const response = await fetch(
        `${CONFIG.RANDOM_USERS_API_URL}/?results=10&page=${nextPage}`,
      );
      const data: UserApiResponse = await response.json();
      const simplifiedUsers = getSimplifiedUsers(data.results);
      setUsers((prevUsers) =>
        refresh ? simplifiedUsers : [...prevUsers, ...simplifiedUsers],
      );
      setPage(nextPage + 1);
      setHasMore(data.results.length > 0 && nextPage < 9);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleLoadMore = () => {
    if (hasMore && !isLoading) {
      fetchUsers();
    }
  };

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    fetchUsers(true).then(() => {
      setIsRefreshing(false);
    });
  }, []);

  const renderFooter = () => {
    if (!isLoading) {
      return null;
    }

    return <ActivityIndicator size="large" style={styles.activityIndicator} />;
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.login.uuid}
        renderItem={({ item }) => <UserCard user={item} />}
        ListFooterComponent={renderFooter}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicator: {
    margin: 20,
  },
});

export default UserList;
