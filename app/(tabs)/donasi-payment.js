import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ui/ScreenWrapper';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

export default function DonasiPaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // State Form
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState(null);

  const amounts = [10000, 25000, 50000, 100000, 200000, 500000];
  
  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', icon: 'wallet', color: '#00AED6' },
    { id: 'dana', name: 'DANA', icon: 'wallet', color: '#118EEA' },
    { id: 'shopee', name: 'ShopeePay', icon: 'cart', color: '#EE4D2D' },
    { id: 'bca', name: 'Transfer BCA', icon: 'card', color: '#005CA9' },
    { id: 'mandiri', name: 'Transfer Mandiri', icon: 'card', color: '#FFB700' },
  ];

  const handlePay = () => {
    const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount;

    if (!finalAmount || finalAmount < 1000) {
      Alert.alert("Nominal Salah", "Minimal donasi adalah Rp 1.000");
      return;
    }
    if (!paymentMethod) {
      Alert.alert("Metode Pembayaran", "Silakan pilih metode pembayaran.");
      return;
    }
    if (!isAnonymous && !donorName) {
      Alert.alert("Data Diri", "Silakan isi nama atau aktifkan 'Sembunyikan Nama'.");
      return;
    }

    Alert.alert(
      "Pembayaran Berhasil!",
      `Terima kasih ${isAnonymous ? 'Orang Baik' : donorName}, donasi sebesar Rp ${finalAmount.toLocaleString()} menggunakan ${paymentMethods.find(p => p.id === paymentMethod).name} telah diterima.`,
      [{ text: "OK", onPress: () => router.dismissAll() }]
    );
  };

  return (
    <ScreenWrapper backgroundColor="#F8F9FA">
      <Header title="Isi Detail Donasi" showBackBtn />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        
        {/* Section 1: Nominal */}
        <Text style={styles.sectionTitle}>1. Masukkan Nominal Donasi</Text>
        <View style={styles.gridAmounts}>
            {amounts.map((amt) => (
                <TouchableOpacity 
                    key={amt}
                    style={[
                        styles.amtBox, 
                        selectedAmount === amt && !customAmount && styles.amtBoxActive
                    ]}
                    onPress={() => {
                        setSelectedAmount(amt);
                        setCustomAmount('');
                    }}
                >
                    <Text style={[
                        styles.amtText, 
                        selectedAmount === amt && !customAmount && styles.amtTextActive
                    ]}>
                        Rp {amt.toLocaleString()}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
        <Input 
            placeholder="Nominal lainnya (Min. Rp 1.000)"
            keyboardType="numeric"
            value={customAmount}
            onChangeText={setCustomAmount}
            style={{ marginBottom: 20 }}
            icon="cash-outline"
        />

        {/* Section 2: Data Diri */}
        <Text style={styles.sectionTitle}>2. Data Donatur</Text>
        <View style={styles.formCard}>
            <View style={styles.switchRow}>
                <Text style={styles.label}>Sembunyikan Nama Saya (Anonim)</Text>
                <Switch 
                    value={isAnonymous} 
                    onValueChange={setIsAnonymous}
                    trackColor={{ false: "#767577", true: Colors.primary }}
                    thumbColor={Colors.white}
                />
            </View>

            {!isAnonymous && (
                <Input 
                    label="Nama Lengkap" 
                    placeholder="Nama kamu" 
                    value={donorName} 
                    onChangeText={setDonorName} 
                    icon="person-outline"
                />
            )}

            <Input 
                label="Email / WhatsApp (Opsional)" 
                placeholder="Untuk kirim bukti donasi" 
                keyboardType="email-address" 
                value={donorEmail} 
                onChangeText={setDonorEmail} 
                icon="mail-outline"
            />
        </View>

        {/* Section 3: Metode Pembayaran */}
        <Text style={styles.sectionTitle}>3. Metode Pembayaran</Text>
        <View style={styles.paymentList}>
            {paymentMethods.map((method) => (
                <TouchableOpacity 
                    key={method.id} 
                    style={[
                        styles.paymentItem, 
                        paymentMethod === method.id && styles.paymentItemActive
                    ]}
                    onPress={() => setPaymentMethod(method.id)}
                >
                    <View style={[styles.iconBox, { backgroundColor: method.color }]}>
                        <Ionicons name={method.icon} size={18} color="white" />
                    </View>
                    <Text style={styles.paymentName}>{method.name}</Text>
                    <View style={styles.radioOuter}>
                        {paymentMethod === method.id && <View style={styles.radioInner} />}
                    </View>
                </TouchableOpacity>
            ))}
        </View>

      </ScrollView>

      {/* Footer Total & Button */}
      <View style={styles.footer}>
        <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Pembayaran</Text>
            <Text style={styles.totalValue}>
                Rp {(customAmount ? parseInt(customAmount) || 0 : selectedAmount || 0).toLocaleString()}
            </Text>
        </View>
        <Button 
            title="Lanjut Pembayaran" 
            onPress={handlePay} 
            variant="secondary"
        />
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: Colors.secondary, marginTop: 10, marginBottom: 12 },
  
  // Nominal
  gridAmounts: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: 12 },
  amtBox: { width: '31%', paddingVertical: 12, borderRadius: 12, borderWidth: 1, borderColor: '#DDD', alignItems: 'center', backgroundColor: Colors.white },
  amtBoxActive: { backgroundColor: '#E8F5E9', borderColor: Colors.primary },
  amtText: { fontSize: 12, fontWeight: '600', color: Colors.text },
  amtTextActive: { color: Colors.secondary, fontWeight: 'bold' },

  // Form Card
  formCard: { backgroundColor: Colors.white, padding: 20, borderRadius: 16, borderWidth: 1, borderColor: '#EEE', marginBottom: 20 },
  switchRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  label: { fontSize: 14, color: Colors.text, flex: 1 },

  // Payment List
  paymentList: { backgroundColor: Colors.white, borderRadius: 16, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE' },
  paymentItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#F5F5F5' },
  paymentItemActive: { backgroundColor: '#E8F5E9' },
  iconBox: { width: 32, height: 32, borderRadius: 8, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  paymentName: { flex: 1, fontSize: 14, fontWeight: '600', color: Colors.text },
  radioOuter: { width: 22, height: 22, borderRadius: 11, borderWidth: 2, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  radioInner: { width: 12, height: 12, borderRadius: 6, backgroundColor: Colors.primary },

  // Footer
  footer: { position: 'absolute', bottom: 0, width: '100%', backgroundColor: Colors.white, padding: 20, borderTopWidth: 1, borderTopColor: '#EEE', elevation: 20 },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  totalLabel: { fontSize: 14, color: '#666' },
  totalValue: { fontSize: 18, fontWeight: 'bold', color: Colors.secondary },
});