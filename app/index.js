import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Button from '../components/ui/Button';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <ScreenWrapper style={{ paddingHorizontal: 0 }} backgroundColor={Colors.background}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 1. HERO SECTION */}
        <View style={styles.heroSection}>
          <Image 
            source={require('../assets/kucing.png')} 
            style={styles.heroImage} 
            resizeMode="contain"
          />
          
          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>Welcome to Meong id</Text>
            <Text style={styles.heroSubtitle}>
              Platform Kesejahteraan Kucing No. 1 di Indonesia
            </Text>
            <Text style={styles.heroDescription}>
              Lapor kucing hilang, adopsi teman baru, dan bergabung dengan komunitas pecinta kucing sekarang juga!
            </Text>
            
            <View style={styles.buttonContainer}>
              <Button 
                title="Daftar Sekarang" 
                onPress={() => router.push('/signup')}
                style={{ flex: 1 }}
              />
              <Button 
                title="Masuk" 
                variant="outline" 
                onPress={() => router.push('/login')}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>

        {/* 2. Banner Informasi */}
        <View style={styles.infoSection}>
          <Text style={styles.sectionTitle}>Kenapa Meong id?</Text>
          <View style={styles.gridContainer}>
            <InfoCard emoji="🏠" title="Adopsi Mudah" desc="Temukan teman bulu impianmu." />
            <InfoCard emoji="📢" title="Lapor Hilang" desc="Bantu cari kucing yang hilang." />
            <InfoCard emoji="🤝" title="Donasi" desc="Bantu kucing jalanan." />
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}

function InfoCard({ emoji, title, desc }) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  heroSection: {
    alignItems: 'center',
    paddingTop: 40,
    width: '100%',
  },
  heroImage: { 
    width: width * 0.9, 
    height: 250, 
    marginBottom: 20 
  },
  heroContent: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    ...Colors.shadow,
    paddingBottom: 50,
  },
  heroTitle: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: Colors.secondary, 
    textAlign: 'center', 
    marginBottom: 10 
  },
  heroSubtitle: { 
    fontSize: 16, 
    fontWeight: '600', 
    color: Colors.primary, 
    textAlign: 'center', 
    marginBottom: 12 
  },
  heroDescription: { 
    fontSize: 14, 
    color: Colors.text, 
    textAlign: 'center', 
    marginBottom: 30, 
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  buttonContainer: { 
    flexDirection: 'row', 
    gap: 15, 
    width: '100%',
  },
  infoSection: { 
    padding: 24,
    backgroundColor: Colors.white 
  },
  sectionTitle: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    color: Colors.secondary, 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  gridContainer: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    gap: 12 
  },
  infoCard: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0f0f0',
    ...Colors.shadow,
    elevation: 3, // Slightly softer shadow
  },
  emoji: { fontSize: 32, marginBottom: 10 },
  cardTitle: { 
    fontSize: 13, 
    fontWeight: 'bold', 
    color: Colors.secondary, 
    marginBottom: 5, 
    textAlign: 'center' 
  },
  cardDesc: { 
    fontSize: 11, 
    color: '#888', 
    textAlign: 'center', 
    lineHeight: 16 
  },
});