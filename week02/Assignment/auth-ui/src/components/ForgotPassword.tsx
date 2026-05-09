import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

type ForgotPasswordProps = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const ForgotPassword = ({ isAuth,setIsAuth }: ForgotPasswordProps) => {
  const [selectedMethod, setSelectedMethod] = useState("2fa");

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => setIsAuth(!isAuth)}>
        <Feather name="chevron-left" size={30} color="#2d3532" />
      </TouchableOpacity>

      {/* Header */}
      <Text style={styles.title}>Forgot Password</Text>
      <Text style={styles.subtitle}>
        Select which methods you&apos;d like to reset.
      </Text>

      {/* Options */}
      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedMethod === "email" && styles.activeCard,
        ]}
        onPress={() => setSelectedMethod("email")}
      >
        <View style={styles.iconBox}>
          <Feather name="mail" size={24} color="#6b746e" />
        </View>

        <View>
          <Text style={styles.optionTitle}>Email Address</Text>
          <Text style={styles.optionText}>Send via email address securely.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedMethod === "2fa" && styles.activeCard,
        ]}
        onPress={() => setSelectedMethod("2fa")}
      >
        <View style={[styles.iconBox, styles.activeIconBox]}>
          <Feather name="smartphone" size={24} color="#84D60D" />
        </View>

        <View>
          <Text style={styles.optionTitle}>2 Factor Authentication</Text>
          <Text style={styles.optionText}>Send via 2FA securely.</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.optionCard,
          selectedMethod === "google" && styles.activeCard,
        ]}
        onPress={() => setSelectedMethod("google")}
      >
        <View style={styles.iconBox}>
          <Feather name="lock" size={24} color="#6b746e" />
        </View>

        <View>
          <Text style={styles.optionTitle}>Google Authenticator</Text>
          <Text style={styles.optionText}>Send via authenticator securely.</Text>
        </View>
      </TouchableOpacity>

      {/* Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Reset Password</Text>
        <AntDesign  name="arrow-right" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Big Lock */}
      <Feather name="lock" size={120} color="#e4e4e4" style={styles.bigLock} />
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 35,
    backgroundColor: "#f4f4f4",
  },

  backButton: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: "#e9e9e9",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 60,
  },

  title: {
    fontSize: 34,
    fontWeight: "800",
    color: "#2d3532",
    marginBottom: 14,
  },

  subtitle: {
    fontSize: 16,
    color: "#7d7d7d",
    marginBottom: 34,
  },

  optionCard: {
    width: "100%",
    minHeight: 86,
    borderRadius: 28,
    backgroundColor: "#fff",
    paddingHorizontal: 14,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 4,
  },

  activeCard: {
    // borderWidth: 2,
    borderColor: "#9BE24A",
  },

  iconBox: {
    width: 62,
    height: 62,
    borderRadius: 22,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },

  activeIconBox: {
    backgroundColor: "#ECFFD7",
  },

  optionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#34403a",
    marginBottom: 6,
  },

  optionText: {
    fontSize: 14,
    color: "#7d7d7d",
  },

  button: {
    width: "100%",
    height: 58,
    borderRadius: 20,
    backgroundColor: "#84D60D",
    marginTop: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 14,
  },

  buttonText: {
    fontSize: 17,
    fontWeight: "800",
    color: "#fff",
  },

  bigLock: {
    position: "absolute",
    left: 25,
    bottom: 0,
    opacity: 0.7,
  },
});