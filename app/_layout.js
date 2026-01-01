import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Welcome & Auth */}
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      
      {/* Main App (Tabs) */}
      <Stack.Screen name="(tabs)" />
      
      {/* Fitur Tambahan (Full Screen) */}
      <Stack.Screen name="edit-profile" options={{ presentation: 'modal' }} /> 
      {/* presentation: 'modal' bikin efek muncul dari bawah (optional) */}
    </Stack>
  );
}