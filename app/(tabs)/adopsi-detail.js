import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity, Alert, Modal, TextInput, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback, Switch } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const { width, height } = Dimensions.get('window');

export default function AdopsiDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  
  // Questionnaire State
  const [hasExperience, setHasExperience] = useState(false);
  const [hasFence, setHasFence] = useState(false);
  const [isWillingToVaccinate, setIsWillingToVaccinate] = useState(false);
  const [reason, setReason] = useState('');
  
  let cat = { name: "Unknown" };
  if (params.catData) {
    cat = JSON.parse(params.catData);
  }

  const handleChat = () => {
       const roomId = `room-adopt-${cat.id}-${Date.now()}`;
       router.push({
           pathname: '/chat-room',
           params: { 
               roomId: roomId,
               context: `Adopsi: ${cat.name}`
           }
       });
  };

  const handleSubmitAdoption = () => {
      // Basic Validation
      if (!reason.trim()) {
          Alert.alert("Mohon isi alasan", "Tuliskan alasan singkat mengapa Anda ingin mengadopsi.");
          return;
      }
      
      setModalVisible(false);
      
      // Simulate sending to profile (Backend logic would go here)
      setTimeout(() => {
          Alert.alert(
            "Berhasil Diajukan!", 
            `Pengajuan Anda untuk ${cat.name} telah dikirim ke pemilik.\n\nData Screening:\n- Pengalaman: ${hasExperience ? 'Ya' : 'Tidak'}\n- Rumah Pagar: ${hasFence ? 'Ya' : 'Tidak'}`,
            [{ text: "Lanjut Chat", onPress: handleChat }]
          );
      }, 500);
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Full Image Header */}
        <View style={styles.imageContainer}>
            <Image source={cat.image} style={styles.image} />
            <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
                <Ionicons name="arrow-back" size={24} color={Colors.white} />
            </TouchableOpacity>
        </View>

        {/* Content Details */}
        <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
                <View>
                    <Text style={styles.name}>{cat.name}</Text>
                    <View style={styles.locationRow}>
                         <Ionicons name="location" size={16} color={Colors.primary} />
                         <Text style={styles.location}>{cat.location}</Text>
                    </View>
                </View>
                <View style={[styles.genderIcon, { backgroundColor: cat.gender === 'Jantan' ? '#E3F2FD' : '#FFF3E0' }]}>
                    <Ionicons 
                        name={cat.gender === 'Jantan' ? 'male' : 'female'} 
                        size={24} 
                        color={cat.gender === 'Jantan' ? '#1976D2' : '#F57C00'} 
                    />
                </View>
            </View>

            {/* Attributes Grid */}
            <View style={styles.attributesGrid}>
                <AttributeItem label="Umur" value={cat.age} />
                <AttributeItem label="Gender" value={cat.gender} />
                <AttributeItem label="Berat" value="3.5 kg" /> 
                <AttributeItem label="Vaksin" value="Lengkap" />
            </View>
            
            {/* Persyaratan Adopsi Badges */}
            <View style={styles.requirementsBox}>
                <Text style={styles.reqTitle}>Persyaratan Adopsi:</Text>
                <View style={styles.badgeRow}>
                    <Badge text="Wajib Steril" variant="default" />
                    <Badge text="Indoor Only" variant="default" />
                    <Badge text="Komitmen Seumur Hidup" variant="success" />
                </View>
            </View>

            {/* Owner Section */}
            <View style={styles.ownerSection}>
                <View style={styles.ownerInfo}>
                    <Image source={require('../../assets/icon.png')} style={styles.ownerAvatar} />
                    <View>
                        <Text style={styles.ownerLabel}>Pemilik Saat Ini</Text>
                        <Text style={styles.ownerName}>Meong Shelter Bandung</Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.chatBtn} onPress={handleChat}>
                    <Ionicons name="chatbubble-ellipses-outline" size={20} color={Colors.secondary} />
                </TouchableOpacity>
            </View>

            {/* Description */}
            <Text style={styles.sectionTitle}>Tentang {cat.name}</Text>
            <Text style={styles.description}>
                {cat.description || "Kucing ini sangat lucu dan butuh rumah baru. Dia suka bermain bola dan tidur di pangkuan. Sangat ramah dengan anak-anak dan kucing lain."}
            </Text>
        </View>
      </ScrollView>

      {/* Floating Bottom Bar */}
      <View style={styles.bottomBar}>
        <Button title="Ajukan Adopsi" style={{ width: '100%' }} onPress={() => setModalVisible(true)} />
      </View>

      {/* ADOPTION FORM MODAL */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView 
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.modalOverlay}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Form Pengajuan</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Ionicons name="close" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={styles.subTitle}>Adoption Questionnaire</Text>
                        <Text style={styles.descText}>Jawab pertanyaan ini agar pemilik yakin kamu adopter yang tepat.</Text>

                        {/* Question 1 */}
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>Punya pengalaman merawat kucing?</Text>
                            <Switch 
                                value={hasExperience} 
                                onValueChange={setHasExperience}
                                trackColor={{ false: "#767577", true: Colors.primary + '80' }}
                                thumbColor={hasExperience ? Colors.primary : "#f4f3f4"}
                            />
                        </View>

                        {/* Question 2 */}
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>Apakah rumah memiliki pagar aman?</Text>
                            <Switch 
                                value={hasFence} 
                                onValueChange={setHasFence}
                                trackColor={{ false: "#767577", true: Colors.primary + '80' }}
                                thumbColor={hasFence ? Colors.primary : "#f4f3f4"}
                            />
                        </View>
                        
                        {/* Question 3 */}
                        <View style={styles.questionRow}>
                            <Text style={styles.questionText}>Bersedia melengkapi vaksin/steril?</Text>
                            <Switch 
                                value={isWillingToVaccinate} 
                                onValueChange={setIsWillingToVaccinate}
                                trackColor={{ false: "#767577", true: Colors.primary + '80' }}
                                thumbColor={isWillingToVaccinate ? Colors.primary : "#f4f3f4"}
                            />
                        </View>

                        <Text style={[styles.label, { marginTop: 15 }]}>Alasan Adopsi & Lingkungan Rumah:</Text>
                        <TextInput 
                            style={styles.textArea}
                            placeholder="Ceritakan tentang dirimu dan lingkungan rumahmu..."
                            multiline
                            numberOfLines={4}
                            value={reason}
                            onChangeText={setReason}
                        />

                        <Button title="Kirim Pengajuan" onPress={handleSubmitAdoption} style={{ marginBottom: 20 }} />
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>

    </View>
  );
}

function AttributeItem({ label, value }) {
    return (
        <View style={styles.attributeBox}>
            <Text style={styles.attrValue}>{value}</Text>
            <Text style={styles.attrLabel}>{label}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  imageContainer: {
      height: height * 0.45,
      width: '100%',
      position: 'relative',
  },
  image: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
  },
  backBtn: {
      position: 'absolute',
      top: 50,
      left: 20,
      backgroundColor: 'rgba(0,0,0,0.3)',
      width: 40,
      height: 40,
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 10,
  },
  contentContainer: {
      marginTop: -30,
      backgroundColor: Colors.white,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      padding: 24,
      minHeight: 500,
  },
  headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 24,
  },
  name: {
      fontSize: 28,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 4,
  },
  locationRow: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
  },
  location: {
      fontSize: 14,
      color: '#888',
  },
  genderIcon: {
      width: 50,
      height: 50,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
  },
  attributesGrid: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 24,
  },
  attributeBox: {
      backgroundColor: Colors.background,
      paddingVertical: 12,
      paddingHorizontal: 15,
      borderRadius: 16,
      alignItems: 'center',
      width: '23%',
  },
  attrValue: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.secondary,
      marginBottom: 4,
      textAlign: 'center',
  },
  attrLabel: {
      fontSize: 12,
      color: '#888',
  },
  requirementsBox: {
      marginBottom: 24,
      backgroundColor: '#F9FAFB',
      padding: 15,
      borderRadius: 12,
  },
  reqTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#555',
  },
  badgeRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8,
  },
  ownerSection: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 16,
      borderWidth: 1,
      borderColor: '#F0F0F0',
      borderRadius: 16,
      marginBottom: 24,
  },
  ownerInfo: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 12,
  },
  ownerAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#EEE',
  },
  ownerLabel: {
      fontSize: 12,
      color: '#888',
  },
  ownerName: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.text,
  },
  chatBtn: {
      width: 40,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#E8F5E9',
      justifyContent: 'center',
      alignItems: 'center',
  },
  sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 12,
  },
  description: {
      fontSize: 14,
      color: '#666',
      lineHeight: 24,
  },
  bottomBar: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      padding: 20,
      backgroundColor: Colors.white,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
  },
  // MODAL STYLES
  modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'flex-end',
  },
  modalContent: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: 24,
      borderTopRightRadius: 24,
      padding: 24,
      paddingBottom: 40,
      maxHeight: '80%', // Limit height
  },
  modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
  },
  modalTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.text,
  },
  subTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.primary,
      marginBottom: 5,
  },
  descText: {
      fontSize: 12,
      color: '#666',
      marginBottom: 20,
  },
  questionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 15,
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  questionText: {
      fontSize: 14,
      color: '#333',
      flex: 1,
      paddingRight: 10,
  },
  label: {
      fontSize: 14,
      color: '#666',
      marginBottom: 10,
      fontWeight: '600',
  },
  textArea: {
      backgroundColor: '#F9F9F9',
      borderRadius: 12,
      padding: 15,
      minHeight: 100,
      textAlignVertical: 'top',
      fontSize: 14,
      marginBottom: 20,
      borderWidth: 1,
      borderColor: '#EEE',
  }
});