import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import FontAwesome from "@expo/vector-icons/FontAwesome";

type AuthProps = {
  isLogIn: boolean;
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const Login = ({ isLogIn,setIsLogIn, isAuth,setIsAuth }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* LOGO */}
          <AntDesign name="slack" size={58} color="#84D60D" />

          {/* TITLE */}
          <Text style={styles.title}>Sign In</Text>

          <Text style={styles.subtitle}>
            Let&apos;s experience the joy of telecare AI.
          </Text>

          {/* EMAIL */}
          <Text style={styles.label}>Email Address</Text>

          <View style={[styles.inputBox, styles.activeInput]}>
            <Feather name="mail" size={22} color="#3b3b3b" />

            <TextInput
              style={styles.input}
              placeholder="Enter your email..."
              placeholderTextColor="#8c8c8c"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* PASSWORD */}
          <Text style={styles.label}>Password</Text>

          <View style={styles.inputBox}>
            <Feather name="lock" size={22} color="#3b3b3b" />

            <TextInput
              style={styles.input}
              placeholder="Enter your password..."
              placeholderTextColor="#8c8c8c"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <Feather name="eye-off" size={22} color="#b7b7b7" />
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Sign In</Text>

            <AntDesign name="arrow-right" size={24} color="#fff" />
          </TouchableOpacity>

          {/* SOCIAL LOGIN */}
          <View style={styles.socialContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <FontAwesome name="facebook" size={26} color="#3b3b3b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="google" size={24} color="#3b3b3b" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialButton}>
              <AntDesign name="instagram" size={24} color="#3b3b3b" />
            </TouchableOpacity>
          </View>

          {/* FOOTER */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don&apos;t have an account?{" "}
            </Text>

            <TouchableOpacity onPress={() => setIsLogIn(!isLogIn)}>
              <Text style={styles.link}>Sign Up.</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => setIsAuth(!isAuth)}>
            <Text style={styles.forgotText}>Forgot your password?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  scrollContent: {
    flexGrow: 1,
  },

  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 55,
    paddingBottom: 30,
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },

  title: {
    marginTop: 20,
    fontSize: 34,
    fontWeight: "800",
    color: "#2d3532",
  },

  subtitle: {
    marginTop: 8,
    marginBottom: 28,
    fontSize: 17,
    color: "#7d7d7d",
    textAlign: "center",
  },

  label: {
    width: "100%",
    marginBottom: 8,
    fontSize: 15,
    fontWeight: "700",
    color: "#414844",
  },

  inputBox: {
    width: "100%",
    height: 60,
    borderRadius: 22,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    marginBottom: 20,

    flexDirection: "row",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: 5,
    },

    elevation: 4,
  },

  activeInput: {
    borderWidth: 2,
    borderColor: "#B6E34B",
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },

  button: {
    width: "100%",
    height: 60,
    borderRadius: 22,
    backgroundColor: "#84D60D",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,

    marginTop: 5,
  },

  buttonText: {
    fontSize: 18,
    fontWeight: "800",
    color: "#fff",
  },

  socialContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 42,
  },

  socialButton: {
    width: 58,
    height: 58,
    borderRadius: 18,
    backgroundColor: "#fff",

    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderColor: "#d8d8d8",
  },

  footer: {
    flexDirection: "row",
    marginTop: 36,
    alignItems: "center",
  },

  footerText: {
    fontSize: 15,
    color: "#444",
  },

  link: {
    fontSize: 15,
    color: "#84D60D",
    fontWeight: "800",
  },

  forgotText: {
    marginTop: 16,
    fontSize: 15,
    color: "#84D60D",
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});