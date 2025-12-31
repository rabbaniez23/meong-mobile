import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import LostCatCard from '../../components/LostCatCard';
import CatCard from '../../components/CatCard'; // Reuse for 'Ditemukan'

// Mock Data
const LOST_CATS = [
  { id: '1', name: 'Si Belang', reward: 'Rp 500.000', location: 'Jl. Merdeka No. 45, Jakarta Pusat', date: 'Hilang 2 hari lalu', image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2080&auto=format&fit=crop' },
  { id: '2', name: 'Oreo', reward: 'Rp 1.000.000', location: 'Taman Suropati', date: 'Hilang 5 jam lalu', image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=1935&auto=format&fit=crop' },
];

const FOUND_CATS = [
  { id: '3', name: 'Kucing Oren', breed: 'Domestik', age: 'Dewasa', image: 'https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?q=80&w=1887&auto=format&fit=crop' },
  { id: '4', name: 'Kitten Putih', breed: 'Anggora', age: 'Kitten', image: 'https://images.unsplash.com/photo-1517331156700-6c2496300263?q=80&w=1974&auto=format&fit=crop' },
];

export default function HilangScreen() {
  const [activeTab, setActiveTab] = useState('Kehilangan');

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Darurat & Laporan</Text>
      </View>

      {/* Toggle Switch */}
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[styles.toggleBtn, activeTab === 'Kehilangan' && styles.activeToggleLost]}
          onPress={() => setActiveTab('Kehilangan')}
        >
          <Text style={[styles.toggleText, activeTab === 'Kehilangan' && styles.activeToggleText]}>
            Kehilangan
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.toggleBtn, activeTab === 'Ditemukan' && styles.activeToggleFound]}
          onPress={() => setActiveTab('Ditemukan')}
        >
          <Text style={[styles.toggleText, activeTab === 'Ditemukan' && styles.activeToggleText]}>
            Ditemukan
          </Text>
        </TouchableOpacity>
      </View>

      {/* List Content */}
      <View style={styles.content}>
        {activeTab === 'Kehilangan' ? (
          <FlatList
            data={LOST_CATS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <LostCatCard 
                {...item}
                onContact={() => console.log('Contact owner')}
              />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={FOUND_CATS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={{ flex: 1, margin: 8, maxWidth: '46%' }}>
                <CatCard 
                  name={item.name}
                  breed={item.breed}
                  age={item.age}
                  image={item.image}
                  onPress={() => {}}
                />
              </View>
            )}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>+ Lapor Kehilangan</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.text,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#EeEeEe',
    marginHorizontal: 20,
    borderRadius: 25,
    padding: 4,
    marginBottom: 20,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeToggleLost: {
    backgroundColor: Colors.error, // Red for Lost
  },
  activeToggleFound: {
    backgroundColor: Colors.primary, // Green for Found
  },
  toggleText: {
    fontWeight: '600',
    color: '#888',
  },
  activeToggleText: {
    color: 'white',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 140, // Space for button + nav
  },
  actionContainer: {
    position: 'absolute',
    bottom: 90, // Above bottom nav
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  actionButton: {
    backgroundColor: Colors.secondary,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});