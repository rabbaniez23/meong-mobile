import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HilangDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  let cat = null;
  if (params.catData) {
    cat = JSON.parse(params.catData);
  }

  const handleLaporPenemuan = () => {
    Alert.alert("Terima Kasih!", `Laporan penemuan ${cat.name} akan diteruskan ke pemilik. Mohon tunggu dihubungi.`);
  };

  if (!cat) return <View style={styles.center}><Text>Data tidak ditemukan.</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          {/* Filter Gelap sedikit biar teks di atasnya terbaca */}
          <Image source={cat.image} style={styles.heroImage} />
          <View style={styles.overlay} /> 

          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
             <Ionicons name="arrow-back" size={24} color={Colors.white} />
          </TouchableOpacity>
          
          <View style={styles.headerOverlayText}>
             <Text style={styles.overlayTitle}>DICARI: {cat.name}</Text>
             <Text style={styles.overlaySubtitle}><Ionicons name="time" size={14}/> Terakhir dilihat: {cat.lastSeen}</Text>
          </View>
        </View>

        <View style={styles.contentContainer}>
           <View style={styles.locationBox}>
              <Ionicons name="location" size={24} color={Colors.primary} />
              <View style={{marginLeft: 10, flex: 1}}>
                  <Text style={styles.locationLabel}>Lokasi Hilang</Text>
                  <Text style={styles.locationValue}>{cat.location}</Text>
              </View>
           </View>

          <Text style={styles.sectionTitle}>Ciri-ciri & Kronologi</Text>
          <Text style={styles.description}>{cat.description}</Text>

           <Text style={styles.sectionTitle}>Kontak Pemilik</Text>
           <View style={styles.ownerInfo}>
              <Text style={styles.contactNote}>
                Jika melihat kucing ini, mohon segera tekan tombol lapor di bawah untuk menghubungi pemilik.
              </Text>
           </View>
        </View>
      </ScrollView>

      <View style={styles.bottomAction}>
        {/* Tombol Lapor Penemuan */}
        <TouchableOpacity style={styles.btnLapor} onPress={handleLaporPenemuan}>
          <Ionicons name="megaphone" size={20} color={Colors.white} style={{marginRight: 10}} />
          <Text style={styles.btnText}>Saya Melihat Kucing Ini!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageContainer: { position: 'relative', height: 350 },
  heroImage: { width: width, height: '100%', resizeMode: 'cover' },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0,0,0,0.3)' }, // Gelapin gambar
  backButton: {
    position: 'absolute', top: 40, left: 20, backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8, borderRadius: 20
  },
  headerOverlayText: { position: 'absolute', bottom: 30, left: 20 },
  overlayTitle: { color: Colors.white, fontSize: 28, fontWeight: 'bold', marginBottom: 5 },
  overlaySubtitle: { color: Colors.white, fontSize: 16 },

  contentContainer: { padding: 20, backgroundColor: Colors.white, flex: 1 },
  locationBox: { 
    flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.background, 
    padding: 15, borderRadius: 15, marginBottom: 25, borderWidth: 1, borderColor: Colors.primary
  },
  locationLabel: { fontSize: 12, color: '#888' },
  locationValue: { fontSize: 16, fontWeight: 'bold', color: Colors.secondary },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary, marginBottom: 10 },
  description: { fontSize: 14, color: Colors.text, lineHeight: 22, marginBottom: 25 },
  
  ownerInfo: { backgroundColor: '#F9F9F9', padding: 15, borderRadius: 15 },
  contactNote: { color: Colors.text, fontStyle: 'italic' },

  bottomAction: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  // Style tombol berbeda untuk Lapor (Lebih mencolok tapi tetap dalam tema)
  btnLapor: { 
    backgroundColor: Colors.secondary, flexDirection: 'row', justifyContent: 'center',
    paddingVertical: 15, borderRadius: 15, alignItems: 'center', ...Colors.shadow 
  },
  btnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
});