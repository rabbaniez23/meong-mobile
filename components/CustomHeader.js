import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ 
  title, 
  showBackBtn, // New prop
  onLeftPress, 
  rightIcon, 
  onRightPress,
  subtitle,
  centerContent,
  showBadge // New prop for Red Dot
}) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  // Handle Back Press Default
  const handleLeftPress = () => {
      if (onLeftPress) {
          onLeftPress();
      } else if (showBackBtn && router.canGoBack()) {
          router.back();
      }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        delay: 100,
      }),
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
        delay: 100,
      })
    ]).start();
  }, []);

  return (
    <Animated.View style={[
      styles.container, 
      { 
        paddingTop: insets.top + (Platform.OS === 'ios' ? 10 : 20),
        opacity: opacityAnim,
        transform: [{ translateY: slideAnim }]
      }
    ]}>
      
      {/* Left Action */}
      <TouchableOpacity 
        onPress={handleLeftPress} 
        style={[styles.iconBtn, !showBackBtn && !onLeftPress && { opacity: 0 }]} 
        activeOpacity={0.7}
        disabled={!showBackBtn && !onLeftPress}
      >
        <Ionicons name={showBackBtn ? "arrow-back" : "menu"} size={24} color={Colors.white} />
      </TouchableOpacity>

      {/* Center Content */}
      <View style={styles.centerContent}>
        {centerContent ? centerContent : (
           <View style={{ alignItems: 'center' }}>
             <Text style={styles.title}>{title}</Text>
             {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
           </View>
        )}
      </View>

      {/* Right Action */}
      <TouchableOpacity onPress={onRightPress} style={[styles.iconBtn, !rightIcon && { opacity: 0 }]} activeOpacity={0.7} disabled={!rightIcon}>
        {rightIcon && (
            <View>
                <Ionicons name={rightIcon} size={24} color={Colors.white} />
                {showBadge && <View style={styles.redDot} />}
            </View>
        )}
      </TouchableOpacity>

    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#2F5C2F", 
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 100,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.white,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#E8F5E9',
    marginTop: 2,
  },
  iconBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  redDot: {
      position: 'absolute',
      top: -2,
      right: -2,
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: Colors.error,
      borderWidth: 1.5,
      borderColor: Colors.primary,
  }
});
