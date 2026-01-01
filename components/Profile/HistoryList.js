import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors } from '../../constants/Colors';
import Badge from '../ui/Badge';
import { Ionicons } from '@expo/vector-icons';

export default function HistoryList({ data, type }) {
  // Common render item function
  const renderItem = (item) => {
    const isDonation = type === 'donation';
    
    return (
      <View key={item.id} style={styles.card}>
        <View style={[styles.iconBox, isDonation ? styles.donationIcon : styles.adoptionIcon]}>
           {isDonation ? (
             <Ionicons name="heart" size={24} color={Colors.white} />
           ) : (
             <Image source={item.image} style={styles.catImage} />
           )}
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{isDonation ? `Donasi Rp ${item.amount}` : `Adopsi ${item.catName}`}</Text>
          <Text style={styles.date}>{item.date}</Text>
          {!isDonation && <Text style={styles.subtitle}>{item.catBreed}</Text>}
          {isDonation && <Text style={styles.subtitle}>{item.campaign}</Text>}
        </View>

        <Badge 
          text={item.status} 
          variant={
            item.status === 'Berhasil' || item.status === 'Approved' ? 'success' : 
            item.status === 'Gagal' || item.status === 'Rejected' ? 'error' : 'warning'
          } 
        />
      </View>
    );
  };

  if (!data || data.length === 0) {
      return (
        <View style={styles.emptyState}>
            <Text style={styles.emptyText}>Belum ada riwayat.</Text>
        </View>
      );
  }

  return (
    <View style={styles.listContainer}>
        {data.map(item => renderItem(item))}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    // padding: 20, // Removed padding because parent likely handles it or it's nested
    // paddingBottom: 100, // Handle in parent ScrollView
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 16,
    marginBottom: 12,
    ...Colors.shadow,
    borderWidth: 1,
    borderColor: '#F9F9F9',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
    overflow: 'hidden',
  },
  donationIcon: {
    backgroundColor: Colors.secondary,
  },
  adoptionIcon: {
    backgroundColor: '#F0F0F0',
  },
  catImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  date: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
    color: Colors.secondary,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: 50,
    minHeight: 200,
  },
  emptyText: {
    color: '#999',
  },
});
