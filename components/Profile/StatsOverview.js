import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function StatsOverview({ stats }) {
  const data = [
    { label: 'Adopsi', value: stats.adoptions, icon: 'home-outline' },
    { label: 'Laporan', value: stats.reports, icon: 'megaphone-outline' },
    { label: 'Donasi', value: stats.donated, icon: 'heart-outline' },
  ];

  return (
    <View style={styles.container}>
      {data.map((stat, index) => (
        <View key={index} style={styles.card}>
            <Text style={styles.value}>{stat.value}</Text>
            <View style={styles.labelRow}>
                <Ionicons name={stat.icon} size={14} color={Colors.secondary} />
                <Text style={styles.label}>{stat.label}</Text>
            </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    ...Colors.shadow,
    elevation: 2,
  },
  value: {
    fontSize: 18, // Donated might be long, check later
    fontWeight: '800',
    color: Colors.primary,
    marginBottom: 4,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  label: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
});
