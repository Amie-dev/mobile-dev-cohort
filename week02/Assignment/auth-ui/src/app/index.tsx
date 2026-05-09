import { StyleSheet } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import Auth from "@/components/auth/Auth";
import ForgotPassword from "@/components/ForgotPassword";

const Index = () => {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      {isAuth ? (
        <Auth
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
      ) : (
        <ForgotPassword
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
      )}
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});