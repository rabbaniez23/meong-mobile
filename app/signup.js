import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Animated,
  Easing,
  Image,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { Colors } from "../constants/Colors";
import ScreenWrapper from "../components/ui/ScreenWrapper";
import Header from "../components/ui/Header";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { authService } from "../lib/auth";

export default function SignupScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  // Split Animations (No Opacity)
  const headerTranslateY = useRef(new Animated.Value(-100)).current;
  const formTranslateY = useRef(new Animated.Value(150)).current;

  useFocusEffect(
    useCallback(() => {
      // 1. Reset
      headerTranslateY.setValue(-100);
      formTranslateY.setValue(150);

      // 2. Play (Parallel Stagger)
      Animated.parallel([
        // Header Down
        Animated.timing(headerTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.back(1.5)),
          useNativeDriver: true,
        }),
        // Form Up
        Animated.timing(formTranslateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, [])
  );

  const handleSignup = async () => {
    if (!name || !email || !password) {
      Alert.alert("Error", "Mohon isi semua field yang wajib.");
      return;
    }

    setLoading(true);
    try {
      await authService.signUp(email, password, name);
      Alert.alert("Pendaftaran Berhasil", "Silakan login dengan akun barumu.", [
        { text: "OK", onPress: () => router.replace("/login") },
      ]);
    } catch (error) {
      Alert.alert(
        "Gagal Daftar",
        error.message || "Terjadi kesalahan saat mendaftar."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper backgroundColor={Colors.background}>
      <Header showBackBtn />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Header: Slides Down */}
          <Animated.View
            style={[
              styles.header,
              { transform: [{ translateY: headerTranslateY }] },
            ]}
          >
            <Image
              source={require("../assets/kucing.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Buat Akun Baru</Text>
            <Text style={styles.subtitle}>
              Gabung komunitas pecinta kucing terbesar!
            </Text>
          </Animated.View>

          {/* Form: Slides Up */}
          <Animated.View
            style={[
              styles.formContainer,
              { transform: [{ translateY: formTranslateY }] },
            ]}
          >
            <View style={styles.form}>
              <Input
                label="Nama Lengkap"
                placeholder="Contoh: Budi Santoso"
                icon="person-outline"
                value={name}
                onChangeText={setName}
              />
              <Input
                label="Email"
                placeholder="nama@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                icon="mail-outline"
                value={email}
                onChangeText={setEmail}
              />
              <Input
                label="Nomor Telepon"
                placeholder="0812xxxx"
                keyboardType="phone-pad"
                icon="call-outline"
                value={phone}
                onChangeText={setPhone}
              />
              <Input
                label="Password"
                placeholder="********"
                isPassword
                icon="lock-closed-outline"
                value={password}
                onChangeText={setPassword}
              />

              <Button
                title="Daftar Sekarang"
                onPress={handleSignup}
                variant="primary"
                isLoading={loading}
                style={{ marginTop: 20 }}
              />

              <View style={styles.footer}>
                <Text style={styles.footerText}>Sudah punya akun? </Text>
                <Button
                  title="Masuk di sini"
                  variant="ghost"
                  size="small"
                  onPress={() => router.push("/login")}
                  style={{ paddingHorizontal: 0, paddingVertical: 0 }}
                  textStyle={{ color: Colors.secondary }}
                />
              </View>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 40,
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 15,
    resizeMode: "contain",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.secondary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  form: {
    backgroundColor: Colors.white,
    padding: 30,
    borderRadius: 24,
    ...Colors.shadow,
    marginHorizontal: 0,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#666",
  },
});
