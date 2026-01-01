import React from 'react';
import { View, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ScreenWrapper({ children, style, backgroundColor = Colors.white }) {
  // Use SafeAreaView for both, but adjust padding manually if needed for Android status bar translucency
  // Or just a standard container with calculated padding.
  // Since we want to handle safe areas, SafeAreaView is good. 
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor }]}>
        <View style={[styles.content, style]}>
          {children}
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20, // Standard padding requested
  }
});
