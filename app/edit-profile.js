import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';
import Header from '../components/ui/Header';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

export default function EditProfileScreen() {
  const router = useRouter();
  
  // State matching USER_DATA
  const [name, setName] = useState("Rizki Rabbani");
  const [job, setJob] = useState("Software Engineer");
  const [location, setLocation] = useState("Bandung, ID");
  const [bio, setBio] = useState("Setiap kucing berhak mendapatkan rumah yang hangat dan penuh kasih sayang.");

  return (
    <ScreenWrapper backgroundColor={Colors.background}>
      <Header title="Edit Profil" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 50 }}>
        
         {/* Avatar Edit */}
         <View style={styles.avatarSection}>
            <View style={styles.avatarContainer}>
                <Image source={require('../assets/kucing.png')} style={styles.avatar} />
                <TouchableOpacity style={styles.cameraBtn}>
                    <Ionicons name="camera" size={20} color={Colors.white} />
                </TouchableOpacity>
            </View>
            <Text style={styles.changePhotoText}>Ubah Foto Profil</Text>
         </View>

         {/* Form */}
         <View style={styles.formContainer}>
            <View style={styles.inputGap}>
                <Input 
                    label="Nama Lengkap" 
                    value={name} 
                    onChangeText={setName} 
                />
            </View>

            <View style={styles.inputGap}>
                <Input 
                    label="Pekerjaan" 
                    value={job} 
                    onChangeText={setJob} 
                    placeholder="Contoh: Mahasiswa, Dokter..."
                />
            </View>

            <View style={styles.inputGap}>
                <Input 
                    label="Lokasi" 
                    value={location} 
                    onChangeText={setLocation} 
                    icon="location-outline"
                />
            </View>

            <View style={styles.inputGap}>
                <Input 
                    label="Bio / Motivasi" 
                    value={bio} 
                    onChangeText={setBio} 
                    multiline
                    numberOfLines={4}
                    style={{ height: 100, textAlignVertical: 'top', paddingTop: 10 }}
                />
            </View>
         </View>

      </ScrollView>

      <View style={styles.footer}>
          <Button title="Simpan Perubahan" onPress={() => router.back()} />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
      alignItems: 'center',
      marginVertical: 20,
  },
  avatarContainer: {
      position: 'relative',
      marginBottom: 10,
  },
  avatar: {
      width: 100,
      height: 100,
      borderRadius: 50,
      borderWidth: 3,
      borderColor: Colors.white,
      ...Colors.shadow,
  },
  cameraBtn: {
      position: 'absolute',
      bottom: 0,
      right: 0,
      backgroundColor: Colors.primary,
      padding: 8,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: Colors.white,
  },
  changePhotoText: {
      color: Colors.primary,
      fontWeight: '600',
  },
  formContainer: {
      backgroundColor: Colors.white,
      padding: 24,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      ...Colors.shadow,
      minHeight: 500,
  },
  inputGap: {
      marginBottom: 16,
  },
  footer: {
      padding: 20,
      backgroundColor: Colors.white,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  }
});