import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // <--- TAMBAHKAN INI
import { Colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CatCard from '../../components/CatCard'; // Import kartu yang tadi kita buat

// Data Palsu Kucing (Nanti diganti API Backend)
const DUMMY_CATS = [
  { id: '1', name: 'Miko', breed: 'Domestik', age: '1 Tahun', image: 'https://placekitten.com/200/200' },
  { id: '2', name: 'Oyen', breed: 'Persia Mix', age: '5 Bulan', image: 'https://placekitten.com/201/201' },
  { id: '3', name: 'Luna', breed: 'Anggora', age: '2 Tahun', image: 'https://placekitten.com/202/202' },
  { id: '4', name: 'Mochi', breed: 'Munchkin', age: '8 Bulan', image: 'https://placekitten.com/203/203' },
];

export default function HomeScreen() {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* 1. Header: Salam & Profil */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Halo, Pecinta Kucing! 👋</Text>
            <Text style={styles.subGreeting}>Siap adopsi teman baru?</Text>
          </View>
          <TouchableOpacity style={styles.profileBtn}>
             {/* Foto Profil Dummy */}
            <Image 
              source={{ uri: 'https://ui-avatars.com/api/?name=User+Meong&background=A9C47F&color=fff' }} 
              style={styles.avatar} 
            />
          </TouchableOpacity>
        </View>

        {/* 2. Banner Promosi */}
        <View style={styles.banner}>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Adopsi, Jangan Beli!</Text>
            <Text style={styles.bannerSubtitle}>Ribuan kucing menunggu rumah barunya.</Text>
            <TouchableOpacity style={styles.bannerBtn}>
              <Text style={styles.bannerBtnText}>Lihat Semua</Text>
            </TouchableOpacity>
          </View>
          <Image 
            source={{ uri: 'https://placekitten.com/300/300' }} 
            style={styles.bannerImage} 
          />
        </View>

        {/* 3. Kategori Menu (Pintas) */}
        <View style={styles.menuContainer}>
          <MenuButton icon="heart" label="Donasi" color="#FF8A65" />
          <MenuButton icon="medkit" label="Vet/Klinik" color="#4DB6AC" />
          <MenuButton icon="book" label="Edukasi" color="#7986CB" />
          <MenuButton icon="cart" label="Shop" color="#F06292" />
        </View>

        {/* 4. List Kucing Terbaru */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Baru Ditambahkan 🐾</Text>
          <Text style={styles.seeAll}>Lihat Semua</Text>
        </View>

        {/* Render List Kucing */}
        <View style={styles.listContainer}>
          {DUMMY_CATS.map((cat) => (
            <CatCard 
              key={cat.id}
              name={cat.name}
              breed={cat.breed}
              age={cat.age}
              image={cat.image}
             onPress={() => router.push(`/detail/${cat.id}`)}
            />
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

// Komponen Tombol Menu Kecil (Hanya dipakai di sini)
function MenuButton({ icon, label, color }) {
  return (
    <TouchableOpacity style={styles.menuBtn}>
      <View style={[styles.iconBox, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="white" />
      </View>
      <Text style={styles.menuText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subGreeting: {
    fontSize: 14,
    color: '#888',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: Colors.primary,
  },
  banner: {
    backgroundColor: Colors.secondary,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    overflow: 'hidden',
  },
  bannerTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#E0E0E0',
    marginBottom: 10,
  },
  bannerBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  bannerBtnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  bannerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'white',
  },
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  menuBtn: {
    alignItems: 'center',
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    elevation: 2,
  },
  menuText: {
    fontSize: 12,
    color: Colors.text,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  seeAll: {
    fontSize: 14,
    color: Colors.primary,
    fontWeight: '600',
  },
  listContainer: {
    paddingBottom: 20,
  },
});