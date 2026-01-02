import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

// Placeholder for MapView
// import MapView, { Marker } from 'react-native-maps';

export default function AddHilangScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [reportType, setReportType] = useState(params.type === 'found' ? 'found' : 'lost'); // 'lost' or 'found'
  
  // Form State
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [color, setColor] = useState('');
  const [description, setDescription] = useState('');
  
  // Dummy "Map" State
  const [pinSet, setPinSet] = useState(false);

  // Auto Matching Logic (Simulation)
  const checkForMatch = () => {
       // Logic to check LOST_DATA vs Found Input would go here
       // For UI demo, we show an alert if "Found" is selected
       if (reportType === 'found') {
           Alert.alert("Potensi Kecocokan!", "Kami menemukan 2 laporan kucing hilang yang mirip dengan ciri-ciri ini di radius 1KM.");
       } else {
           Alert.alert("Laporan Disebarkan", "Notifikasi telah dikirim ke pengguna di radius 2KM dari titik lokasi.");
           router.back();
       }
  };

  return (
    <ScreenWrapper backgroundColor="#FFF5F5"> 
      <Header title="Lapor Kehilangan / Penemuan" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
         
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
             {/* MapView Placeholder */}
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
                style={styles.pinButton}
                onPress={() => { setPinSet(true); Alert.alert("Lokasi Diset", "Pin lokasi telah ditandai."); }}
             >
                 <Ionicons name="location-sharp" size={20} color="white" />
                 <Text style={{color:'white', fontWeight:'bold'}}>Pasang Pin Lokasi</Text>
             </TouchableOpacity>
         </View>

         <View style={styles.uploadArea}>
            <View style={[styles.uploadPlaceholder, { borderColor: '#FFCDD2', backgroundColor: '#FFEBEE' }]}>
                <Ionicons name="camera" size={40} color={reportType === 'lost' ? Colors.error : Colors.primary} />
                <Text style={[styles.uploadText, { color: reportType === 'lost' ? Colors.error : Colors.primary }]}>
                    {reportType === 'lost' ? "Foto Kucing" : "Foto Temuan"}
                </Text>
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
                    icon="call-outline"
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

      <View style={styles.footer}>
          <Button 
            title={reportType === 'lost' ? "SEBARKAN LAPORAN" : "COCOKKAN TEMUAN"}
            onPress={checkForMatch} 
            style={{ backgroundColor: reportType === 'lost' ? Colors.error : Colors.primary }} 
          />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  typeSwitcher: {
      flexDirection: 'row',
      margin: 20,
      marginBottom: 0,
      backgroundColor: '#FFF',
      borderRadius: 12,
      padding: 5,
      ...Colors.shadow,
  },
  typeBtn: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 10,
  },
  activeLostBtn: {
      backgroundColor: Colors.error,
  },
  activeFoundBtn: {
      backgroundColor: Colors.primary,
  },
  typeText: {
      fontWeight: 'bold',
      color: '#999',
      fontSize: 12,
  },
  activeText: {
      color: 'white',
  },
  alertBanner: {
      backgroundColor: '#333',
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      marginHorizontal: 20,
      marginTop: 15,
      borderRadius: 8,
  },
  alertTitle: {
      color: Colors.white,
      fontWeight: '600',
      fontSize: 11,
      flex: 1,
  },
  mapContainer: {
      height: 200,
      margin: 20,
      borderRadius: 16,
      overflow: 'hidden',
      backgroundColor: '#E0E0E0',
      position: 'relative',
  },
  mapLookalike: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F0F0',
  },
  dummyPin: {
      position: 'absolute',
      top: 80,
      left: '50%',
      marginLeft: -16,
  },
  pinButton: {
      position: 'absolute',
      bottom: 15,
      alignSelf: 'center',
      backgroundColor: '#333',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 20,
      flexDirection: 'row',
      gap: 8,
      alignItems: 'center',
  },
  uploadArea: {
      alignItems: 'center',
      marginBottom: 20,
  },
  uploadPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60, 
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderStyle: 'dashed',
  },
  uploadText: {
      marginTop: 6,
      fontWeight: 'bold',
      fontSize: 12,
  },
  formContainer: {
      backgroundColor: Colors.white,
      padding: 24,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      ...Colors.shadow,
  },
  inputSpacing: {
      marginBottom: 15,
  },
  row: {
      flexDirection: 'row',
      marginBottom: 15,
  },
  footer: {
      padding: 20,
      backgroundColor: Colors.white,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  }
});
