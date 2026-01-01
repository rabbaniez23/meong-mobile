import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function AddHilangScreen() {
  const router = useRouter();
  
  return (
    <ScreenWrapper backgroundColor="#FFF5F5"> 
      <Header title="Lapor Kehilangan" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
         
         <View style={styles.alertBanner}>
            <Ionicons name="warning" size={20} color={Colors.white} />
            <Text style={styles.alertTitle}>MOHON ISI DATA DENGAN LENGKAP</Text>
         </View>

         <View style={styles.uploadArea}>
            <View style={[styles.uploadPlaceholder, { borderColor: '#FFCDD2', backgroundColor: '#FFEBEE' }]}>
                <Ionicons name="camera" size={40} color={Colors.error} />
                <Text style={[styles.uploadText, { color: Colors.error }]}>Foto Kucing</Text>
            </View>
         </View>

         <View style={styles.formContainer}>
            <View style={styles.inputSpacing}>
                <Input 
                    label="Nama Kucing" 
                    placeholder="Nama panggilan..." 
                />
            </View>
            
            <View style={styles.inputSpacing}>
                <Input 
                    label="Lokasi Terakhir" 
                    placeholder="Jl. Apa, Kecamatan apa..." 
                    icon="location-outline"
                />
            </View>

            <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <Input 
                        label="Tanggal" 
                        placeholder="DD/MM/YY" 
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Input 
                        label="Jam" 
                        placeholder="00:00" 
                    />
                </View>
            </View>

            <View style={styles.inputSpacing}>
                <Input 
                    label="Ciri-Ciri Khusus" 
                    placeholder="Jelaskan detail fisik seperti warna kalung, luka, atau pola bulu..." 
                    multiline
                    numberOfLines={4}
                    style={{ height: 100, textAlignVertical: 'top', paddingTop: 10 }}
                />
            </View>
            
            <View style={styles.inputSpacing}>
               <Input 
                    label="Kontak Yang Bisa Dihubungi" 
                    placeholder="08xxxxxxxx" 
                    keyboardType="phone-pad"
                    icon="call-outline"
                />
            </View>

            <Input 
                label="Imbalan (Opsional)" 
                placeholder="Ex: Rp 1.000.000" 
                keyboardType="numeric"
                icon="cash-outline"
            />
         </View>
      </ScrollView>

      <View style={styles.footer}>
          <Button 
            title="SEBARKAN LAPORAN" 
            onPress={() => router.back()} 
            style={{ backgroundColor: Colors.error }} // Red button
          />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  alertBanner: {
      backgroundColor: Colors.error,
      padding: 12,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
      margin: 20,
      borderRadius: 8,
  },
  alertTitle: {
      color: Colors.white,
      fontWeight: 'bold',
      fontSize: 12,
      letterSpacing: 1,
  },
  uploadArea: {
      alignItems: 'center',
      marginBottom: 20,
  },
  uploadPlaceholder: {
      width: 140,
      height: 140,
      borderRadius: 70, // Circle
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
      marginBottom: 8,
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
  }
});
