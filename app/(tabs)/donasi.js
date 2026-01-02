import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../../components/CustomHeader';

// Data Dummy Rumah Sakit & Shelter
const DONATION_TARGETS = [
  { 
    id: '1', 
    type: 'Shelter', 
    name: 'Rumah Kucing Bandung', 
    location: 'Lembang, Bandung', 
    image: require('../../assets/shelter1.jpg'), 
    collected: 15000000, 
    target: 50000000, 
    description: 'Tempat penampungan bagi 50+ kucing jalanan yang sakit dan terlantar. Kami membutuhkan bantuan untuk renovasi atap yang bocor.' 
  },
  { 
    id: '2', 
    type: 'Rumah Sakit', 
    name: 'Klinik Hewan Sejahtera', 
    location: 'Tebet, Jakarta', 
    image: require('../../assets/rs1.jpg'), 
    collected: 2500000, 
    target: 10000000, 
    description: 'Program sterilisasi gratis untuk kucing liar di sekitar Jakarta Selatan. Bantu kami mengontrol populasi kucing jalanan.' 
  },
  { 
    id: '3', 
    type: 'Shelter', 
    name: 'Pondok Meong', 
    location: 'Sleman, Yogyakarta', 
    image: require('../../assets/shelter2.jpg'), 
    collected: 8000000, 
    target: 20000000, 
    description: 'Kebutuhan mendesak untuk stok makanan (dry food & wet food) dan pasir kucing untuk 2 bulan ke depan.' 
  },
  { 
    id: '4', 
    type: 'Rumah Sakit', 
    name: 'RS Hewan Pendidikan', 
    location: 'Bogor', 
    image: require('../../assets/rs2.jpg'), 
    collected: 45000000, 
    target: 50000000, 
    description: 'Penggalangan dana untuk operasi kaki kucing "Si Belang" yang tertabrak motor minggu lalu.' 
  },
];

export default function DonasiScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('Semua'); 
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  // Filter Data
  const filteredData = filter === 'Semua' 
    ? DONATION_TARGETS 
    : DONATION_TARGETS.filter(item => item.type === filter);

  const goToDetail = (item) => {
    router.push({
      pathname: '/(tabs)/donasi-detail',
      params: { data: JSON.stringify(item) }
    });
  };

  const renderItem = ({ item }) => {
    // Hitung persentase progress
    const progress = (item.collected / item.target) * 100;

    return (
      <TouchableOpacity style={styles.card} onPress={() => goToDetail(item)} activeOpacity={0.9}>
        <Image source={item.image} style={styles.cardImage} />
        
        <View style={styles.cardContent}>
          <View style={styles.typeBadge}>
             <Text style={styles.typeText}>{item.type}</Text>
          </View>
          
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.locationRow}>
             <Ionicons name="location-outline" size={14} color="#666" />
             <Text style={styles.locationText}>{item.location}</Text>
          </View>

          {/* Progress Bar Kecil */}
          <View style={styles.progressSection}>
             <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
             </View>
             <View style={styles.progressInfo}>
                <Text style={styles.collectedText}>Rp {item.collected.toLocaleString()}</Text>
                <Text style={styles.targetText}> dari Rp {item.target.toLocaleString()}</Text>
             </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
        <CustomHeader 
            title="Donasi" 
            leftIcon="chatbubbles-outline"
            onLeftPress={() => router.push('/chat-list')}
            rightIcon="notifications-outline"
            onRightPress={() => router.push('/notifications')}
        />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        {/* Filter Tabs */}
        <View style={styles.filterContainer}>
          {['Semua', 'Shelter', 'Rumah Sakit'].map((f) => (
            <TouchableOpacity 
              key={f} 
              style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
              onPress={() => setFilter(f)}
            >
              <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
  },
  filterContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, marginBottom: 10, gap: 10 },
  filterBtn: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: Colors.white, borderWidth: 1, borderColor: '#DDD' },
  filterBtnActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  filterText: { color: '#666', fontWeight: '600' },
  filterTextActive: { color: Colors.white },

  listContainer: { padding: 20 },
  card: { backgroundColor: Colors.white, borderRadius: 15, marginBottom: 20, overflow: 'hidden', ...Colors.shadow },
  cardImage: { width: '100%', height: 160, resizeMode: 'cover' },
  cardContent: { padding: 15 },
  typeBadge: { position: 'absolute', top: -145, left: 15, backgroundColor: Colors.primary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 8 },
  typeText: { color: Colors.white, fontSize: 10, fontWeight: 'bold' },
  
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary, marginBottom: 5 },
  locationRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  locationText: { fontSize: 12, color: '#666', marginLeft: 4 },

  progressSection: { marginTop: 5 },
  progressBarBg: { height: 6, backgroundColor: '#EEE', borderRadius: 3, marginBottom: 5 },
  progressBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 3 },
  progressInfo: { flexDirection: 'row' },
  collectedText: { fontSize: 12, fontWeight: 'bold', color: Colors.secondary },
  targetText: { fontSize: 12, color: '#888' },
});
