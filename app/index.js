import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors'; // Path disesuaikan (hanya naik 1 level)

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. HERO SECTION */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Welcome to Meong id</Text>
          <Text style={styles.heroSubtitle}>
            Platform Kesejahteraan Kucing No. 1 di Indonesia
          </Text>
          <Text style={styles.heroDescription}>
            Lapor kucing hilang, adopsi teman baru, dan bergabung dengan komunitas pecinta kucing sekarang juga!
          </Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.btnPrimary} 
              onPress={() => router.push('/signup')}
            >
              <Text style={styles.btnText}>Daftar Sekarang</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.btnPrimary, styles.btnOutline]} 
              onPress={() => router.push('/login')}
            >
              <Text style={[styles.btnText, styles.btnOutlineText]}>Masuk</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Image 
          source={require('../assets/kucing.png')} 
          style={styles.heroImage} 
          resizeMode="contain"
        />
      </View>

      {/* 2. Banner Informasi */}
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Kenapa Meong id?</Text>
        <View style={styles.gridContainer}>
          <View style={styles.infoCard}>
            <Text style={styles.emoji}>🏠</Text>
            <Text style={styles.cardTitle}>Adopsi Mudah</Text>
            <Text style={styles.cardDesc}>Temukan teman bulu impianmu.</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.emoji}>📢</Text>
            <Text style={styles.cardTitle}>Lapor Hilang</Text>
            <Text style={styles.cardDesc}>Bantu cari kucing yang hilang.</Text>
          </View>
           <View style={styles.infoCard}>
            <Text style={styles.emoji}>🤝</Text>
            <Text style={styles.cardTitle}>Donasi</Text>
            <Text style={styles.cardDesc}>Bantu kucing jalanan.</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  heroSection: {
    backgroundColor: Colors.background,
    padding: 20,
    alignItems: 'center',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    paddingTop: 60,
  },
  heroTitle: { fontSize: 28, fontWeight: 'bold', color: Colors.secondary, textAlign: 'center', marginBottom: 10 },
  heroSubtitle: { fontSize: 16, fontWeight: '600', color: Colors.primary, textAlign: 'center', marginBottom: 5 },
  heroDescription: { fontSize: 14, color: Colors.text, textAlign: 'center', marginBottom: 20, lineHeight: 22 },
  heroImage: { width: width * 0.85, height: 220, marginTop: 10 },
  buttonContainer: { flexDirection: 'row', gap: 12, justifyContent: 'center', marginTop: 10 },
  btnPrimary: {
    backgroundColor: Colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    ...Colors.shadow,
  },
  btnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
  btnOutline: { backgroundColor: 'transparent', borderWidth: 2, borderColor: Colors.secondary },
  btnOutlineText: { color: Colors.secondary },
  infoSection: { padding: 24 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: Colors.secondary, marginBottom: 16, textAlign: 'center' },
  gridContainer: { flexDirection: 'row', justifyContent: 'space-between', gap: 10 },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#eee',
    ...Colors.shadow,
  },
  emoji: { fontSize: 30, marginBottom: 5 },
  cardTitle: { fontSize: 14, fontWeight: 'bold', color: Colors.secondary, marginBottom: 2, textAlign: 'center' },
  cardDesc: { fontSize: 10, color: '#666', textAlign: 'center' },
});