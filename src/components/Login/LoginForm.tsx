import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { APP_COLORS } from "../../constants/colors";
import { CONFIG } from "../../constants/config";
import { LoginNavigationProps } from "../../types/navigation";
import { LoginInputFields, LoginInputState } from "../../types/input";

type LoginFormProps = {
  navigation: LoginNavigationProps;
};

const LoginForm: React.FC<LoginFormProps> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocused, setIsFocused] = useState<LoginInputState>({
    email: false,
    password: false,
  });

  const handleLogin = () => {
    if (email === CONFIG.LOGIN_EMAIL && password === CONFIG.LOGIN_PASSWORD) {
      navigation.replace("Dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  const handleFocus = (field: LoginInputFields) => {
    return setIsFocused({ ...isFocused, [field]: true });
  };

  const handleBlur = (field: LoginInputFields) => {
    return setIsFocused({ ...isFocused, [field]: false });
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(String(email).toLowerCase());
  };

  const isFormValid = () => {
    return validateEmail(email) && password.length >= 6;
  };

  const logo = require("../../../assets/logo.png");

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.loginCard}>
        <View style={styles.logoContainer}>
          <Image source={logo} style={styles.logo} />
        </View>
        <Text style={styles.loginText}>LOGIN</Text>
        <View
          style={[
            styles.inputContainer,
            isFocused.email && styles.isFocusedInputContainer,
          ]}
        >
          <Feather
            name="mail"
            size={24}
            style={[styles.icon, isFocused.email && styles.isFocussedIcon]}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            onFocus={() => handleFocus("email")}
            onBlur={() => handleBlur("email")}
            selectionColor={APP_COLORS.primary}
          />
        </View>
        <View
          style={[
            styles.inputContainer,
            isFocused.password && styles.isFocusedInputContainer,
          ]}
        >
          <Feather
            name="lock"
            size={24}
            style={[styles.icon, isFocused.password && styles.isFocussedIcon]}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
            onFocus={() => handleFocus("password")}
            onBlur={() => handleBlur("password")}
            selectionColor={APP_COLORS.primary}
          />
        </View>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, !isFormValid() && styles.buttonDisabled]}
          disabled={!isFormValid()}
        >
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: APP_COLORS.backgroundLight,
  },
  loginCard: {
    width: "90%",
    backgroundColor: APP_COLORS.white,
    elevation: 10,
    shadowColor: APP_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderRadius: 10,
    alignItems: "center",
    paddingTop: 45,
    paddingHorizontal: 15,
    paddingBottom: 90,
  },
  logoContainer: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 30,
    marginTop: -80,
    padding: 15,
    zIndex: 2,
  },
  logo: {
    width: 50,
    height: 50,
    marginBottom: 20,
  },
  loginText: {
    fontSize: 24,
    fontWeight: "bold",
    color: APP_COLORS.greyDark,
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: APP_COLORS.white,
    borderBottomWidth: 1,
    borderColor: APP_COLORS.greyLight,
    paddingHorizontal: 15,
    marginVertical: 10,
  },
  isFocusedInputContainer: {
    borderColor: APP_COLORS.primary,
  },
  icon: {
    marginRight: 10,
    color: "grey",
  },
  isFocussedIcon: {
    color: APP_COLORS.primary,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    paddingLeft: 10,
  },
  button: {
    width: "100%",
    backgroundColor: APP_COLORS.primary,
    padding: 12,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: APP_COLORS.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: APP_COLORS.grey,
  },
});

export default LoginForm;
