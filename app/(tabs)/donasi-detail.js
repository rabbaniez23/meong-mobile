import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function DonasiDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  let item = null;
  if (params.data) {
    item = JSON.parse(params.data);
  }

  const progress = item ? (item.collected / item.target) * 100 : 0;

  const goToPayment = () => {
    // Arahkan ke halaman pembayaran dengan membawa data item
    router.push({
      pathname: '/(tabs)/donasi-payment',
      params: { data: JSON.stringify(item) }
    });
  };

  if (!item) return <View style={styles.center}><Text>Data tidak ditemukan</Text></View>;

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Image */}
        <View style={styles.imageHeader}>
            <Image source={item.image} style={styles.image} />
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.secondary} />
            </TouchableOpacity>
        </View>

        <View style={styles.content}>
            <View style={styles.badgeRow}>
                <Text style={styles.badge}>{item.type}</Text>
                <Text style={styles.verifiedBadge}>✅ Terverifikasi</Text>
            </View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.location}>📍 {item.location}</Text>

            {/* Statistik Donasi */}
            <View style={styles.statsBox}>
                <View style={styles.statsHeader}>
                    <Text style={styles.statsLabel}>Terkumpul</Text>
                    <Text style={styles.statsLabel}>Target</Text>
                </View>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
                </View>
                <View style={styles.statsTextRow}>
                    <Text style={styles.statsValue}>Rp {item.collected.toLocaleString()}</Text>
                    <Text style={styles.statsValueTarget}>Rp {item.target.toLocaleString()}</Text>
                </View>
                <Text style={styles.donorCount}>145+ Orang telah berdonasi</Text>
            </View>

            {/* Cerita / Deskripsi */}
            <View style={styles.storySection}>
                <Text style={styles.sectionTitle}>Cerita Penggalangan Dana</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.description}>
                  Dana yang terkumpul akan digunakan untuk biaya pengobatan, sterilisasi massal, dan perbaikan fasilitas shelter agar kucing-kucing ini bisa hidup lebih layak. Mari bantu mereka sekarang!
                </Text>
            </View>

            {/* Info Penyelenggara */}
            <View style={styles.organizerBox}>
                <View style={styles.organizerAvatar}>
                    <Ionicons name="business" size={24} color={Colors.white} />
                </View>
                <View>
                    <Text style={styles.organizerLabel}>Penyelenggara</Text>
                    <Text style={styles.organizerName}>Meong Foundation ID</Text>
                </View>
            </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.donateBtn} onPress={goToPayment}>
            <Text style={styles.donateBtnText}>Donasi Sekarang</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  imageHeader: { position: 'relative', height: 280 },
  image: { width: '100%', height: '100%', resizeMode: 'cover' },
  backBtn: { position: 'absolute', top: 40, left: 20, backgroundColor: Colors.white, padding: 8, borderRadius: 20, ...Colors.shadow },
  
  content: { padding: 24, marginTop: -25, backgroundColor: Colors.white, borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  badgeRow: { flexDirection: 'row', gap: 8, marginBottom: 10 },
  badge: { backgroundColor: '#E8F5E9', color: Colors.secondary, paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, fontSize: 11, fontWeight: 'bold' },
  verifiedBadge: { backgroundColor: '#E3F2FD', color: '#1565C0', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 6, fontSize: 11, fontWeight: 'bold' },
  
  title: { fontSize: 22, fontWeight: 'bold', color: Colors.secondary, marginBottom: 4 },
  location: { fontSize: 13, color: '#666', marginBottom: 20 },

  statsBox: { padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#EEE', marginBottom: 25, backgroundColor: '#FAFAFA' },
  statsHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  statsLabel: { fontSize: 12, color: '#888' },
  progressBarBg: { height: 8, backgroundColor: '#E0E0E0', borderRadius: 4, marginBottom: 8 },
  progressBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 4 },
  statsTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  statsValue: { fontSize: 16, fontWeight: 'bold', color: Colors.secondary },
  statsValueTarget: { fontSize: 14, color: '#888' },
  donorCount: { fontSize: 11, color: Colors.primary, marginTop: 8, fontStyle: 'italic' },

  storySection: { marginBottom: 25 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary, marginBottom: 12 },
  description: { fontSize: 14, color: Colors.text, lineHeight: 24, marginBottom: 10, textAlign: 'justify' },

  organizerBox: { flexDirection: 'row', alignItems: 'center', padding: 15, backgroundColor: '#F5F5F5', borderRadius: 12 },
  organizerAvatar: { width: 45, height: 45, backgroundColor: Colors.secondary, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  organizerLabel: { fontSize: 10, color: '#666' },
  organizerName: { fontSize: 14, fontWeight: 'bold', color: Colors.text },

  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: '#F0F0F0', elevation: 10 },
  donateBtn: { backgroundColor: Colors.secondary, padding: 16, borderRadius: 15, alignItems: 'center', ...Colors.shadow },
  donateBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
});