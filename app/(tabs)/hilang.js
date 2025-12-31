import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

// Data Dummy Kucing Hilang (Pakai gambar yang ada dulu)
const LOST_CATS_DATA = [
  { id: '1', name: 'Mochi', lastSeen: 'Kemarin Sore', location: 'Jl. Dago Pakar', image: require('../../assets/Putih.jpeg'), description: 'Kucing putih polos, mata biru, ada kalung merah. Hilang saat gerbang terbuka.' },
  { id: '2', name: 'Simba', lastSeen: '2 Hari lalu', location: 'Komp. Setiabudi', image: require('../../assets/Oyen.jpeg'), description: 'Kucing oranye besar, agak pincang kaki belakang kanan. Terakhir dilihat di taman komplek.' },
  { id: '3', name: 'Luna', lastSeen: 'Pagi ini', location: 'Alun-alun Bandung', image: require('../../assets/Abu.jpeg'), description: 'Kucing abu-abu kecil, sangat penakut. Mungkin bersembunyi di bawah mobil.' },
];

export default function HilangScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredCats = LOST_CATS_DATA.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase()) || 
    cat.location.toLowerCase().includes(search.toLowerCase())
  );

  const goToDetail = (item) => {
    router.push({
      pathname: '/(tabs)/hilang-detail',
      params: { catData: JSON.stringify(item) }
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => goToDetail(item)} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.cardImage} />
        {/* Badge "Hilang" ditaruh di atas gambar */}
        <View style={styles.lostBadge}>
            <Text style={styles.lostBadgeText}>Dicari</Text>
        </View>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.headerContent}>
            <Text style={styles.catName}>{item.name}</Text>
            <Text style={styles.lastSeen}>🕒 {item.lastSeen}</Text>
        </View>
        
        <View style={styles.locationContainer}>
            <Ionicons name="location-sharp" size={14} color={Colors.secondary} />
            <Text style={styles.catLocation}>{item.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Info Kucing Hilang</Text>
        <Text style={styles.headerSubtitle}>Bantu mereka kembali ke rumah</Text>
      </View>

      <View style={styles.searchWrapper}>
        <TextInput 
            style={styles.searchInput}
            placeholder="🔍 Cari lokasi atau nama..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={Colors.gray}
            />
      </View>

      <FlatList
        data={filteredCats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  headerContainer: { padding: 20, paddingTop: 50, paddingBottom: 10 },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.secondary },
  headerSubtitle: { fontSize: 14, color: Colors.text, marginTop: 5 },
  searchWrapper: { paddingHorizontal: 20, marginBottom: 10 },
  searchInput: {
    backgroundColor: Colors.white, padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: '#E0E0E0', fontSize: 16, color: Colors.text, ...Colors.shadow, elevation: 2
  },
  listContainer: { padding: 20 },
  
  // Card Styles (List ke bawah, bukan grid)
  card: {
    flexDirection: 'row', backgroundColor: Colors.white, borderRadius: 15, marginBottom: 15,
    ...Colors.shadow, overflow: 'hidden', borderWidth: 1, borderColor: '#f0f0f0'
  },
  imageContainer: { position: 'relative', width: 120, height: 120 },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  lostBadge: {
    position: 'absolute', top: 10, left: 10, backgroundColor: 'rgba(76, 106, 76, 0.8)', // Warna secondary transparan
    paddingVertical: 4, paddingHorizontal: 10, borderRadius: 5
  },
  lostBadgeText: { color: Colors.white, fontSize: 10, fontWeight: 'bold' },
  
  cardContent: { flex: 1, padding: 15, justifyContent: 'center' },
  headerContent: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  catName: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary },
  lastSeen: { fontSize: 12, color: '#888', fontStyle: 'italic' },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  catLocation: { fontSize: 14, color: Colors.text, marginLeft: 5 },
});