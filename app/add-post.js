import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function AddPostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if(!title || !content) {
        Alert.alert("Data Tidak Lengkap", "Judul dan isi topik harus diisi.");
        return;
    }
    
    Alert.alert("Berhasil", "Topik diskusi berhasil dibuat!", [
        { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <ScreenWrapper backgroundColor={Colors.background}>
      <Header title="Buat Topik Baru" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
         {/* Photo Upload Area (Optional for text posts but good to have) */}
         <View style={styles.uploadArea}>
            <View style={styles.uploadPlaceholder}>
                <Ionicons name="image-outline" size={40} color="#CCC" />
                <Text style={styles.uploadText}>Tambah Foto (Opsional)</Text>
            </View>
         </View>

         <View style={styles.formContainer}>
            <Input 
                label="Judul Topik" 
                placeholder="Contoh: Rekomendasi Makanan Kucing..." 
                value={title} 
                onChangeText={setTitle} 
            />
            
            <Input 
                label="Kategori" 
                placeholder="Contoh: Kesehatan, Makanan, Mainan..." 
                value={category} 
                onChangeText={setCategory} 
            />

            <Input 
                label="Isi Diskusi" 
                placeholder="Tulis apa yang ingin kamu diskusikan..." 
                multiline
                numberOfLines={6}
                value={content} 
                onChangeText={setContent}
                style={{ height: 150, textAlignVertical: 'top' }}
            />
         </View>
      </ScrollView>

      <View style={styles.footer}>
          <Button title="Posting Topik" onPress={handleSubmit} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  uploadArea: {
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 30,
  },
  uploadPlaceholder: {
      width: '100%',
      height: 120,
      backgroundColor: '#EFEFEF',
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#DDD',
      borderStyle: 'dashed',
  },
  uploadText: {
      marginTop: 8,
      color: '#888',
      fontSize: 12,
  },
  formContainer: {
      backgroundColor: Colors.white,
      padding: 24,
      borderRadius: 24,
      ...Colors.shadow,
  },
  footer: {
      padding: 20,
      backgroundColor: Colors.background,
  }
});
