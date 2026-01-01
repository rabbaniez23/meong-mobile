import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ActivityIndicator, View } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function Button({
  title,
  onPress,
  variant = 'primary', // primary, secondary, outline, ghost
  size = 'medium', // small, medium, large
  isLoading = false,
  icon,
  disabled = false,
  style,
  textStyle,
}) {
  const getBackgroundColor = () => {
    if (disabled) return Colors.gray;
    switch (variant) {
      case 'primary': return Colors.primary;
      case 'secondary': return Colors.secondary;
      case 'outline': return 'transparent';
      case 'ghost': return 'transparent';
      default: return Colors.primary;
    }
  };

  const getTextColor = () => {
    if (disabled) return Colors.white;
    switch (variant) {
      case 'primary': return Colors.white;
      case 'secondary': return Colors.white;
      case 'outline': return Colors.secondary;
      case 'ghost': return Colors.secondary; // Or primary? Let's stick to secondary for coherence with outline
      default: return Colors.white;
    }
  };

  const getBorder = () => {
    if (variant === 'outline') return { borderWidth: 2, borderColor: Colors.secondary };
    return {};
  };

  const getPadding = () => {
    switch (size) {
      case 'small': return { paddingVertical: 8, paddingHorizontal: 16 };
      case 'large': return { paddingVertical: 16, paddingHorizontal: 32 };
      default: return { paddingVertical: 12, paddingHorizontal: 24 }; // medium
    }
  };

  const getFontSize = () => {
    switch (size) {
      case 'small': return 14;
      case 'large': return 18;
      default: return 16;
    }
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || isLoading}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        getBorder(),
        getPadding(),
        variant === 'primary' || variant === 'secondary' ? Colors.shadow : {},
        disabled && { elevation: 0, shadowOpacity: 0 },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && <Ionicons name={icon} size={20} color={getTextColor()} style={{ marginRight: 8 }} />}
          <Text style={[styles.text, { color: getTextColor(), fontSize: getFontSize() }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
