import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
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
  
  // Clean Form Layout
  return (
    <ScreenWrapper backgroundColor={Colors.background}>
      <Header title="Buat Postingan Adopsi" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
         {/* Top Hint */}
         <View style={styles.hintBox}>
            <Text style={styles.hintText}>Pastikan fotonya jelas dan cerah agar lebih menarik!</Text>
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
                    <Input 
                        label="Umur" 
                        placeholder="1 Thn" 
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Input 
                        label="Gender" 
                        placeholder="Jantan/Betina" 
                    />
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
         </View>
      </ScrollView>

      <View style={styles.footer}>
          <Button title="Terbitkan" onPress={() => router.back()} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  hintBox: {
      padding: 12,
      backgroundColor: '#E8F5E9',
      marginBottom: 0,
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
      minHeight: 400,
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 20,
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
