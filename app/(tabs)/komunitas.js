import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ThreadCard from '../../components/ThreadCard';
import FilterBar from '../../components/FilterBar';

// Community Data (Twitter/X Style)
const THREADS_DATA = [
  { 
    id: '1', 
    user: { name: 'Drh. Anisa Putri', avatar: null },
    time: '2j',
    category: 'Kesehatan',
    content: 'Musim hujan gini banyak kucing kena flu. Jangan lupa kasih vitamin C ya guys! Kalau ada gejala bersin terus, segera bawa ke vet. 🌧️💊 #KesehatanKucing #Tips',
    image: null, 
    likes: 120,
    comments: 45,
  },
  { 
    id: '2', 
    user: { name: 'Komunitas Meong Bdg', avatar: null },
    time: '4j',
    category: 'Event',
    content: 'Gathering minggu ini fix di CFD Dago ya. Kita bakal bagi-bagi sample makanan gratis dari sponsor. See you there! 😻',
    image: require('../../assets/Hatto.jpeg'), 
    likes: 245,
    comments: 88,
  },
  { 
    id: '3', 
    user: { name: 'Rian Gaming', avatar: null },
    time: '5j',
    category: 'Diskusi',
    content: 'Ada yang tau merk dry food yang bagus buat penggemuk tapi low grain? Kucingku kurus banget padahal makannya lahap. Saran kawan-kawan?',
    image: null, 
    likes: 15,
    comments: 32,
  },
  { 
    id: '4', 
    user: { name: 'Siti Aminah', avatar: null },
    time: '1h',
    category: 'Penyelamatan',
    content: 'Baru rescue kitten di jalan, matanya belekan parah. Pertolongan pertama pake apa ya sebelum ke dokter besok?',
    image: require('../../assets/Abu.jpeg'), 
    likes: 56,
    comments: 12,
  },
];

export default function KomunitasScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('Semua');

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Simple ala Twitter */}
      <View style={styles.header}>
        <Image source={require('../../assets/icon.png')} style={styles.logo} />
        <Text style={styles.headerTitle}>Komunitas</Text>
        <TouchableOpacity>
             <Ionicons name="settings-outline" size={24} color={Colors.text} />
        </TouchableOpacity>
      </View>

      <View style={{ borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
         <FilterBar 
            filters={['Semua', 'Trending', 'Kesehatan', 'Event', 'Humor']}
            activeFilter={filter}
            onSelect={setFilter}
        />
      </View>

      <FlatList
        data={THREADS_DATA}
        renderItem={({ item }) => (
            <ThreadCard 
                user={item.user}
                time={item.time}
                content={item.content}
                category={item.category}
                image={item.image}
                likes={item.likes}
                comments={item.comments}
                onPress={() => {}}
            />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* FAB with Feather Icon */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/add-post')}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={Colors.white} />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 30,
  },
  header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  logo: {
      width: 30,
      height: 30,
      borderRadius: 15,
  },
  headerTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
  },
  listContainer: {
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Colors.shadow,
    elevation: 5,
  },
});
