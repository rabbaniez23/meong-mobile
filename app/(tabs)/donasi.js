import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function DonasiScreen() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const amounts = [10000, 20000, 50000, 100000];

  const handleDonate = () => {
    if (!selectedAmount) {
      Alert.alert("Pilih Nominal", "Silakan pilih nominal donasi terlebih dahulu.");
      return;
    }
    Alert.alert("Terima Kasih!", `Anda akan mendonasikan Rp ${selectedAmount.toLocaleString()}. Fitur pembayaran akan segera hadir.`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Gambar */}
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?q=80&w=2000&auto=format&fit=crop' }} 
          style={styles.headerImage} 
        />
        
        <View style={styles.content}>
          <Text style={styles.title}>Bantu Kucing Jalanan 🐾</Text>
          <Text style={styles.subtitle}>
            Donasimu akan digunakan untuk sterilisasi, makanan, dan pengobatan kucing terlantar.
          </Text>

          {/* Progress Bar Dummy */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '60%' }]} />
            </View>
            <View style={styles.progressTextRow}>
              <Text style={styles.progressText}>Terkumpul: Rp 6.000.000</Text>
              <Text style={styles.progressText}>Target: Rp 10.000.000</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Pilih Nominal Donasi</Text>
          <View style={styles.gridAmounts}>
            {amounts.map((amount) => (
              <TouchableOpacity 
                key={amount}
                style={[styles.amountBox, selectedAmount === amount && styles.amountBoxActive]}
                onPress={() => setSelectedAmount(amount)}
              >
                <Text style={[styles.amountText, selectedAmount === amount && styles.amountTextActive]}>
                  Rp {amount.toLocaleString()}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Custom Input */}
          <View style={styles.customInputContainer}>
             <Text style={styles.currency}>Rp</Text>
             <TextInput 
                style={styles.customInput} 
                placeholder="Nominal Lainnya" 
                keyboardType="numeric"
             />
          </View>

          <TouchableOpacity style={styles.donateBtn} onPress={handleDonate}>
            <Text style={styles.donateBtnText}>Donasi Sekarang</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  headerImage: { width: '100%', height: 200, resizeMode: 'cover' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: Colors.secondary, marginBottom: 8 },
  subtitle: { fontSize: 14, color: Colors.text, lineHeight: 20, marginBottom: 20 },
  
  progressContainer: { marginBottom: 30 },
  progressBarBg: { height: 10, backgroundColor: '#E0E0E0', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  progressBarFill: { height: '100%', backgroundColor: Colors.primary, borderRadius: 5 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between' },
  progressText: { fontSize: 12, color: '#666' },

  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary, marginBottom: 15 },
  gridAmounts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 20 },
  amountBox: { 
    width: '48%', padding: 15, borderRadius: 12, borderWidth: 1, borderColor: '#DDD', alignItems: 'center' 
  },
  amountBoxActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  amountText: { fontWeight: 'bold', color: Colors.secondary },
  amountTextActive: { color: Colors.white },
  
  customInputContainer: { 
    flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', borderRadius: 12, paddingHorizontal: 15, marginBottom: 20 
  },
  currency: { fontWeight: 'bold', color: '#666', marginRight: 10 },
  customInput: { flex: 1, paddingVertical: 15, fontSize: 16 },

  donateBtn: { backgroundColor: Colors.secondary, padding: 16, borderRadius: 12, alignItems: 'center', ...Colors.shadow },
  donateBtnText: { color: Colors.white, fontWeight: 'bold', fontSize: 16 },
});