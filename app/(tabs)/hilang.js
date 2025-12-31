import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import LostCatCard from '../../components/LostCatCard';
import CatCard from '../../components/CatCard'; 
import FoundReportModal from '../../components/FoundReportModal'; // Import Modal

// Mock Data
const LOST_CATS = [
  { id: '1', name: 'Si Belang', reward: 'Rp 500.000', location: 'Jl. Merdeka No. 45, Jakarta', date: 'Hilang 2 hari lalu', image: 'https://placekitten.com/400/300' },
  { id: '2', name: 'Oreo', reward: 'Rp 1.000.000', location: 'Taman Suropati', date: 'Hilang 5 jam lalu', image: 'https://placekitten.com/401/300' },
];

const FOUND_CATS = [
  { id: '3', name: 'Kucing Oren', breed: 'Domestik', age: 'Dewasa', image: 'https://placekitten.com/200/200' },
  { id: '4', name: 'Kitten Putih', breed: 'Anggora', age: 'Kitten', image: 'https://placekitten.com/201/201' },
];

export default function HilangScreen() {
  const [activeTab, setActiveTab] = useState('Kehilangan');
  
  // State untuk Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCat, setSelectedCat] = useState(null);

  const handleReportFound = (cat) => {
    setSelectedCat(cat);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Darurat & Laporan 🚨</Text>
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
                onFoundPress={() => handleReportFound(item)} // Buka Modal
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
              <View style={{ flex: 1, margin: 6, maxWidth: '47%' }}>
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

      {/* Masukkan Komponen Modal disini */}
      <FoundReportModal 
        visible={modalVisible} 
        onClose={() => setModalVisible(false)}
        catName={selectedCat?.name || 'Kucing'}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  header: { paddingHorizontal: 20, paddingTop: 10, marginBottom: 16 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.text },
  toggleContainer: { flexDirection: 'row', backgroundColor: '#EeEeEe', marginHorizontal: 20, borderRadius: 25, padding: 4, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 10, borderRadius: 20, alignItems: 'center' },
  activeToggleLost: { backgroundColor: '#FF4D4D' },
  activeToggleFound: { backgroundColor: Colors.primary },
  toggleText: { fontWeight: '600', color: '#888' },
  activeToggleText: { color: 'white' },
  content: { flex: 1, paddingHorizontal: 20 },
  listContainer: { paddingBottom: 100 },
});