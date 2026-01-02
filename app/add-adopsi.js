import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function AddAdopsiScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [description, setDescription] = useState('');
  
  // Medical History State
  const [medHistory, setMedHistory] = useState({
      vaccinated: false,
      sterilized: false,
      dewormed: false // Obat Cacing
  });

  // KYC / Verification State
  const [kycImage, setKycImage] = useState(null);

  const toggleMed = (key) => {
      setMedHistory(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleUploadKTP = () => {
      Alert.alert("Upload KTP", "Fitur ini akan membuka galeri/kamera", [
          { text: "Simulasi Upload", onPress: () => setKycImage("ktp_placeholder.jpg") }
      ]);
  };

  const isFormValid = name && breed && description && kycImage;

  return (
    <ScreenWrapper backgroundColor={Colors.background}>
      <Header title="Buat Postingan Adopsi" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
         {/* Top Hint */}
         <View style={styles.hintBox}>
            <Text style={styles.hintText}>Sistem Smart Screening kami akan membantu mencocokkan kucingmu dengan adopter terbaik!</Text>
         </View>

         {/* Photo Upload Area */}
         <View style={styles.uploadArea}>
            <View style={styles.uploadPlaceholder}>
                <Ionicons name="camera" size={48} color="#CCC" />
                <Text style={styles.uploadText}>Tambah Foto Utama</Text>
            </View>
         </View>

         <View style={styles.formContainer}>
            <Text style={styles.sectionTitle}>Detail Kucing</Text>
            
            <View style={styles.inputSpacing}>
                <Input 
                    label="Nama Kucing" 
                    placeholder="Contoh: Mochi" 
                    value={name} 
                    onChangeText={setName} 
                />
            </View>
            
            <View style={styles.inputSpacing}>
                <Input 
                    label="Ras / Jenis" 
                    placeholder="Contoh: Domestik, Persia..." 
                    value={breed} 
                    onChangeText={setBreed} 
                />
            </View>

            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 12 }}>
                    <Input label="Umur" placeholder="1 Thn" />
                </View>
                <View style={{ flex: 1 }}>
                    <Input label="Gender" placeholder="Jantan/Betina" />
                </View>
            </View>

            {/* Medical History Chips */}
            <View style={styles.inputSpacing}>
                <Text style={styles.label}>Riwayat Medis</Text>
                <View style={styles.chipContainer}>
                    <TouchableOpacity 
                        style={[styles.chip, medHistory.vaccinated && styles.chipActive]} 
                        onPress={() => toggleMed('vaccinated')}
                    >
                        <Ionicons name="shield-checkmark" size={16} color={medHistory.vaccinated ? 'white' : '#666'} />
                        <Text style={[styles.chipText, medHistory.vaccinated && styles.chipTextActive]}>Sudah Vaksin</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.chip, medHistory.sterilized && styles.chipActive]} 
                        onPress={() => toggleMed('sterilized')}
                    >
                        <Ionicons name="cut" size={16} color={medHistory.sterilized ? 'white' : '#666'} />
                        <Text style={[styles.chipText, medHistory.sterilized && styles.chipTextActive]}>Sudah Steril</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.chip, medHistory.dewormed && styles.chipActive]} 
                        onPress={() => toggleMed('dewormed')}
                    >
                        <Ionicons name="medkit" size={16} color={medHistory.dewormed ? 'white' : '#666'} />
                        <Text style={[styles.chipText, medHistory.dewormed && styles.chipTextActive]}>Obat Cacing</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.inputSpacing}>
                <Input 
                    label="Cerita Singkat" 
                    placeholder="Tulis sifat, kebiasaan unik, dan alasan kenapa dia butuh rumah baru..." 
                    multiline
                    numberOfLines={6}
                    value={description} 
                    onChangeText={setDescription}
                    style={{ height: 120, textAlignVertical: 'top', paddingTop: 10 }}
                />
            </View>

            {/* KYC / Verification Section */}
            <View style={styles.kycSection}>
                <Text style={styles.sectionTitle}>Verifikasi Pemilik (KYC)</Text>
                <Text style={styles.kycDesc}>
                    Untuk menjaga keamanan dan mencegah penipuan, kami mewajibkan verifikasi identitas (KTP) sebelum memposting. Data aman & terenkripsi.
                </Text>
                
                <TouchableOpacity style={styles.uploadKTP} onPress={handleUploadKTP}>
                    {kycImage ? (
                        <View style={{ alignItems: 'center' }}>
                            <Ionicons name="checkmark-circle" size={40} color={Colors.primary} />
                            <Text style={{ color: Colors.primary, fontWeight: 'bold', marginTop: 5 }}>KTP Terupload</Text>
                            <Text style={{ fontSize: 10, color: '#888' }}>Klik untuk ubah</Text>
                        </View>
                    ) : (
                        <View style={{ alignItems: 'center' }}>
                            <Ionicons name="id-card-outline" size={32} color="#888" />
                            <Text style={{ color: '#666', marginTop: 5 }}>Upload Foto KTP</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

         </View>
      </ScrollView>

      <View style={styles.footer}>
          <Button 
            title="Terbitkan Postingan" 
            onPress={() => {
                Alert.alert("Sukses", "Postingan Anda sedang ditinjau dan akan segera tayang!");
                router.back();
            }} 
            disabled={!isFormValid}
            style={!isFormValid ? { backgroundColor: '#CCC' } : {}}
          />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  hintBox: {
      padding: 12,
      backgroundColor: '#E8F5E9',
      marginHorizontal: 20,
      marginTop: 10,
      borderRadius: 8,
  },
  hintText: {
      color: Colors.secondary,
      fontSize: 12,
      textAlign: 'center',
  },
  uploadArea: {
      alignItems: 'center',
      marginVertical: 20,
  },
  uploadPlaceholder: {
      width: 160,
      height: 160,
      backgroundColor: Colors.white,
      borderRadius: 24,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: '#DDD',
      borderStyle: 'dashed',
  },
  uploadText: {
      marginTop: 10,
      color: '#999',
      fontWeight: '600',
      fontSize: 12,
  },
  formContainer: {
      backgroundColor: Colors.white,
      padding: 24,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      ...Colors.shadow,
      paddingBottom: 40,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 15,
      marginTop: 10,
  },
  inputSpacing: {
      marginBottom: 15,
  },
  row: {
      flexDirection: 'row',
      marginBottom: 8,
  },
  footer: {
      padding: 20,
      backgroundColor: Colors.white,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  },
  // New Styles
  label: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
    marginBottom: 8,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: 12,
    color: '#666',
  },
  chipTextActive: {
    color: 'white',
    fontWeight: 'bold',
  },
  kycSection: {
      marginTop: 20,
      padding: 20,
      backgroundColor: '#F9FAFB',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#EEE',
  },
  kycDesc: {
      fontSize: 12,
      color: '#666',
      marginBottom: 15,
      lineHeight: 18,
  },
  uploadKTP: {
      height: 120,
      backgroundColor: 'white',
      borderWidth: 2,
      borderColor: '#DDD',
      borderStyle: 'dashed',
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
  },
});
