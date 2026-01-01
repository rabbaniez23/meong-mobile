import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Input from '../../components/ui/Input';
import LostCatCard from '../../components/LostCatCard';
import FilterBar from '../../components/FilterBar';

// Expanded Dummy Data
const LOST_DATA = [
  { id: '1', name: 'Mochi', lastSeen: 'Kemarin Sore', location: 'Jl. Dago Pakar',    image: require('../../assets/Putih.jpeg'),
    description: 'Kucing putih polos, kalung merah. Terakhir liat dikejar anjing kampung.',
    reward: 'Rp 500.000',
    date: '2024-01-01' 
  },
  { 
    id: '2', 
    name: 'Tom', 
    location: 'Area Gasibu', 
    lastSeen: '2 hari lalu', 
    image: require('../../assets/Abu.jpeg'),
    description: 'Kucing abu-abu gemoy, agak pincang kaki belakang kiri. Tolong hubungi kalau lihat.',
    reward: null,
    date: '2023-12-30'
  },
  { 
    id: '3', 
    name: 'Simba', 
    location: 'Komplek Setiabudi', 
    lastSeen: 'Pagi ini', 
    image: require('../../assets/Oyen.jpeg'),
    description: 'Kucing oren barbar, tapi penurut kalau dikasih Whiskas. Kabur pas pintu pager kebuka.',
    reward: 'Rp 200.000',
    date: '2024-01-02'
  },
];

export default function HilangScreen() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('Semua');

  const filteredData = LOST_DATA.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || 
                          item.location.toLowerCase().includes(search.toLowerCase());
    
    // Filter logic
    if (filter === 'Semua') return matchesSearch;
    if (filter === 'Terbaru') return matchesSearch; // Should sort by date in real app
    if (filter === 'Imbalan') return matchesSearch; // Should check if reward exists

    return matchesSearch;
  });

  const goToDetail = (item) => {
    router.push({
      pathname: '/(tabs)/hilang-detail',
      params: { catData: JSON.stringify(item) }
    });
  };

  const renderItem = ({ item }) => (
    <LostCatCard 
        name={item.name}
        lastSeen={item.lastSeen}
        location={item.location}
        image={item.image}
        description={item.description}
        reward={item.reward}
        onPress={() => goToDetail(item)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Custom Header */}
        <View style={styles.header}>
            <View>
                <Text style={styles.title}>Info Kehilangan</Text>
                <Text style={styles.subtitle}>Bantu pertemukan mereka kembali</Text>
            </View>
            <View style={styles.alertIcon}>
                <Ionicons name="warning" size={24} color={Colors.error} />
            </View>
        </View>

        <View style={styles.searchContainer}>
            <View style={styles.searchWrapper}>
                <Input 
                    placeholder="Cari lokasi atau nama kucing..." 
                    icon="search" 
                    value={search}
                    onChangeText={setSearch}
                    style={{ borderWidth: 0, backgroundColor: 'transparent' }} 
                />
            </View>
        </View>

        <View style={{ marginBottom: 15 }}>
            <FilterBar 
                filters={['Semua', 'Terbaru', 'Imbalan']}
                activeFilter={filter}
                onSelect={setFilter}
            />
        </View>

        <FlatList
            data={filteredData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
        />
      </View>

      {/* FAB */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/add-hilang')}
        activeOpacity={0.8}
      >
        <Ionicons name="megaphone" size={28} color={Colors.white} />
        <Text style={styles.fabText}>Lapor</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // Cream background
    paddingTop: 30,
  },
  content: {
    flex: 1,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      marginBottom: 20,
  },
  title: {
      fontSize: 26,
      fontWeight: '800',
      color: Colors.error, 
      letterSpacing: -0.5,
  },
  subtitle: {
      fontSize: 14,
      color: '#888',
      marginTop: 2,
  },
  alertIcon: {
      backgroundColor: '#FFEBEE',
      padding: 10,
      borderRadius: 12,
  },
  searchContainer: {
      paddingHorizontal: 20,
      marginBottom: 5,
  },
  searchWrapper: {
      backgroundColor: Colors.white,
      borderRadius: 16,
      ...Colors.shadow,
      borderColor: '#FFCDD2',
      borderWidth: 1,
      paddingVertical: 2,
      marginBottom: 10,
  },
  listContainer: {
      paddingHorizontal: 20,
      paddingBottom: 100,
      paddingTop: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    height: 60,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: Colors.error,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    ...Colors.shadow,
    elevation: 8,
  },
  fabText: {
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 16,
  },
});