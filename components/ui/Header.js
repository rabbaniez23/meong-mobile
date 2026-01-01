import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function Header({ title, showBackBtn = true, rightAction }) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {showBackBtn ? (
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
      ) : (
        <View style={styles.spacer} />
      )}

      <Text style={styles.title} numberOfLines={1}>{title}</Text>

      <View style={styles.rightAction}>
        {rightAction}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 0, // Padding handled by ScreenWrapper usually, but if Header is full width we might need it.
    // However, if ScreenWrapper uses paddingHorizontal: 20, then Header will be indented.
    // If Header needs to be full width, ScreenWrapper should be adjusted or Header outside padding.
    // Based on user request "ScreenWrapper... standard horizontal padding (20px)", 
    // Header inside ScreenWrapper will have padding. 
    // If we want Header to align with back button on the edge, this is fine.
    // But usually Headers are full width. 
    // Let's assume Header is placed INSIDE ScreenWrapper for now as per "Wraps every screen". 
    // If it looks weird we adjust.
    marginBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  spacer: {
    width: 40,
  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.secondary,
    textAlign: 'center',
  },
  rightAction: {
    width: 40,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
