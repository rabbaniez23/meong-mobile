import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import IdentityGrid from '../../components/Profile/IdentityGrid';
import StatsOverview from '../../components/Profile/StatsOverview';
import ActivityTabs from '../../components/Profile/ActivityTabs';
import HistoryList from '../../components/Profile/HistoryList';
import LostCatCard from '../../components/LostCatCard';

// MOCK USER DATA (Comprehensive)
const USER_DATA = {
  name: "Rizki Rabbani",
  email: "rizki.r@upi.edu",
  role: "Cat Guardian",
  avatar: require('../../assets/kucing.png'), 
  job: "Software Engineer",
  age: 24,
  location: "Bandung, ID",
  joinDate: "Jan 2024",
  motivation: "Setiap kucing berhak mendapatkan rumah yang hangat dan penuh kasih sayang.",
  stats: {
    adoptions: 2,
    reports: 3,
    donated: "500kb" // 500rb abbreviated
  }
};

// HISTORY DATA MOCK
const ADOPTION_HISTORY = [
    { id: '1', catName: 'Miko', date: '10 Jan 2025', catBreed: 'Domestik', status: 'Approved', image: require('../../assets/Miko.jpeg') },
    { id: '2', catName: 'Oyen', date: '05 Des 2024', catBreed: 'Orange', status: 'Rejected', image: require('../../assets/Oyen.jpeg') },
];

const REPORTS_HISTORY = [
    { id: '1', name: 'Mochi', lastSeen: 'Kemarin Sore', location: 'Jl. Dago', image: require('../../assets/Putih.jpeg'), status: 'Dicari' },
    { id: '2', name: 'Tom', lastSeen: '1 Minggu lalu', location: 'Gasibu', image: require('../../assets/Abu.jpeg'), status: 'Ditemukan' },
];

const DONATION_HISTORY = [
    { id: '1', amount: '50.000', date: '20 Des 2024', campaign: 'Bantu Kucing Jalanan', status: 'Berhasil' },
    { id: '2', amount: '100.000', date: '15 Nov 2024', campaign: 'Pengobatan Muezza', status: 'Berhasil' },
    { id: '3', amount: '25.000', date: '01 Nov 2024', campaign: 'Makanan Shelter', status: 'Pending' },
];

const INCOMING_REQUESTS = [
    { 
        id: '1', 
        requester: 'Budi Santoso', 
        catName: 'Hattoo', 
        date: 'Baru saja', 
        message: 'Saya berminat adopsi Hatto, sudah punya pengalaman 5 tahun memelihara kucing.', 
        avatar: null,
        details: {
            job: 'Wiraswasta',
            age: 29,
            location: 'Cimahi',
            history: 'Pernah adopsi 2 kucing domestik.',
            houseType: 'Rumah Pribadi (Ada Halaman)'
        }
    },
    { 
        id: '2', 
        requester: 'Siti Aisyah', 
        catName: 'Hattoo', 
        date: '1 Jam lalu', 
        message: 'Halo, apakah Hattoo masih available?', 
        avatar: null,
        details: {
            job: 'Mahasiswa',
            age: 21,
            location: 'Dago',
            history: 'Baru pertama kali ingin adopsi.',
            houseType: 'Kost (Pet Friendly)'
        }
    },
];

export default function ProfilScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Riwayat Adopsi');

  const handleEdit = () => {
      router.push('/edit-profile'); 
  };

  const showRequestDetails = (req) => {
      Alert.alert(
          `Profil: ${req.requester}`,
          `Pekerjaan: ${req.details.job}\nUsia: ${req.details.age} Tahun\nLokasi: ${req.details.location}\n\nRiwayat: ${req.details.history}\nTempat Tinggal: ${req.details.houseType}\n\nPesan:\n"${req.message}"`,
          [
              { text: 'Tutup', style: 'cancel' },
              { text: 'Lihat Chat', onPress: () => console.log('Go to chat') } // Placeholder
          ]
      );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* 1. Header Card */}
        <ProfileHeader user={USER_DATA} onEdit={handleEdit} />

        {/* 2. Identity Grid */}
        <IdentityGrid user={USER_DATA} />

        {/* 3. Stats Overview */}
        <StatsOverview stats={USER_DATA.stats} />

        {/* 4. Activity Tabs */}
        <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* 5. Content Area */}
        <View style={styles.contentArea}>
            {activeTab === 'Riwayat Adopsi' && (
                <HistoryList data={ADOPTION_HISTORY} type="adoption" />
            )}

            {activeTab === 'Permintaan' && (
                 <View>
                    {INCOMING_REQUESTS.map((req) => (
                        <TouchableOpacity key={req.id} style={styles.requestCard} onPress={() => showRequestDetails(req)} activeOpacity={0.7}>
                            <View style={styles.requestHeader}>
                                <Image source={require('../../assets/icon.png')} style={styles.reqAvatar} />
                                <View style={{ flex: 1 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={styles.reqName}>{req.requester}</Text>
                                        <Ionicons name="information-circle-outline" size={16} color={Colors.primary} style={{ marginLeft: 4 }} />
                                    </View>
                                    <Text style={styles.reqInfo}>Ingin adopsi <Text style={{ fontWeight: 'bold' }}>{req.catName}</Text></Text>
                                </View>
                                <Text style={styles.reqTime}>{req.date}</Text>
                            </View>
                            <Text style={styles.reqMsg} numberOfLines={2}>"{req.message}"</Text>
                            
                            {/* Tags for Quick Info */}
                            <View style={styles.tagRow}>
                                <View style={styles.tag}><Text style={styles.tagText}>{req.details.job}</Text></View>
                                <View style={styles.tag}><Text style={styles.tagText}>{req.details.location}</Text></View>
                            </View>

                            <View style={styles.reqActions}>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#FFEBEE', marginRight: 10 }]}>
                                    <Text style={{ color: Colors.error, fontWeight: 'bold', fontSize: 12 }}>Tolak</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.actionBtn, { backgroundColor: '#E8F5E9' }]}>
                                    <Text style={{ color: Colors.secondary, fontWeight: 'bold', fontSize: 12 }}>Terima Diskusi</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    ))}
                 </View>
            )}

            {activeTab === 'Laporan Saya' && (
                <View>
                    {REPORTS_HISTORY.map((report) => (
                        <View key={report.id} style={{ marginBottom: 10 }}>
                            <LostCatCard 
                                name={report.name}
                                lastSeen={report.lastSeen}
                                location={report.location}
                                image={report.image}
                                onPress={() => {}}
                            />
                        </View>
                    ))}
                </View>
            )}

            {activeTab === 'Donasi' && (
                <HistoryList data={DONATION_HISTORY} type="donation" />
            )}
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
            <Text style={styles.logoutText}>Keluar Akun</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 30,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 50,
  },
  contentArea: {
    minHeight: 200,
  },
  requestCard: {
      backgroundColor: Colors.white,
      padding: 16,
      borderRadius: 16,
      marginBottom: 12,
      ...Colors.shadow,
      borderWidth: 1,
      borderColor: '#F0F0F0',
  },
  requestHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 8,
  },
  reqAvatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
      backgroundColor: '#EEE',
  },
  reqName: {
      fontWeight: 'bold',
      color: Colors.text,
      fontSize: 14,
  },
  reqInfo: {
      fontSize: 12,
      color: '#666',
  },
  reqTime: {
      fontSize: 10,
      color: '#999',
  },
  reqMsg: {
      fontStyle: 'italic',
      color: '#555',
      marginBottom: 10,
      fontSize: 13,
  },
  tagRow: {
      flexDirection: 'row',
      gap: 6,
      marginBottom: 12,
  },
  tag: {
      backgroundColor: '#F5F5F5',
      paddingVertical: 4,
      paddingHorizontal: 8,
      borderRadius: 8,
  },
  tagText: {
      fontSize: 10,
      color: '#666',
  },
  reqActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      borderTopWidth: 1,
      borderTopColor: '#F9F9F9',
      paddingTop: 10,
  },
  actionBtn: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: 20,
  },
  logoutBtn: {
      marginTop: 20,
      alignItems: 'center',
      padding: 15,
  },
  logoutText: {
      color: Colors.error,
      fontWeight: 'bold',
  }
});