import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/providers/AuthProvider";
export default function AuthLayout() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/(protected)/" />;
  }

  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
      <Stack.Screen name="verification" options={{ headerShown: false }} />
    </Stack>
  );
}
