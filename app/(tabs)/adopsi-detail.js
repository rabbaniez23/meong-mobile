import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function AdopsiDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parsing data JSON yang dikirim dari halaman sebelumnya
  let cat = null;
  if (params.catData) {
    cat = JSON.parse(params.catData);
  }

  const handleAjukanAdopsi = () => {
    Alert.alert("Pengajuan Terkirim", `Permintaan adopsi untuk ${cat.name} telah dikirim ke pemilik.`);
  };

  if (!cat) return <View style={styles.center}><Text>Data tidak ditemukan.</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Gambar Besar */}
        <View style={styles.imageContainer}>
          <Image source={cat.image} style={styles.heroImage} />
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
             <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
          </TouchableOpacity>
        </View>

        {/* Konten Detail */}
        <View style={styles.contentContainer}>
          <View style={styles.headerInfo}>
            <View>
              <Text style={styles.catName}>{cat.name}</Text>
              <Text style={styles.location}>📍 {cat.location}</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Siap Adopsi</Text>
            </View>
          </View>

          {/* Info Box (Usia & Gender) */}
          <View style={styles.infoBoxContainer}>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Usia</Text>
              <Text style={styles.infoValue}>{cat.age}</Text>
            </View>
            <View style={styles.infoBox}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{cat.gender}</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Tentang {cat.name}</Text>
          <Text style={styles.description}>{cat.description}</Text>

           <Text style={styles.sectionTitle}>Pemilik Saat Ini</Text>
           <View style={styles.ownerInfo}>
              <View style={styles.ownerAvatar}>
                 <Ionicons name="person" size={20} color={Colors.white} />
              </View>
              <View>
                 <Text style={styles.ownerName}>Meong Official Shelter</Text>
                 <Text style={styles.ownerRole}>Terverifikasi</Text>
              </View>
           </View>
        </View>
      </ScrollView>

      {/* Tombol Aksi di Bagian Bawah */}
      <View style={styles.bottomAction}>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleAjukanAdopsi}>
          <Text style={styles.btnText}>Ajukan Adopsi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageContainer: { position: 'relative' },
  heroImage: { width: width, height: 300, resizeMode: 'cover' },
  backButton: {
    position: 'absolute', top: 40, left: 20, backgroundColor: Colors.white,
    padding: 8, borderRadius: 20, ...Colors.shadow
  },
  contentContainer: { padding: 20, borderTopLeftRadius: 30, borderTopRightRadius: 30, backgroundColor: Colors.white, marginTop: -30 },
  headerInfo: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 },
  catName: { fontSize: 26, fontWeight: 'bold', color: Colors.secondary },
  location: { fontSize: 14, color: '#888', marginTop: 5 },
  badge: { backgroundColor: Colors.primary, paddingVertical: 5, paddingHorizontal: 12, borderRadius: 10 },
  badgeText: { color: Colors.white, fontWeight: 'bold', fontSize: 12 },
  
  infoBoxContainer: { flexDirection: 'row', gap: 15, marginBottom: 25 },
  infoBox: { flex: 1, backgroundColor: Colors.background, padding: 15, borderRadius: 15, alignItems: 'center' },
  infoLabel: { fontSize: 12, color: '#888', marginBottom: 5 },
  infoValue: { fontSize: 16, fontWeight: 'bold', color: Colors.secondary },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary, marginBottom: 10, marginTop: 10 },
  description: { fontSize: 14, color: Colors.text, lineHeight: 22, marginBottom: 20 },
  
  ownerInfo: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F9F9F9', padding: 15, borderRadius: 15 },
  ownerAvatar: { width: 40, height: 40, backgroundColor: Colors.secondary, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  ownerName: { fontWeight: 'bold', color: Colors.secondary },
  ownerRole: { fontSize: 12, color: '#888' },

  bottomAction: { padding: 20, borderTopWidth: 1, borderTopColor: '#eee' },
  btnPrimary: { backgroundColor: Colors.secondary, paddingVertical: 15, borderRadius: 15, alignItems: 'center', ...Colors.shadow },
  btnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
});