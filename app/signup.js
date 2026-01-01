import React, { useState } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function SignupScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setLoading(true);
    // Simulate Signup
    setTimeout(() => {
        setLoading(false);
        Alert.alert("Pendaftaran Berhasil", "Silakan login dengan akun barumu.", [
            { text: "OK", onPress: () => router.replace('/login') }
        ]);
    }, 1500);
  };

  return (
    <ScreenWrapper backgroundColor={Colors.background}>
        <Header showBackBtn />
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
            <Text style={styles.title}>Buat Akun Baru</Text>
            <Text style={styles.subtitle}>Gabung komunitas pecinta kucing terbesar!</Text>
            </View>

            <View style={styles.form}>
            <Input label="Nama Lengkap" placeholder="Contoh: Budi Santoso" icon="person-outline" />
            <Input label="Email" placeholder="nama@email.com" keyboardType="email-address" icon="mail-outline" />
            <Input label="Nomor Telepon" placeholder="0812xxxx" keyboardType="phone-pad" icon="call-outline" />
            <Input label="Password" placeholder="********" isPassword icon="lock-closed-outline" />

            <Button 
                title="Daftar Sekarang"
                onPress={handleSignup}
                variant="secondary"
                isLoading={loading}
                style={{ marginTop: 20 }}
            />

            <View style={styles.footer}>
                <Text style={styles.footerText}>Sudah punya akun? </Text>
                <Button 
                    title="Masuk di sini" 
                    variant="ghost" 
                    size="small"
                    onPress={() => router.push('/login')}
                    style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                    textStyle={{ color: Colors.primary }}
                />
            </View>
            </View>
        </ScrollView>
        </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
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
  },
  form: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 24,
    ...Colors.shadow,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
  },
});