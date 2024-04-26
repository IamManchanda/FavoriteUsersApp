import React from "react";
import LoginForm from "../../components/Login/LoginForm";
import { LoginNavigationProps } from "../../types/navigation";

type LoginScreenProps = {
  navigation: LoginNavigationProps;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  return <LoginForm navigation={navigation} />;
};

export default LoginScreen;
