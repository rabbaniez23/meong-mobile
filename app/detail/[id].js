import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

// Data Dummy (Nanti ini kita ambil dari Backend beneran)
const DUMMY_DB = {
  '1': { name: 'Miko', breed: 'Domestik', age: '1 Tahun', sex: 'Jantan', weight: '3.5 kg', loc: 'Bandung', owner: 'Rabbani', desc: 'Miko adalah kucing yang sangat aktif dan suka bermain bola. Dia sudah divaksin lengkap dan steril.', image: 'https://placekitten.com/200/200' },
  '2': { name: 'Oyen', breed: 'Persia Mix', age: '5 Bulan', sex: 'Betina', weight: '2 kg', loc: 'Jakarta', owner: 'Siti', desc: 'Oyen sedikit pemalu tapi sangat manja kalau sudah kenal. Mencari adopter yang sabar.', image: 'https://placekitten.com/201/201' },
  '3': { name: 'Luna', breed: 'Anggora', age: '2 Tahun', sex: 'Betina', weight: '4 kg', loc: 'Surabaya', owner: 'Budi', desc: 'Luna sangat anggun dan tenang. Cocok untuk teman santai di rumah.', image: 'https://placekitten.com/202/202' },
  '4': { name: 'Mochi', breed: 'Munchkin', age: '8 Bulan', sex: 'Jantan', weight: '2.5 kg', loc: 'Bandung', owner: 'Dina', desc: 'Kakinya pendek tapi larinya kencang! Mochi sangat ramah dengan anak-anak.', image: 'https://placekitten.com/203/203' },
};

const { width } = Dimensions.get('window');

export default function DetailScreen() {
  const { id } = useLocalSearchParams(); // 1. Tangkap ID dari URL
  const router = useRouter(); // Untuk tombol Back
  
  // Ambil data berdasarkan ID, kalau tidak ada pakai data default
  const cat = DUMMY_DB[id] || DUMMY_DB['1']; 

  return (
    <View style={styles.container}>
      
      {/* 1. Gambar Full Layar di Atas */}
      <Image source={{ uri: cat.image }} style={styles.image} />

      {/* 2. Tombol Back & Share (Overlay di atas gambar) */}
      <SafeAreaView style={styles.headerOverlay}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="heart-outline" size={24} color="red" />
        </TouchableOpacity>
      </SafeAreaView>

      {/* 3. Panel Info (Melengkung ke atas) */}
      <View style={styles.infoContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* Header Info */}
          <View style={styles.titleRow}>
            <View>
              <Text style={styles.name}>{cat.name}</Text>
              <Text style={styles.breed}>{cat.loc} • {cat.breed}</Text>
            </View>
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>Gratis</Text>
            </View>
          </View>

          {/* Statistik Kucing (Kotak-kotak kecil) */}
          <View style={styles.statsRow}>
            <InfoBox label="Umur" value={cat.age} color="#E3F2FD" text="#1E88E5" />
            <InfoBox label="Gender" value={cat.sex} color="#FCE4EC" text="#D81B60" />
            <InfoBox label="Berat" value={cat.weight} color="#E8F5E9" text="#43A047" />
          </View>

          {/* Profil Pemilik */}
          <View style={styles.ownerSection}>
            <Image 
              source={{ uri: `https://ui-avatars.com/api/?name=${cat.owner}&background=random` }} 
              style={styles.ownerAvatar} 
            />
            <View style={{flex: 1, marginLeft: 12}}>
              <Text style={styles.ownerName}>{cat.owner}</Text>
              <Text style={styles.ownerRole}>Pemilik (Owner)</Text>
            </View>
            <TouchableOpacity style={styles.chatBtn}>
              <Ionicons name="chatbubble-ellipses" size={20} color={Colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Deskripsi */}
          <Text style={styles.sectionTitle}>Tentang {cat.name}</Text>
          <Text style={styles.description}>
            {cat.desc} 
            {"\n\n"}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </Text>

          {/* Ruang kosong biar tombol bawah tidak menutupi teks */}
          <View style={{ height: 100 }} />
        </ScrollView>

        {/* 4. Tombol Aksi Melayang di Bawah */}
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.adoptBtn} onPress={() => alert('Fitur Adopsi Segera Hadir!')}>
            <Text style={styles.adoptText}>Ajukan Adopsi</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Komponen Kecil untuk Kotak Info
function InfoBox({ label, value, color, text }) {
  return (
    <View style={[styles.infoBox, { backgroundColor: color }]}>
      <Text style={[styles.infoValue, { color: text }]}>{value}</Text>
      <Text style={styles.infoLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  image: { width: '100%', height: 400, resizeMode: 'cover' },
  headerOverlay: {
    position: 'absolute', top: 0, left: 0, right: 0,
    flexDirection: 'row', justifyContent: 'space-between', padding: 20,
    zIndex: 10
  },
  iconBtn: {
    backgroundColor: 'rgba(255,255,255,0.8)', padding: 10, borderRadius: 50
  },
  infoContainer: {
    flex: 1, backgroundColor: 'white', marginTop: -50,
    borderTopLeftRadius: 30, borderTopRightRadius: 30,
    paddingHorizontal: 25, paddingTop: 30,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  name: { fontSize: 28, fontWeight: 'bold', color: Colors.text },
  breed: { fontSize: 16, color: '#888', marginTop: 4 },
  priceTag: { backgroundColor: Colors.primary, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  priceText: { color: 'white', fontWeight: 'bold' },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  infoBox: { width: '30%', padding: 12, borderRadius: 15, alignItems: 'center' },
  infoValue: { fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  infoLabel: { fontSize: 12, color: '#666' },
  ownerSection: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#FAFAFA', 
    padding: 15, borderRadius: 15, marginBottom: 25, borderWidth: 1, borderColor: '#EEE' 
  },
  ownerAvatar: { width: 50, height: 50, borderRadius: 25 },
  ownerName: { fontSize: 16, fontWeight: 'bold', color: Colors.text },
  ownerRole: { fontSize: 12, color: '#888' },
  chatBtn: { padding: 10, backgroundColor: '#E8F5E9', borderRadius: 50 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text, marginBottom: 10 },
  description: { fontSize: 15, color: '#666', lineHeight: 24 },
  bottomAction: {
    position: 'absolute', bottom: 20, left: 20, right: 20,
  },
  adoptBtn: {
    backgroundColor: Colors.secondary, padding: 18, borderRadius: 20,
    alignItems: 'center', elevation: 5, shadowColor: Colors.primary, shadowOpacity: 0.3
  },
  adoptText: { color: 'white', fontSize: 18, fontWeight: 'bold' }
});