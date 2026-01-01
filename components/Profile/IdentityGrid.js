import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function IdentityGrid({ user }) {
  const items = [
    { label: 'Pekerjaan', value: user.job, icon: 'briefcase', color: '#1976D2', bg: '#E3F2FD' },
    { label: 'Usia', value: `${user.age} Tahun`, icon: 'calendar', color: '#F57C00', bg: '#FFF3E0' },
    { label: 'Lokasi', value: user.location, icon: 'location', color: '#388E3C', bg: '#E8F5E9' },
    { label: 'Member', value: user.joinDate, icon: 'ribbon', color: '#7B1FA2', bg: '#F3E5F5' },
  ];

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.gridItem}>
           <View style={[styles.iconBox, { backgroundColor: item.bg }]}>
               <Ionicons name={item.icon} size={18} color={item.color} />
           </View>
   <View style={styles.textContainer}>
               <Text style={styles.label}>{item.label}</Text>
               <Text style={styles.value} numberOfLines={1} adjustsFontSizeToFit>{item.value}</Text>
           </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  gridItem: {
    width: '48%', // Just under 50% for gap
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    ...Colors.shadow,
    elevation: 2,
  },
  iconBox: {
      width: 36,
      height: 36,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  textContainer: {
      flex: 1, // Allow text to take remaining space
  },
  label: {
      fontSize: 10,
      color: '#999',
      textTransform: 'uppercase',
      fontWeight: '600',
  },
  value: {
      fontSize: 13,
      fontWeight: 'bold',
      color: Colors.text,
  },
});
