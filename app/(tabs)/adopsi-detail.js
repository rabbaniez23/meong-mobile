import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const { width, height } = Dimensions.get('window');

export default function AdopsiDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  let cat = { name: "Unknown" };
  if (params.catData) {
    cat = JSON.parse(params.catData);
  }

  const handleAdopt = () => {
    Alert.alert("Ajukan Adopsi", `Apakah kamu yakin ingin mengadopsi ${cat.name}?`, [
        { text: "Batal", style: 'cancel' },
        { text: "Ya, Ajukan", onPress: () => {
            Alert.alert("Berhasil", "Pengajuan adopsi terkirim! Pemilik akan menghubungimu.");
            router.back();
        }}
    ]);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Full Image Header */}
        <View style={styles.imageContainer}>
            <Image source={cat.image} style={styles.image} />
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
            <View style={styles.gradient} />
        </View>

        {/* Content Details */}
        <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.name}>{cat.name}</Text>
                    <View style={styles.locationRow}>
                         <Ionicons name="location" size={16} color={Colors.primary} />
                         <Text style={styles.location}>{cat.location}</Text>
                    </View>
                </View>
                <View style={[styles.genderIcon, { backgroundColor: cat.gender === 'Jantan' ? '#E3F2FD' : '#FFF3E0' }]}>
                    <Ionicons 
                        name={cat.gender === 'Jantan' ? 'male' : 'female'} 
                        size={24} 
                        color={cat.gender === 'Jantan' ? '#1976D2' : '#F57C00'} 
                    />
                </View>
            </View>

            {/* Attributes Grid */}
            <View style={styles.attributesGrid}>
                <AttributeItem label="Umur" value={cat.age} />
                <AttributeItem label="Gender" value={cat.gender} />
                <AttributeItem label="Berat" value="3.5 kg" /> 
                <AttributeItem label="Vaksin" value="Lengkap" />
            </View>

            {/* Owner Section */}
            <View style={styles.ownerSection}>
                <View style={styles.ownerInfo}>
                    <Image source={require('../../assets/icon.png')} style={styles.ownerAvatar} />
                    <View>
                        <Text style={styles.ownerLabel}>Pemilik Saat Ini</Text>
                        <Text style={styles.ownerName}>Meong Shelter Bandung</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.chatBtn}>
                    <Ionicons name="chatbubble-ellipses-outline" size={20} color={Colors.secondary} />
                </TouchableOpacity>
            </View>

            {/* Description */}
            <Text style={styles.sectionTitle}>Tentang {cat.name}</Text>
            <Text style={styles.description}>
                {cat.description || "Kucing ini sangat lucu dan butuh rumah baru. Dia suka bermain bola dan tidur di pangkuan. Sangat ramah dengan anak-anak dan kucing lain."}
            </Text>

        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <Button title="Ajukan Adopsi" style={{ width: '100%' }} onPress={handleAdopt} />
      </View>
    </View>
  );
}

function AttributeItem({ label, value }) {
    return (
        <View style={styles.attributeBox}>
            <Text style={styles.attrValue}>{value}</Text>
            <Text style={styles.attrLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  imageContainer: {
      height: height * 0.45,
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
  contentContainer: {
      marginTop: -30,
      backgroundColor: Colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      minHeight: 500,
  },
  headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
  },
  name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 4,
  },
  locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  location: {
      fontSize: 14,
      color: '#888',
  },
  genderIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
  },
  attributesGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
  },
  attributeBox: {
      backgroundColor: Colors.background,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 16,
      alignItems: 'center',
      width: '23%',
  },
  attrValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.secondary,
      marginBottom: 4,
      textAlign: 'center',
  },
  attrLabel: {
      fontSize: 12,
      color: '#888',
  },
  ownerSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderRadius: 16,
      marginBottom: 24,
  },
  ownerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  ownerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#EEE',
  },
  ownerLabel: {
      fontSize: 12,
      color: '#888',
  },
  ownerName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.text,
  },
  chatBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E8F5E9',
      justifyContent: 'center',
      alignItems: 'center',
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 12,
  },
  description: {
      fontSize: 14,
      color: '#666',
      lineHeight: 24,
  },
  bottomBar: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: 20,
      backgroundColor: Colors.white,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  }
});