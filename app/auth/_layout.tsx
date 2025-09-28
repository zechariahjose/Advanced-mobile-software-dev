import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="spotify" />
      <Stack.Screen name="signup" />
    </Stack>
  );
}
