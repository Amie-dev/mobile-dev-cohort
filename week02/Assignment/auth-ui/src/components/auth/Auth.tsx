import { View, StyleSheet } from "react-native";
import React, { useState } from "react";

import Login from "./SignIn";
import SignUp from "./SignUp";

type AuthProps = {
  isAuth: boolean;
  setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
};

const Auth = ({ isAuth, setIsAuth }: AuthProps) => {
  const [isLogIn, setIsLogIn] = useState(true);

  return (
    <View style={styles.container}>
      {isLogIn ? (
        <Login
          isLogIn={isLogIn}
          setIsLogIn={setIsLogIn}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
      ) : (
        <SignUp
          isLogIn={isLogIn}
          setIsLogIn={setIsLogIn}
          isAuth={isAuth}
          setIsAuth={setIsAuth}
        />
      )}
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});