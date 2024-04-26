import { SimplifiedUser, User } from "../types/user";

/**
 * Simplifies the user data to only include the necessary fields.
 * So that the redux store is not bloated with unnecessary data.
 */
export const getSimplifiedUsers = (users: User[]): SimplifiedUser[] => {
  return users.map((user) => {
    const { name, location, login, picture } = user;
    return {
      name: {
        first: name.first,
        last: name.last,
      },
      location: {
        city: location.city,
        state: location.state,
        country: location.country,
      },
      login: {
        uuid: login.uuid,
      },
      picture: {
        large: picture.large,
      },
    };
  });
};
