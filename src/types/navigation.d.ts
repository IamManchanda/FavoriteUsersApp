import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Login: undefined;
  Dashboard: undefined;
};

export type LoginNavigationProps = StackNavigationProp<
  RootStackParamList,
  "Login"
>;
