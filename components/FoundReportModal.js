import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function FoundReportModal({ visible, onClose, catName }) {
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    // Simulasi kirim data
    if (!location || !message) {
      Alert.alert('Mohon Lengkapi', 'Tolong isi lokasi dan pesan untuk pemilik.');
      return;
    }

    Alert.alert(
      'Laporan Terkirim! 🎉',
      `Terima kasih! Pemilik ${catName} akan segera menerima notifikasi dan foto bukti yang kamu kirim.`,
      [{ text: 'OK', onPress: () => {
          setLocation('');
          setMessage('');
          onClose(); 
      }}]
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.centeredView}
      >
        <View style={styles.modalView}>
          <View style={styles.header}>
            <Text style={styles.modalTitle}>Lapor Penemuan</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#999" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.subtitle}>Kamu melihat <Text style={{fontWeight:'bold'}}>{catName}</Text>? Bantu pemiliknya dengan mengirim bukti.</Text>

          {/* Form Upload Foto Palsu */}
          <TouchableOpacity style={styles.uploadBtn}>
            <Ionicons name="camera" size={30} color={Colors.primary} />
            <Text style={styles.uploadText}>Ambil Foto / Upload Bukti</Text>
          </TouchableOpacity>

          <Text style={styles.label}>Lokasi Ditemukan</Text>
          <TextInput
            style={styles.input}
            placeholder="Contoh: Depan Indomaret Dago..."
            value={location}
            onChangeText={setLocation}
          />

          <Text style={styles.label}>Pesan Tambahan</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ceritakan kondisi kucing..."
            multiline={true}
            numberOfLines={3}
            value={message}
            onChangeText={setMessage}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Kirim Laporan</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  uploadBtn: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderStyle: 'dashed',
    borderRadius: 15,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#F6F9F2',
  },
  uploadText: {
    color: Colors.primary,
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 15,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20, // Jaga jarak aman bawah
  },
  submitText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});