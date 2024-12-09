import { Stack } from "expo-router";
import { AuthProvider } from "./AuthContext";

export default function LoginLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}
