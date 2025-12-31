import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ProfileStats() {
  const stats = [
    { label: 'Kucing', value: '12', bg: '#E8F5E9', color: Colors.secondary },
    { label: 'Adopsi', value: '5', bg: '#FFF8E1', color: '#F57C00' },
    { label: 'Donasi', value: '8', bg: '#E3F2FD', color: '#1976D2' },
  ];

  return (
    <View style={styles.container}>
      {stats.map((stat, index) => (
        <View key={index} style={[styles.statCard, { backgroundColor: stat.bg }]}>
          <Text style={[styles.value, { color: stat.color }]}>{stat.value}</Text>
          <Text style={styles.label}>{stat.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    // Soft shadow
    shadowColor: Colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  value: {
    fontSize: 24,
    fontWeight: '800', // Extra bold for impact
    marginBottom: 4,
  },
  label: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
});
