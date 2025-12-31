import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';

// Data Dummy (Sama seperti sebelumnya)
const CATS_DATA = [
  { id: '1', name: 'Hattoo', age: '1 Tahun', location: 'Bandung', image: require('../../assets/Hatto.jpeg'), gender: 'Jantan', description: 'Kucing yang sangat aktif dan suka bermain tali. Sudah vaksin lengkap.' },
  { id: '2', name: 'Abu', age: '5 Bulan', location: 'Jakarta', image: require('../../assets/Abu.jpeg'), gender: 'Betina', description: 'Pemalu tapi sangat manja kalau sudah kenal. Butuh owner yang sabar.' },
  { id: '3', name: 'Oyen', age: '2 Tahun', location: 'Surabaya', image: require('../../assets/Oyen.jpeg'), gender: 'Jantan', description: 'Si raja makan. Badannya gembul dan suka tidur di kardus.' },
  { id: '4', name: 'Miko', age: '8 Bulan', location: 'Bandung', image: require('../../assets/Miko.jpeg'), gender: 'Betina', description: 'Sangat vocal dan suka "mengobrol". Bulunya sangat halus.' },
];

export default function AdopsiScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filteredCats = CATS_DATA.filter(cat => 
    cat.name.toLowerCase().includes(search.toLowerCase()) || 
    cat.location.toLowerCase().includes(search.toLowerCase())
  );

  // Fungsi untuk pindah ke detail
  const goToDetail = (item) => {
    // Kita kirim datanya sebagai parameter string JSON
    router.push({
      pathname: '/(tabs)/adopsi-detail',
      params: { catData: JSON.stringify(item) }
    });
  };

  const renderItem = ({ item }) => (
    // Ubah View jadi TouchableOpacity agar bisa diklik
    <TouchableOpacity style={styles.card} onPress={() => goToDetail(item)} activeOpacity={0.9}>
      <Image source={item.image} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
            <Text style={styles.catName}>{item.name}</Text>
            <Text style={styles.catLocation}>📍 {item.location}</Text>
        </View>
        <Text style={styles.catDetailText}>{item.age} • {item.gender}</Text>
        {/* Tombol "Adopsi Saya" DIHAPUS dari sini */}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Temukan Teman Baru</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder="🔍 Cari nama atau lokasi..."
          value={search}
          onChangeText={setSearch}
          placeholderTextColor={Colors.gray}
        />
      </View>

      <FlatList
        data={filteredCats}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  headerContainer: {
    padding: 20, paddingTop: 50, backgroundColor: Colors.background,
    borderBottomRightRadius: 20, borderBottomLeftRadius: 20, marginBottom: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: Colors.secondary, marginBottom: 15 },
  searchInput: {
    backgroundColor: Colors.white, padding: 12, borderRadius: 12,
    borderWidth: 1, borderColor: Colors.gray, fontSize: 16, color: Colors.text
  },
  listContainer: { padding: 15 },
  row: { justifyContent: 'space-between' },
  card: {
    width: '48%', backgroundColor: Colors.white, borderRadius: 15, marginBottom: 15,
    ...Colors.shadow, borderWidth: 1, borderColor: '#f0f0f0', overflow: 'hidden',
  },
  cardImage: { width: '100%', height: 150, resizeMode: 'cover' },
  cardContent: { padding: 12 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  catName: { fontSize: 16, fontWeight: 'bold', color: Colors.secondary },
  catLocation: { fontSize: 10, color: '#888' },
  catDetailText: { fontSize: 12, color: Colors.text, opacity: 0.8 },
});