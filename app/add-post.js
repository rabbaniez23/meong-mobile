import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import CustomHeader from '../components/CustomHeader'; // Updated
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function AddPostScreen() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('Kesehatan');

  const categories = ['Kesehatan', 'Event', 'Diskusi', 'Tips & Trik', 'Lainnya'];

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
      <CustomHeader title="Buat Topik Baru" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
         {/* Photo Upload Area */}
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
                style={{ marginBottom: 15 }}
            />
            
            {/* Category Picker (Chips) */}
            <Text style={styles.label}>Kategori</Text>
            <View style={styles.categoryContainer}>
                {categories.map((cat) => (
                    <TouchableOpacity 
                        key={cat} 
                        style={[styles.catChip, category === cat && styles.catChipActive]}
                        onPress={() => setCategory(cat)}
                    >
                        <Text style={[styles.catText, category === cat && styles.catTextActive]}>{cat}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Input 
                label="Isi Diskusi" 
                placeholder="Tulis apa yang ingin kamu diskusikan..." 
                multiline
                numberOfLines={6}
                value={content} 
                onChangeText={setContent}
                style={{ height: 150, textAlignVertical: 'top', marginTop: 15 }}
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
  uploadArea: { alignItems: 'center', marginTop: 20, marginBottom: 30, paddingHorizontal: 20 },
  uploadPlaceholder: { width: '100%', height: 120, backgroundColor: '#EFEFEF', borderRadius: 16, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed' },
  uploadText: { marginTop: 8, color: '#888', fontSize: 12 },
  
  formContainer: { backgroundColor: Colors.white, padding: 24, borderRadius: 24, marginHorizontal: 20, ...Colors.shadow },
  label: { fontSize: 14, color: '#333', fontWeight: '600', marginBottom: 8 },
  
  categoryContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 5 },
  catChip: { paddingVertical: 8, paddingHorizontal: 16, backgroundColor: '#F5F5F5', borderRadius: 20, borderWidth: 1, borderColor: '#EEE' },
  catChipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  catText: { fontSize: 12, color: '#555' },
  catTextActive: { color: 'white', fontWeight: 'bold' },

  footer: { padding: 20, backgroundColor: Colors.background }
});
