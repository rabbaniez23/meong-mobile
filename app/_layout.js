import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Halaman Welcome (index.js) */}
      <Stack.Screen name="index" />
      
      {/* Halaman Login & Signup */}
      <Stack.Screen name="login" />
      <Stack.Screen name="signup" />
      
      {/* Masuk ke Folder Tabs (Halaman Utama Member) */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}