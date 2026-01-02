import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, Alert, ScrollView, Modal, Animated, Easing, Dimensions } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors } from '../constants/Colors';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// LOADING OVERLAY WITH 3D DEPTH EFFECT
const LoadingOverlay = ({ visible }) => {
    const [progress, setProgress] = useState(0);
    const [statusText, setStatusText] = useState("Menghubungkan...");
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const scaleAnim = useRef(new Animated.Value(0.9)).current; // For 3D pop effect

    useEffect(() => {
        if (visible) {
            // Reset
            setProgress(0);
            setStatusText("Menghubungkan...");
            scaleAnim.setValue(0.9);

            // Animate In (Fade + Scale Up for 3D feel)
            Animated.parallel([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 400,
                    useNativeDriver: true,
                }),
                Animated.spring(scaleAnim, {
                    toValue: 1,
                    friction: 7,
                    tension: 40,
                    useNativeDriver: true,
                })
            ]).start();

            // Simulate Progress
            const timer = setInterval(() => {
                setProgress(oldP => {
                    const newP = oldP + Math.random() * 15;
                    if (newP > 100) return 100;
                    return newP;
                });
            }, 250);

            return () => clearInterval(timer);
        } else {
            fadeAnim.setValue(0);
        }
    }, [visible]);

    useEffect(() => {
        if (progress < 30) setStatusText("Menghubungkan ke server...");
        else if (progress < 60) setStatusText("Memverifikasi data akun...");
        else if (progress < 90) setStatusText("Menyiapkan profil...");
        else setStatusText("Berhasil masuk!");
    }, [progress]);

    if (!visible) return null;

    return (
        <Modal transparent animationType="none" visible={visible}>
            {/* Dark Backdrop */}
            <View style={styles.backdrop}>
                
                {/* 3D Card Container */}
                <Animated.View 
                    style={[
                        styles.card3D, 
                        { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }
                    ]}
                >
                    {/* Decorative Top Layer for Depth */}
                    <View style={styles.cardHeaderDecoration} />

                    <Image 
                        source={require('../assets/kucing.png')} 
                        style={styles.loaderLogo} 
                        resizeMode="contain"
                    />
                    
                    <Text style={styles.loadingTitle}>Meong ID</Text>
                    
                    {/* 3D Progress Bar */}
                    <View style={styles.progressTrackShadow}>
                        <View style={styles.progressTrack}>
                            <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                        </View>
                    </View>

                    <Text style={styles.progressText}>{Math.round(progress)}%</Text>
                    <Text style={styles.statusText}>{statusText}</Text>
                </Animated.View>

            </View>
        </Modal>
    );
};

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Split Animations (No Opacity)
  const headerTranslateY = useRef(new Animated.Value(-100)).current; 
  const formTranslateY = useRef(new Animated.Value(150)).current;   

  useFocusEffect(
    useCallback(() => {
      // 1. Reset Values
      headerTranslateY.setValue(-100);
      formTranslateY.setValue(150);

      // 2. Play Animation
      Animated.parallel([
          Animated.timing(headerTranslateY, {
              toValue: 0,
              duration: 800,
              easing: Easing.out(Easing.back(1.5)), 
              useNativeDriver: true,
          }),
          Animated.timing(formTranslateY, {
              toValue: 0,
              duration: 800,
              easing: Easing.out(Easing.cubic), 
              useNativeDriver: true,
          })
      ]).start();
    }, [])
  );

  const handleLogin = () => {
    if (email && password) {
      setIsLoading(true);
      
      setTimeout(() => {
        setIsLoading(false);
        router.replace('/(tabs)/adopsi'); 
      }, 3500); 
    } else {
      Alert.alert("Gagal", "Mohon isi email dan password.");
    }
  };

  return (
    <ScreenWrapper backgroundColor={Colors.background}>
      <LoadingOverlay visible={isLoading} />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        >
            <Animated.View style={[styles.header, { transform: [{ translateY: headerTranslateY }] }]}>
                <Image source={require('../assets/kucing.png')} style={styles.logo} />
                <Text style={styles.title}>Selamat Datang!</Text>
                <Text style={styles.subtitle}>Masuk untuk melanjutkan ke Meong id</Text>
            </Animated.View>

            <Animated.View style={[styles.formContainer, { transform: [{ translateY: formTranslateY }] }]}>
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
                      isLoading={false} 
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
            </Animated.View>

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
  formContainer: {
     width: '100%',
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
  
  // 3D LOADING OVERLAY STYLES
  backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)', // Dimmed background
      justifyContent: 'center',
      alignItems: 'center',
  },
  card3D: {
      width: '85%',
      backgroundColor: Colors.white,
      borderRadius: 24,
      padding: 30,
      alignItems: 'center',
      // Heavy Shadow for 3D Pop
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.00,
      elevation: 24,
      position: 'relative',
      overflow: 'hidden',
  },
  cardHeaderDecoration: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 8,
      backgroundColor: Colors.secondary, // Green strip on top
  },
  loaderLogo: {
      width: 70,
      height: 70,
      marginBottom: 20,
      marginTop: 10,
  },
  loadingTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 30,
  },
  progressTrackShadow: {
      width: '100%',
      height: 12,
      backgroundColor: '#EAEAEA',
      borderRadius: 6,
      // Inner shadow feel via borders maybe? keeping simple for RN
      marginBottom: 12,
      overflow: 'hidden',
  },
  progressTrack: {
      flex: 1,
      width: '100%',
  },
  progressBarFill: {
      height: '100%',
      backgroundColor: Colors.secondary,
      borderRadius: 6,
  },
  progressText: {
      fontSize: 16,
      fontWeight: '800',
      color: Colors.secondary,
      alignSelf: 'flex-end',
      marginBottom: 4,
  },
  statusText: {
      fontSize: 14,
      color: '#888',
  },
});