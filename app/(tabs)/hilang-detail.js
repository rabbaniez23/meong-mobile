import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const { height } = Dimensions.get('window');

export default function HilangDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  let cat = { name: "Unknown", description: "" };
  if (params.catData) {
    cat = JSON.parse(params.catData);
  }

  const handleContact = () => {
       // Direct to Chat Room
       const roomId = `room-${cat.id}-${Date.now()}`; // Simulated unique room ID
       router.push({
           pathname: '/chat-room',
           params: { 
               roomId: roomId,
               context: `Laporan Hilang: ${cat.name}`
           }
       });
  };

  const handleFound = () => {
    Alert.alert("Lapor Ditemukan", "Apakah kamu melihat kucing ini?", [
        { text: "Belum", style: 'cancel' },
        { 
            text: "Ya, Saya Melihatnya", 
            onPress: () => router.push({ pathname: '/add-hilang', params: { type: 'found' } })
        }
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Full Image Header with Alert Overlay */}
        <View style={styles.imageContainer}>
            <Image source={cat.image} style={styles.image} />
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            
            <View style={styles.alertOverlay}>
                 <Ionicons name="warning" size={24} color={Colors.white} />
                 <Text style={styles.alertText}>KUCING HILANG</Text>
            </View>
        </View>

        {/* Content Details */}
        <View style={styles.contentContainer}>
            <View style={styles.header}>
                <Text style={styles.name}>{cat.name}</Text>
                <Text style={styles.timeTag}>Hilang sejak: {cat.lastSeen}</Text>
            </View>

            <View style={styles.infoCard}>
                <View style={styles.infoRow}>
                    <Ionicons name="location" size={20} color={Colors.error} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Terakhir Dilihat</Text>
                        <Text style={styles.value}>{cat.location}</Text>
                    </View>
                </View>
                
                {/* Map Placeholder */}
                <View style={styles.mapPlaceholder}>
                    <Ionicons name="map" size={32} color="#CCC" />
                    <Text style={styles.mapText}>Peta Lokasi Terakhir</Text>
                </View>

                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Ionicons name="call" size={20} color={Colors.secondary} />
                    <View style={{ flex: 1 }}>
                        <Text style={styles.label}>Kontak Pemilik</Text>
                        <Text style={styles.value}>{cat.contacts || "Chat melalui aplikasi"}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.sectionTitle}>Ciri-Ciri Utama</Text>
            
            {/* Badges for Special traits */}
            <View style={styles.badgeRow}>
                <Badge text="Warna: Putih" variant="default" />
                <Badge text="Ekor Panjang" variant="default" />
                <Badge text="Kalung Merah" variant="error" />
            </View>

            <Text style={styles.description}>
                {cat.description || "Tidak ada deskripsi."}
            </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <Button 
            title="Saya Menemukannya!" 
            onPress={handleFound} 
            style={{ marginBottom: 10, backgroundColor: Colors.error }} 
        />
        <Button 
            title="Hubungi Pemilik (Chat)" 
            variant="outline" 
            onPress={handleContact} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  imageContainer: {
      height: height * 0.4,
      width: '100%',
      position: 'relative',
  },
  image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  backBtn: {
      position: 'absolute',
      top: 50,
      left: 20,
      backgroundColor: 'rgba(0,0,0,0.3)',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
  },
  alertOverlay: {
      position: 'absolute',
      bottom: 40,
      left: 20,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.error,
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 20,
      gap: 8,
  },
  alertText: {
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 14,
      letterSpacing: 1,
  },
  contentContainer: {
      marginTop: -30,
      backgroundColor: Colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      minHeight: 500,
  },
  header: {
      marginBottom: 20,
  },
  name: {
      fontSize: 26,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 5,
  },
  timeTag: {
      fontSize: 14,
      color: '#666',
      fontStyle: 'italic',
  },
  infoCard: {
      backgroundColor: '#FFF5F5', // Light red bg
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      borderWidth: 1,
      borderColor: '#FFEBEE',
  },
  infoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
  },
  divider: {
      height: 1,
      backgroundColor: '#FFCDD2',
      marginVertical: 15,
  },
  label: {
      fontSize: 12,
      color: '#888',
      marginBottom: 2,
  },
  value: {
      fontSize: 16,
      fontWeight: '600',
      color: Colors.text,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 10,
  },
  description: {
      fontSize: 15,
      color: '#444',
      lineHeight: 24,
      marginTop: 10,
  },
  bottomBar: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: 20,
      backgroundColor: Colors.white,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  },
  badgeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
      marginBottom: 10,
  },
  mapPlaceholder: {
      height: 120,
      backgroundColor: 'white',
      borderRadius: 12,
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#FFCDD2',
      borderStyle: 'dashed',
  },
  mapText: {
      fontSize: 12,
      color: '#888',
      marginTop: 5,
  }
});