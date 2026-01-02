import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function CustomHeader({ 
  title, 
  leftIcon = "arrow-back", 
  onLeftPress, 
  rightIcon, 
  onRightPress,
  subtitle,
  centerContent // Optional component to render in center (like Custom Image/Text combo)
}) {
  const insets = useSafeAreaInsets();
  const slideAnim = useRef(new Animated.Value(-50)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
        delay: 100, // Slight delay for smoother feel
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
        paddingTop: insets.top + (Platform.OS === 'ios' ? 10 : 20), // Adjusted padding
        opacity: opacityAnim,
        transform: [{ translateY: slideAnim }]
      }
    ]}>
      
      {/* Left Action */}
      <TouchableOpacity onPress={onLeftPress} style={styles.iconBtn} activeOpacity={0.7}>
        <Ionicons name={leftIcon} size={24} color={Colors.white} />
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
      <TouchableOpacity onPress={onRightPress} style={styles.iconBtn} activeOpacity={0.7} disabled={!rightIcon}>
        {rightIcon && <Ionicons name={rightIcon} size={24} color={Colors.white} />}
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
    // Elegant Shadow
    shadowColor: "#2F5C2F", // Darker green shadow
    shadowOffset: {
      width: 0,
      height: 8,
    },
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
    backgroundColor: 'rgba(255,255,255,0.15)', // Glassmorphic touch
  }
});
