import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ActionListItem({ title, subtitle, status, type, date }) {
  // Helper to determine status color and icon
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Approved':
      case 'Selesai':
        return { color: '#4CAF50', bg: '#E8F5E9', icon: 'checkmark-circle' };
      case 'Rejected':
        return { color: '#F44336', bg: '#FFEBEE', icon: 'close-circle' };
      case 'Waiting':
      case 'Pending':
      default:
        return { color: '#FF9800', bg: '#FFF3E0', icon: 'time' };
    }
  };

  const statusStyle = getStatusStyle(status);

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={type === 'Donasi' ? 'heart' : 'paw'} 
          size={24} 
          color={Colors.primary} 
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        {date && <Text style={styles.date}>{date}</Text>}
      </View>

      <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
        <Text style={[styles.statusText, { color: statusStyle.color }]}>
          {status}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0F5E5', // Very light green
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '700',
  },
});
