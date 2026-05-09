import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";

type AuthProps = {
  isLogIn: boolean;
  setIsLogIn: React.Dispatch<React.SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const SignUp = ({isLogIn, setIsLogIn }: AuthProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const isPasswordNotMatch =
    confirmPassword.length > 0 && password !== confirmPassword;

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
          <AntDesign name="slack" size={58} color="#7ED800" />

          <Text style={styles.title}>Sign Up For Free</Text>
          <Text style={styles.subtitle}>Sign up in 1 minute for free!</Text>

          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputBox}>
            <Feather name="mail" size={22} color="#4b5563" />
            <TextInput
              style={styles.input}
              placeholder="Enter your email..."
              placeholderTextColor="#8b8b8b"
              // keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <Text style={styles.label}>Password</Text>
          <View
           style={[styles.inputBox, isPasswordNotMatch && styles.errorInput]}
          //  style={styles.inputBox}
           >
            <Feather name="lock" size={22} color="#4b5563" />
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor="#8b8b8b"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <Feather name="eye" size={20} color="#b8b8b8" />
          </View>

          <Text style={styles.label}>Password Confirmation</Text>
          <View style={styles.inputBox}>
            <Feather name="lock" size={22} color="#4b5563" />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              placeholderTextColor="#8b8b8b"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <Feather name="eye" size={20} color="#b8b8b8" />
          </View>

          {isPasswordNotMatch && (
            <View style={styles.errorBox}>
              <AntDesign name="warning" size={18} color="#ff4d6d" />
              <Text style={styles.errorText}>ERROR: Password do not match!</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.button,
              isPasswordNotMatch && styles.buttonDisabled,
            ]}
            disabled={isPasswordNotMatch}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
            <AntDesign name="arrow-right" size={24} color="#fff" />
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => setIsLogIn(!isLogIn)}>
              <Text style={styles.loginText}>Sign In.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

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
    backgroundColor: "#f4f4f4",
    alignItems: "center",
  },

  title: {
    marginTop: 20,
    fontSize: 32,
    fontWeight: "800",
    color: "#2f3a35",
    textAlign: "center",
  },

  subtitle: {
    marginTop: 12,
    marginBottom: 35,
    fontSize: 16,
    color: "#8a8f8c",
    textAlign: "center",
  },

  label: {
    width: "100%",
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "700",
    color: "#414844",
  },

  inputBox: {
    width: "100%",
    height: 58,
    borderRadius: 22,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    marginBottom: 22,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 5,
  },

  errorInput: {
    // borderWidth: 2,
    borderColor: "#ff8fab",
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#333",
  },

  errorBox: {
    width: "100%",
    minHeight: 48,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#ff6b8a",
    backgroundColor: "#ffe9ee",
    paddingHorizontal: 14,
    marginTop: -10,
    marginBottom: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  errorText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3f3f3f",
  },

  button: {
    width: "100%",
    height: 58,
    borderRadius: 20,
    backgroundColor: "#7ED800",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
    marginTop: 2,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
  },

  footer: {
    marginTop: 30,
    flexDirection: "row",
    alignItems: "center",
  },

  footerText: {
    color: "#4b5563",
    fontSize: 14,
  },

  loginText: {
    color: "#7ED800",
    fontSize: 14,
    fontWeight: "800",
    textDecorationLine: "underline",
  },
});