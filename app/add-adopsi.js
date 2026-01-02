import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader'; 
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
      dewormed: false, 
      fleaFree: false // Bebas Kutu
  });
  
  // Multi-Photo State (3 Slots)
  const [photos, setPhotos] = useState([null, null, null]);

  // KYC State
  const [kycImage, setKycImage] = useState(null);

  const toggleMed = (key) => {
      setMedHistory(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handlePhotoUpload = (index) => {
      const newPhotos = [...photos];
      // Simulate toggle upload
      if (newPhotos[index]) {
          newPhotos[index] = null;
      } else {
          newPhotos[index] = "dummy_path"; 
      }
      setPhotos(newPhotos);
  };

  const isFormValid = name && breed && description && kycImage && photos[0]; // Require at least 1 photo

  return (
    <View style={styles.container}>
      <CustomHeader title="Buat Postingan Adopsi" showBackBtn />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
             <View style={styles.hintBox}>
                <Text style={styles.hintText}>Sistem Smart Screening kami akan membantu mencocokkan kucingmu dengan adopter terbaik!</Text>
             </View>

             {/* Multi-Photo Upload Area */}
             <View style={styles.uploadSection}>
                <Text style={styles.sectionLabel}>Foto Kucing (Min. 1)</Text>
                <View style={styles.photoRow}>
                    {photos.map((photo, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.photoBox, photo && styles.photoBoxFilled]} 
                            onPress={() => handlePhotoUpload(index)}
                        >
                            {photo ? (
                                <Ionicons name="image" size={32} color={Colors.primary} />
                            ) : (
                                <Ionicons name="add" size={32} color="#CCC" />
                            )}
                            {index === 0 && !photo && <Text style={styles.mainPhotoText}>Utama</Text>}
                        </TouchableOpacity>
                    ))}
                </View>
             </View>

             <View style={styles.formContainer}>
                <Text style={styles.sectionTitle}>Detail Kucing</Text>
                
                <View style={styles.inputSpacing}>
                    <Input label="Nama Kucing" placeholder="Contoh: Mochi" value={name} onChangeText={setName} />
                </View>
                
                <View style={styles.inputSpacing}>
                    <Input label="Ras / Jenis" placeholder="Contoh: Domestik, Persia..." value={breed} onChangeText={setBreed} />
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 12 }}>
                        <Input label="Umur" placeholder="1 Thn" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input label="Gender" placeholder="Jantan..." />
                    </View>
                </View>

                {/* Medical History Chips */}
                <View style={styles.inputSpacing}>
                    <Text style={styles.label}>Kondisi Kesehatan</Text>
                    <View style={styles.chipContainer}>
                        {[
                            { key: 'vaccinated', label: 'Sudah Vaksin', icon: 'shield-checkmark' },
                            { key: 'sterilized', label: 'Sudah Steril', icon: 'cut' },
                            { key: 'dewormed', label: 'Obat Cacing', icon: 'medkit' },
                            { key: 'fleaFree', label: 'Bebas Kutu', icon: 'sparkles' },
                        ].map((item) => (
                            <TouchableOpacity 
                                key={item.key}
                                style={[styles.chip, medHistory[item.key] && styles.chipActive]} 
                                onPress={() => toggleMed(item.key)}
                            >
                                <Ionicons name={item.icon} size={16} color={medHistory[item.key] ? 'white' : '#666'} />
                                <Text style={[styles.chipText, medHistory[item.key] && styles.chipTextActive]}>{item.label}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                <View style={styles.inputSpacing}>
                    <Input 
                        label="Cerita Singkat" 
                        placeholder="Tulis sifat, kebiasaan unik..." 
                        multiline numberOfLines={4}
                        value={description} 
                        onChangeText={setDescription}
                        style={{ height: 100, textAlignVertical: 'top' }}
                    />
                </View>

                {/* KYC Section */}
                <View style={styles.kycSection}>
                    <Text style={styles.sectionTitle}>Verifikasi Pemilik (KYC)</Text>
                    <Text style={styles.kycDesc}>Wajib upload KTP untuk keamanan.</Text>
                    <TouchableOpacity 
                        style={styles.uploadKTP} 
                        onPress={() => setKycImage(kycImage ? null : "simulated_ktp")}
                    >
                        {kycImage ? (
                            <View style={{ alignItems: 'center' }}>
                                <Ionicons name="checkmark-circle" size={40} color={Colors.primary} />
                                <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>KTP Terupload</Text>
                            </View>
                        ) : (
                            <View style={{ alignItems: 'center' }}>
                                <Ionicons name="id-card-outline" size={32} color="#888" />
                                <Text style={{ color: '#666' }}>Upload Foto KTP</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

             </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
          <Button 
            title="Terbitkan Postingan" 
            onPress={() => {
                Alert.alert("Sukses", "Postingan Anda sedang ditinjau!");
                router.back();
            }} 
            disabled={!isFormValid}
            style={!isFormValid ? { backgroundColor: '#CCC' } : {}}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hintBox: { padding: 12, backgroundColor: '#E8F5E9', margin: 20, marginBottom: 10, borderRadius: 8 },
  hintText: { color: Colors.secondary, fontSize: 12, textAlign: 'center' },
  
  uploadSection: { paddingHorizontal: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 10 },
  photoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  photoBox: { 
      width: '30%', height: 100, borderRadius: 12, backgroundColor: '#FFF', 
      justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed' 
  },
  photoBoxFilled: { backgroundColor: '#E3F2FD', borderStyle: 'solid', borderColor: Colors.primary },
  mainPhotoText: { position: 'absolute', bottom: 5, fontSize: 10, color: '#999' },

  formContainer: { backgroundColor: Colors.white, padding: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30, ...Colors.shadow, paddingBottom: 40 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 15 },
  inputSpacing: { marginBottom: 15 },
  row: { flexDirection: 'row', marginBottom: 8 },
  
  label: { fontSize: 14, color: '#333', fontWeight: '600', marginBottom: 8 },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingVertical: 8, paddingHorizontal: 12, borderRadius: 20, backgroundColor: '#F5F5F5', borderWidth: 1, borderColor: '#E0E0E0' },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 12, color: '#666' },
  chipTextActive: { color: 'white', fontWeight: 'bold' },

  kycSection: { marginTop: 20, padding: 15, backgroundColor: '#F9FAFB', borderRadius: 16, borderWidth: 1, borderColor: '#EEE' },
  kycDesc: { fontSize: 12, color: '#666', marginBottom: 10 },
  uploadKTP: { height: 100, backgroundColor: 'white', borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  
  footer: { padding: 20, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: '#F0F0F0' },
});
