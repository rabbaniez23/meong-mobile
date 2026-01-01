import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function Badge({ text, variant = 'info', style }) {
  const getStyle = () => {
    switch (variant) {
      case 'success':
        return { backgroundColor: '#E8F5E9', borderColor: Colors.primary, color: Colors.primary };
      case 'warning':
        return { backgroundColor: '#FFF3E0', borderColor: '#FFB74D', color: '#EF6C00' };
      case 'danger':
      case 'error':
        return { backgroundColor: '#FFEBEE', borderColor: Colors.error, color: Colors.error };
      case 'info':
      default:
        return { backgroundColor: '#E3F2FD', borderColor: '#2196F3', color: '#1976D2' };
    }
  };

  const { backgroundColor, borderColor, color } = getStyle();

  return (
    <View style={[styles.container, { backgroundColor, borderColor }, style]}>
      <Text style={[styles.text, { color }]}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
