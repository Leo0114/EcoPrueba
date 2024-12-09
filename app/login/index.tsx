import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from "react-native";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { loginUser } from "@/api/login";
import { Redirect } from "expo-router";
import {
  TextInput,
  Button,
  ActivityIndicator,
  useTheme,
} from "react-native-paper";

const LoginScreen: React.FC = () => {
  const [correo, setCorreo] = useState("");
  const [pwd, setPwd] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const theme = useTheme();

  const handleLogin = async () => {
    try {
      const response = await loginUser({ correo, pwd });
      if (response.cveRespuesta === 1) {
        setIsLoggedIn(true);
      } else {
        Alert.alert("Error", "Credenciales incorrectas.");
      }
    } catch (error: any) {
      Alert.alert("Error", error.message);
    }
  };

  if (isLoggedIn) {
    return <Redirect href={"/(tabs)"} />;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ThemedView
        style={stlyes.container}
        lightColor={"#657c74"}
        darkColor={undefined}
      >
        <KeyboardAvoidingView behavior="position" style={{ width: "80%" }}>
          <ScrollView contentContainerStyle={stlyes.scrollContainer}>
            <Image
              style={stlyes.logo}
              source={require("../../assets/logo.png")}
            />
            <TextInput
              label={"Correo"}
              style={stlyes.input}
              mode="outlined"
              value={correo}
              onChangeText={setCorreo}
            />

            <TextInput
              label={"Contraseña"}
              mode="outlined"
              style={stlyes.input}
              secureTextEntry
              value={pwd}
              onChangeText={setPwd}
            />

            {isLoggedIn ? (
              <ActivityIndicator animating={true} size="large" />
            ) : (
              <Button
                style={stlyes.button}
                mode="contained"
                buttonColor={theme.colors.primary}
                onPress={handleLogin}
              >
                <ThemedText style={{ color: "white" }}>
                  Iniciar sesión
                </ThemedText>
              </Button>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

const stlyes = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  input: {
    width: "100%",
    marginBottom: 16,
    borderRadius: 8,
  },
  button: {
    width: "100%",
    marginBottom: 24,
  },
  logo: {
    width: 240,
    height: 120,
    marginBottom: 32,
  },
});

export default LoginScreen;
