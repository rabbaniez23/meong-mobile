import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import CustomHeader from '../components/CustomHeader'; 
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function AddHilangScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [reportType, setReportType] = useState(params.type === 'found' ? 'found' : 'lost');
  
  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  
  // Map State
  const [pinSet, setPinSet] = useState(false);

  // Multi-Photo State (3 Slots)
  const [photos, setPhotos] = useState([null, null, null]);

  const handlePhotoUpload = (index) => {
      const newPhotos = [...photos];
      if (newPhotos[index]) {
          newPhotos[index] = null;
      } else {
          newPhotos[index] = "dummy_path"; 
      }
      setPhotos(newPhotos);
  };

  const checkForMatch = () => {
       if (reportType === 'found') {
           Alert.alert("Potensi Kecocokan!", "Kami menemukan 2 laporan kucing hilang yang mirip dengan ciri-ciri ini di radius 1KM.");
       } else {
           Alert.alert("Laporan Disebarkan", "Notifikasi telah dikirim ke pengguna di radius 2KM dari titik lokasi.");
           router.back();
       }
  };

  const isFormValid = (name || description) && location && pinSet && photos[0];

  return (
    <View style={styles.container}>
      <CustomHeader 
        title="Lapor Kehilangan / Penemuan" 
        showBackBtn 
      />
      
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
             
             {/* Report Type Switcher */}
             <View style={styles.typeSwitcher}>
                 <TouchableOpacity 
                    style={[styles.typeBtn, reportType === 'lost' && styles.activeLostBtn]}
                    onPress={() => setReportType('lost')}
                 >
                     <Text style={[styles.typeText, reportType === 'lost' && styles.activeText]}>KUCING HILANG</Text>
                 </TouchableOpacity>
                 <TouchableOpacity 
                    style={[styles.typeBtn, reportType === 'found' && styles.activeFoundBtn]}
                    onPress={() => setReportType('found')}
                 >
                     <Text style={[styles.typeText, reportType === 'found' && styles.activeText]}>SAYA MENEMUKAN</Text>
                 </TouchableOpacity>
             </View>

             <View style={styles.alertBanner}>
                <Ionicons name="information-circle" size={20} color={Colors.white} />
                <Text style={styles.alertTitle}>
                    {reportType === 'lost' 
                        ? "Berikan detail lokasi akurat agar tetangga bisa membantu." 
                        : "Sistem akan mencocokkan ciri-ciri dengan database kucing hilang."}
                </Text>
             </View>

             {/* Map Pin Point Area */}
             <View style={styles.mapContainer}>
                 <View style={styles.mapLookalike}>
                     <Ionicons name="map" size={48} color="#CCC" />
                     <Text style={{color:'#888', marginTop:10}}>Peta Google Maps (Simulasi)</Text>
                     {pinSet && (
                         <View style={styles.dummyPin}>
                             <Ionicons name="location" size={32} color={Colors.error} />
                         </View>
                     )}
                 </View>
                 <TouchableOpacity 
                    style={[styles.pinButton, pinSet && { backgroundColor: Colors.primary }]}
                    onPress={() => { setPinSet(true); Alert.alert("Lokasi Diset", "Pin lokasi telah ditandai."); }}
                 >
                     <Ionicons name="location-sharp" size={20} color="white" />
                     <Text style={{color:'white', fontWeight:'bold'}}>
                        {pinSet ? "Lokasi Terpasang" : "Pasang Pin Lokasi"}
                     </Text>
                 </TouchableOpacity>
             </View>

             {/* Multi-Photo Upload Area */}
             <View style={styles.uploadSection}>
                <Text style={styles.sectionLabel}>
                    {reportType === 'lost' ? "Foto Terakhir Kucing (Min. 1)" : "Foto Temuan (Min. 1)"}
                </Text>
                <View style={styles.photoRow}>
                    {photos.map((photo, index) => (
                        <TouchableOpacity 
                            key={index} 
                            style={[styles.photoBox, photo && styles.photoBoxFilled]} 
                            onPress={() => handlePhotoUpload(index)}
                        >
                            {photo ? (
                                <Ionicons name="image" size={32} color={reportType === 'lost' ? Colors.error : Colors.primary} />
                            ) : (
                                <Ionicons name="add" size={32} color="#CCC" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
             </View>

             <View style={styles.formContainer}>
                <View style={styles.inputSpacing}>
                    <Input 
                        label={reportType === 'lost' ? "Nama Kucing" : "Nama (Jika Ada Kalung)"}
                        placeholder="Nama panggilan..." 
                        value={name}
                        onChangeText={setName}
                    />
                </View>
                
                <View style={styles.inputSpacing}>
                    <Input 
                        label="Warna / Ciri Fisik Utama" 
                        placeholder="Contoh: Oren, Kaki pincang, Ekor pendek..." 
                        value={color}
                        onChangeText={setColor}
                        icon="color-palette-outline"
                    />
                </View>

                <View style={styles.inputSpacing}>
                    <Input 
                        label="Detail Lokasi / Patokan" 
                        placeholder="Contoh: Dekat Warung Madura Bu Ijah..." 
                        value={location}
                        onChangeText={setLocation}
                        icon="location-outline"
                    />
                </View>

                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <Input label="Tanggal" placeholder="DD/MM/YY" />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Input label="Jam" placeholder="00:00" />
                    </View>
                </View>
                
                <View style={styles.inputSpacing}>
                   <Input 
                        label="Kontak Yang Bisa Dihubungi" 
                        placeholder="08xxxxxxxx" 
                        keyboardType="phone-pad"
                        value={contact}
                        onChangeText={setContact}
                        icon="call-outline"
                    />
                </View>
                
                <View style={styles.inputSpacing}>
                   <Input 
                        label="Catatan Tambahan" 
                        placeholder="Kronologi..." 
                        multiline numberOfLines={3}
                        value={description}
                        onChangeText={setDescription}
                        style={{ height: 80, textAlignVertical: 'top' }}
                    />
                </View>

                {reportType === 'lost' && (
                    <Input 
                        label="Imbalan (Opsional)" 
                        placeholder="Ex: Rp 1.000.000" 
                        keyboardType="numeric"
                        icon="cash-outline"
                    />
                )}
             </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
          <Button 
            title={reportType === 'lost' ? "SEBARKAN LAPORAN" : "COCOKKAN TEMUAN"}
            onPress={checkForMatch} 
            disabled={!isFormValid}
            style={{ 
                backgroundColor: !isFormValid ? '#CCC' : (reportType === 'lost' ? Colors.error : Colors.primary) 
            }}
          />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F5' },
  typeSwitcher: { flexDirection: 'row', margin: 20, marginBottom: 0, backgroundColor: '#FFF', borderRadius: 12, padding: 5, ...Colors.shadow },
  typeBtn: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: 10 },
  activeLostBtn: { backgroundColor: Colors.error },
  activeFoundBtn: { backgroundColor: Colors.primary },
  typeText: { fontWeight: 'bold', color: '#999', fontSize: 12 },
  activeText: { color: 'white' },
  
  alertBanner: { backgroundColor: '#333', padding: 12, flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 15, borderRadius: 8 },
  alertTitle: { color: Colors.white, fontWeight: '600', fontSize: 11, flex: 1 },

  mapContainer: { height: 200, margin: 20, borderRadius: 16, overflow: 'hidden', backgroundColor: '#E0E0E0', position: 'relative' },
  mapLookalike: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F0F0F0' },
  dummyPin: { position: 'absolute', top: 80, left: '50%', marginLeft: -16 },
  pinButton: { position: 'absolute', bottom: 15, alignSelf: 'center', backgroundColor: '#333', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, flexDirection: 'row', gap: 8, alignItems: 'center' },

  uploadSection: { paddingHorizontal: 20, marginBottom: 20 },
  sectionLabel: { fontSize: 14, fontWeight: '600', color: '#333', marginBottom: 10 },
  photoRow: { flexDirection: 'row', justifyContent: 'space-between' },
  photoBox: { width: '30%', height: 100, borderRadius: 12, backgroundColor: '#FFF', justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed' },
  photoBoxFilled: { backgroundColor: '#FFEBEE', borderStyle: 'solid', borderColor: Colors.error },

  formContainer: { backgroundColor: Colors.white, padding: 24, borderTopLeftRadius: 30, borderTopRightRadius: 30, ...Colors.shadow },
  inputSpacing: { marginBottom: 15 },
  row: { flexDirection: 'row', marginBottom: 15 },
  footer: { padding: 20, backgroundColor: Colors.white, borderTopWidth: 1, borderTopColor: '#F0F0F0' }
});
