import React, { useRef, useCallback, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors } from '../constants/Colors';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Button from '../components/ui/Button';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const GlitchText = ({ text1, text2, style, interval = 3000 }) => {
    const [currentText, setCurrentText] = useState(text1);
    const opacityAnim = useRef(new Animated.Value(1)).current;
    
    // Tiny shake animation for the glitch feel
    const translateXAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const cycle = setInterval(() => {
            // Glitch Sequence
            Animated.sequence([
                // 1. Shake & Flicker Out
                Animated.parallel([
                    Animated.sequence([ 
                        Animated.timing(opacityAnim, { toValue: 0.2, duration: 50, useNativeDriver: true }),
                        Animated.timing(opacityAnim, { toValue: 0.8, duration: 50, useNativeDriver: true }),
                        Animated.timing(opacityAnim, { toValue: 0, duration: 60, useNativeDriver: true }),
                    ]),
                    Animated.sequence([
                        Animated.timing(translateXAnim, { toValue: 2, duration: 40, useNativeDriver: true }),
                        Animated.timing(translateXAnim, { toValue: -2, duration: 40, useNativeDriver: true }),
                        Animated.timing(translateXAnim, { toValue: 0, duration: 40, useNativeDriver: true }),
                    ])
                ]),
                // 2. Swap Text
                Animated.delay(50), 
            ]).start(() => {
                setCurrentText(prev => prev === text1 ? text2 : text1);

                // 3. Flicker In
                Animated.sequence([
                    Animated.timing(opacityAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
                ]).start();
            });

        }, interval);

        return () => clearInterval(cycle);
    }, [text1, text2, interval]);

    return (
        <Animated.View style={{ opacity: opacityAnim, transform: [{ translateX: translateXAnim }] }}>
            <Text style={style}>
                {currentText}
            </Text>
        </Animated.View>
    );
};

export default function WelcomeScreen() {
  const router = useRouter();

  // Animation Values
  const imageScale = useRef(new Animated.Value(0)).current; 
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const contentTranslateY = useRef(new Animated.Value(50)).current; 

  useFocusEffect(
    useCallback(() => {
      imageScale.setValue(0);
      contentOpacity.setValue(0);
      contentTranslateY.setValue(50);

      Animated.sequence([
          Animated.spring(imageScale, {
              toValue: 1,
              friction: 6,
              tension: 40,
              useNativeDriver: true,
          }),
          Animated.parallel([
              Animated.timing(contentOpacity, {
                  toValue: 1,
                  duration: 800,
                  useNativeDriver: true,
              }),
              Animated.timing(contentTranslateY, {
                  toValue: 0,
                  duration: 800,
                  easing: Easing.out(Easing.exp),
                  useNativeDriver: true,
              })
          ])
      ]).start();
    }, [])
  );

  return (
    <ScreenWrapper backgroundColor={Colors.background} style={styles.container}>
      
      <View style={styles.circleDecoration} />

      <View style={styles.contentContainer}>
        {/* Header/Logo Area - REVERTED TO IONICONS */}
        <Animated.View style={[styles.header, { opacity: contentOpacity }]}>
            <View style={styles.iconContainer}>
                <Ionicons name="paw" size={24} color={Colors.white} />
            </View>
            <View style={{ height: 30, justifyContent: 'center' }}>
                <GlitchText 
                    text1="Meong ID" 
                    text2="Platform Terbaik" 
                    style={styles.appName} 
                    interval={5000}
                />
            </View>
        </Animated.View>

        {/* Hero Image */}
        <View style={styles.imageContainer}>
            <Animated.Image 
                source={require('../assets/kucing.png')} 
                style={[styles.heroImage, { transform: [{ scale: imageScale }] }]} 
                resizeMode="contain"
            />
        </View>

        {/* Text & Buttons */}
        <Animated.View 
            style={[
                styles.bottomSection, 
                { 
                    opacity: contentOpacity, 
                    transform: [{ translateY: contentTranslateY }] 
                }
            ]}
        >
            <View style={styles.textSection}>
                {/* Single Line Headline */}
                <View style={styles.headlineRow}>
                    <Text style={styles.titleStart}>Temukan</Text>
                    <View style={styles.glitchWrapper}>
                        <GlitchText 
                            text1={`Sahabat bulu`} 
                            text2={`Kucing lucu`} 
                            style={styles.heroGlitch}
                            interval={3500}
                        />
                    </View>
                </View>

                <Text style={styles.titleEnd}>Impianmu</Text>
                
                <Text style={styles.subtitle}>
                    Platform no. 1 untuk adopsi, donasi, dan komunitas pecinta kucing di Indonesia.
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button 
                    title="Mulai Sekarang" 
                    onPress={() => router.push('/signup')}
                    style={styles.primaryBtn}
                    textStyle={{ fontSize: 18, fontWeight: 'bold' }}
                />
                
                <TouchableOpacity 
                    onPress={() => router.push('/login')}
                    style={styles.loginLink}
                >
                    <Text style={styles.loginText}>
                        Sudah punya akun? <Text style={styles.loginHighlight}>Masuk</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </Animated.View>

      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0, 
  },
  circleDecoration: {
      position: 'absolute',
      top: -150,
      right: -100,
      width: 350,
      height: 350,
      borderRadius: 175,
      backgroundColor: Colors.secondary,
      opacity: 0.05, 
  },
  contentContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 20,
      paddingHorizontal: 24,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      gap: 12,
  },
  iconContainer: {
      width: 44,
      height: 44,
      borderRadius: 14,
      backgroundColor: Colors.secondary,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
  },
  appName: {
      fontSize: 18,
      fontWeight: '800',
      color: Colors.secondary,
      letterSpacing: 0.5,
      textTransform: 'uppercase',
  },
  imageContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 10,
  },
  heroImage: {
      width: width * 0.8,
      height: width * 0.8,
      maxWidth: 320,
      maxHeight: 320,
  },
  bottomSection: {
      width: '100%',
      alignItems: 'center',
  },
  textSection: {
      alignItems: 'center',
      marginBottom: 30,
      width: '100%',
  },
  // Typography Styles
  headlineRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap', // Allow wrap if screen is very small
      // marginBottom: 2, // Tight spacing to Impianmu
  },
  titleStart: {
     fontSize: 30,
     fontWeight: '400', // Thinner
     color: '#333',
     marginRight: 6,
  },
  glitchWrapper: {
      height: 34, // Fixed height for alignment
      justifyContent: 'center',
  },
  heroGlitch: {
      fontSize: 30,
      fontWeight: '900', // Boldest
      color: Colors.secondary, 
      letterSpacing: 0.5,
  },
  titleEnd: {
      fontSize: 30,
      fontWeight: '400',
      color: '#333',
      marginBottom: 16,
  },
  subtitle: {
      fontSize: 15,
      color: '#666', 
      textAlign: 'center',
      lineHeight: 24,
      paddingHorizontal: 20,
      maxWidth: '90%',
  },
  buttonContainer: {
      width: '100%',
      gap: 16,
      marginBottom: 10,
  },
  primaryBtn: {
      height: 56,
      backgroundColor: Colors.secondary, 
      borderRadius: 28,
      justifyContent: 'center',
      elevation: 6,
  },
  loginLink: {
      alignItems: 'center',
      padding: 10,
  },
  loginText: {
      fontSize: 15,
      color: '#888',
  },
  loginHighlight: {
      color: Colors.secondary,
      fontWeight: 'bold',
      fontSize: 15,
  },
});