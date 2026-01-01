import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileStats() {
  const stats = [
    { label: 'Kucing', value: '12', icon: 'paw', bg: '#E8F5E9', color: Colors.secondary },
    { label: 'Adopsi', value: '5', icon: 'home', bg: '#FFF8E1', color: '#F57C00' },
    { label: 'Donasi', value: '8', icon: 'heart', bg: '#E3F2FD', color: '#1976D2' },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={styles.statItem}>
            <View style={[styles.iconCircle, { backgroundColor: stat.bg }]}>
                <Ionicons name={stat.icon} size={20} color={stat.color} />
            </View>
            <Text style={styles.value}>{stat.value}</Text>
            <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    backgroundColor: Colors.white,
    marginTop: 15,
    marginHorizontal: 20,
    borderRadius: 20,
    ...Colors.shadow,
  },
  statItem: {
    alignItems: 'center',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  label: {
    fontSize: 12,
    color: '#888',
  },
});
