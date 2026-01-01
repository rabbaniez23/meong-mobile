import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/(tabs)/adopsi'); 
      }, 1500);
    } else {
      Alert.alert("Gagal", "Mohon isi email dan password.");
    }
  };

  return (
    <ScreenWrapper backgroundColor={Colors.background}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
          <View style={styles.header}>
            <Image source={require('../assets/icon.png')} style={styles.logo} />
            <Text style={styles.title}>Selamat Datang!</Text>
            <Text style={styles.subtitle}>Masuk untuk melanjutkan ke Meong id</Text>
          </View>

          <View style={styles.form}>
            <Input 
              label="Email"
              placeholder="nama@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              icon="mail-outline"
            />
            
            <Input 
              label="Password"
              placeholder="********" 
              isPassword
              value={password}
              onChangeText={setPassword}
              icon="lock-closed-outline"
            />

            <Button 
                title="Lupa Password?" 
                variant="ghost" 
                size="small" 
                style={styles.forgotBtn}
                textStyle={{ color: Colors.primary }}
                onPress={() => {}}
            />

            <Button 
              title="Masuk" 
              onPress={handleLogin}
              isLoading={isLoading}
              style={{ marginTop: 10 }}
            />

            <View style={styles.footer}>
              <Text style={styles.footerText}>Belum punya akun? </Text>
              <Button 
                title="Daftar Sekarang" 
                variant="ghost" 
                size="small"
                onPress={() => router.push('/signup')}
                style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                textStyle={{ color: Colors.secondary }}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 90,
    height: 90,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 24,
    ...Colors.shadow,
  },
  forgotBtn: {
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  footerText: {
    color: '#666',
  },
});