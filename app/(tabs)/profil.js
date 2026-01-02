import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert, Text, TouchableOpacity, Image, Modal, Animated, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import IdentityGrid from '../../components/Profile/IdentityGrid';
import StatsOverview from '../../components/Profile/StatsOverview';
import ActivityTabs from '../../components/Profile/ActivityTabs';
import HistoryList from '../../components/Profile/HistoryList';
import LostCatCard from '../../components/LostCatCard';

// MOCK USER DATA
const USER_DATA = {
  name: "Rizki Rabbani",
  email: "rizki.r@upi.edu",
  role: "Cat Guardian",
  avatar: require('../../assets/kucing.png'), 
  job: "Software Engineer",
  age: 24,
  location: "Bandung, ID",
  joinDate: "Jan 2024",
  stats: {
    adoptions: 2,
    reports: 3,
    donated: "500kb"
  }
};

// INITIAL DATA
const INITIAL_ADOPTION_HISTORY = [
    { id: '1', catName: 'Miko', date: '10 Jan 2025', catBreed: 'Domestik', status: 'Approved', image: require('../../assets/Miko.jpeg') },
    { id: '2', catName: 'Oyen', date: '05 Des 2024', catBreed: 'Orange', status: 'Rejected', image: require('../../assets/Oyen.jpeg') },
];

const INITIAL_REPORTS = [
    { id: '1', name: 'Mochi', lastSeen: 'Kemarin Sore', location: 'Jl. Dago', image: require('../../assets/Putih.jpeg'), status: 'Dicari' },
    { id: '2', name: 'Tom', lastSeen: '1 Minggu lalu', location: 'Gasibu', image: require('../../assets/Abu.jpeg'), status: 'Ditemukan' },
];

const INITIAL_REQUESTS = [
    { 
        id: '1', requester: 'Budi Santoso', catName: 'Hattoo', date: 'Baru saja', message: 'Saya berminat adopsi Hatto.', 
        details: { job: 'Wiraswasta', age: 29, location: 'Cimahi', history: 'Pernah adopsi 2 kucing.', houseType: 'Rumah Pribadi' }
    },
    { 
        id: '2', requester: 'Siti Aminah', catName: 'Oyen', date: '2 Jam lalu', message: 'Apakah Oyen bisa diantar?', 
        details: { job: 'Dokter', age: 31, location: 'Setiabudi', history: 'Punya 1 Anjing.', houseType: 'Apartemen' }
    }
];

const DONATION_HISTORY = [
    { id: '1', amount: '50.000', date: '20 Des 2024', campaign: 'Bantu Kucing Jalanan', status: 'Berhasil' },
    { id: '2', amount: '100.000', date: '15 Nov 2024', campaign: 'Pengobatan Muezza', status: 'Berhasil' },
];

// MOCK REPORT RESPONSES
const REPORT_RESPONSES = [
    { id: '1', reporterName: 'Asep Supriatna', avatar: null, message: 'Saya lihat kucing ini di dekat Warung Steak Dago.', time: '10 Menit lalu' },
];

export default function ProfilScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Riwayat Adopsi');
  
  // State for Lists (to allow removal)
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  
  // Animation
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Modals
  const [requestModalVisible, setRequestModalVisible] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const [reportModalVisible, setReportModalVisible] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleEdit = () => router.push('/edit-profile');

  // --- REQUEST LOGIC ---
  const showRequestDetails = (req) => {
      setSelectedRequest(req);
      setRequestModalVisible(true);
  };

  const handleRejectRequest = (id) => {
      Alert.alert("Tolak Permintaan", "Yakin ingin menolak permintaan ini?", [
          { text: "Batal", style: "cancel" },
          { 
            text: "Tolak", 
            onPress: () => {
                setRequests(prev => prev.filter(r => r.id !== id));
                setRequestModalVisible(false);
            },
            style: 'destructive'
          }
      ]);
  };

  const handleApproveRequest = (id) => {
      Alert.alert("Terima Permintaan", "Anda akan menerima permintaan ini. Kucing akan ditandai sebagai 'Diadopsi'.", [
          { text: "Batal", style: "cancel" },
          { 
            text: "Terima", 
            onPress: () => {
                setRequests(prev => prev.filter(r => r.id !== id)); // Remove from list
                setRequestModalVisible(false); // Close modal
            } 
          }
      ]);
  };

  // --- REPORT LOGIC ---
  const showReportDetails = (report) => {
      setSelectedReport(report);
      setReportModalVisible(true);
  };

  const handleMarkFound = (id) => {
      Alert.alert("Kucing Ditemukan!", "Apakah kucing ini sudah benar-benar kembali? Laporan akan dihapus dari daftar pencarian.", [
          { text: "Belum", style: "cancel" },
          { 
              text: "Ya, Ditemukan", 
              onPress: () => {
                  setReports(prev => prev.filter(r => r.id !== id)); // Remove from list
                  setReportModalVisible(false); // Close modal
              }
          }
      ]);
  };

  const handleChat = (userName) => {
      setRequestModalVisible(false);
      setReportModalVisible(false);
      router.push({ pathname: '/chat-room', params: { userName } });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        style={{ opacity: fadeAnim }}
      >
        <ProfileHeader user={USER_DATA} onEdit={handleEdit} />
        <IdentityGrid user={USER_DATA} />
        <StatsOverview stats={USER_DATA.stats} />
        <ActivityTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <View style={styles.contentArea}>
            
            {/* 1. Riwayat Adopsi */}
            {activeTab === 'Riwayat Adopsi' && (
                <View style={styles.tabContent}>
                    <Text style={styles.sectionTitle}>Riwayat Adopsi</Text>
                    <HistoryList data={INITIAL_ADOPTION_HISTORY} type="adoption" />
                </View>
            )}

            {/* 2. Permintaan */}
            {activeTab === 'Permintaan' && (
                 <View style={styles.tabContent}>
                    <Text style={styles.sectionTitle}>Permintaan Masuk</Text>
                    {requests.length === 0 ? (
                        <Text style={styles.emptyText}>Tidak ada permintaan baru.</Text>
                    ) : (
                        requests.map((req) => (
                            <TouchableOpacity key={req.id} style={styles.card} onPress={() => showRequestDetails(req)}>
                                <View style={styles.cardHeader}>
                                    <Image source={require('../../assets/icon.png')} style={styles.avatarSmall} />
                                    <View style={{ flex: 1 }}>
                                        <Text style={styles.cardTitle}>{req.requester}</Text>
                                        <Text style={styles.cardSubtitle}>Ingin adopsi {req.catName}</Text>
                                    </View>
                                    <Text style={styles.cardTime}>{req.date}</Text>
                                </View>
                                <Text style={styles.cardBody} numberOfLines={2}>"{req.message}"</Text>
                                <View style={styles.actionRow}>
                                    <Text style={styles.linkText}>Lihat Detail & Aksi</Text>
                                    <Ionicons name="chevron-forward" size={16} color={Colors.secondary} />
                                </View>
                            </TouchableOpacity>
                        ))
                    )}
                 </View>
            )}

            {/* 3. Laporan Saya */}
            {activeTab === 'Laporan Saya' && (
                <View style={styles.tabContent}>
                    <Text style={styles.sectionTitle}>Laporan Kehilangan</Text>
                    {reports.length === 0 ? (
                        <Text style={styles.emptyText}>Tidak ada laporan aktif.</Text>
                    ) : (
                         reports.map((report) => (
                            <View key={report.id} style={{ marginBottom: 15 }}>
                                <LostCatCard 
                                    name={report.name}
                                    lastSeen={report.lastSeen}
                                    location={report.location}
                                    image={report.image}
                                    onPress={() => showReportDetails(report)} 
                                />
                                {/* Quick Action Button for Found */}
                                <TouchableOpacity 
                                    style={styles.markFoundBtnSmall}
                                    onPress={() => handleMarkFound(report.id)}
                                >
                                    <Ionicons name="checkmark-circle-outline" size={16} color={Colors.white} />
                                    <Text style={styles.markFoundTextSmall}>Tandai Ditemukan</Text>
                                </TouchableOpacity>
                            </View>
                        ))
                    )}
                </View>
            )}

            {/* 4. Donasi */}
            {activeTab === 'Donasi' && (
                <View style={styles.tabContent}>
                    <Text style={styles.sectionTitle}>Riwayat Donasi</Text>
                    <HistoryList data={DONATION_HISTORY} type="donation" />
                </View>
            )}
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={() => router.replace('/login')}>
            <Text style={styles.logoutText}>Keluar Akun</Text>
        </TouchableOpacity>

      </Animated.ScrollView>

      {/* --- MODAL 1: PERMINTAAN DETAILS (3 Buttons) --- */}
      <Modal animationType="slide" transparent={true} visible={requestModalVisible} onRequestClose={() => setRequestModalVisible(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <ModalHeader title="Detail Permintaan" onClose={() => setRequestModalVisible(false)} />
                {selectedRequest && (
                    <ScrollView>
                        <View style={styles.profileSection}>
                           <Image source={require('../../assets/icon.png')} style={styles.avatarLarge} />
                           <Text style={styles.profileName}>{selectedRequest.requester}</Text>
                           <Text style={styles.profileRole}>Calon Adopter</Text>
                        </View>
                        <InfoSection title="Informasi Personal">
                            <InfoItem label="Pekerjaan" value={selectedRequest.details.job} />
                            <InfoItem label="Usia" value={selectedRequest.details.age} />
                            <InfoItem label="Lokasi" value={selectedRequest.details.location} />
                        </InfoSection>
                        
                        <View style={styles.threeBtnRow}>
                             {/* 1. TOLAK */}
                             <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#FFEBEE' }]} onPress={() => handleRejectRequest(selectedRequest.id)}>
                                <Ionicons name="close-circle-outline" size={20} color={Colors.error} />
                                <Text style={{ color: Colors.error, fontSize: 10, fontWeight: 'bold' }}>Tolak</Text>
                             </TouchableOpacity>

                              {/* 2. CHAT */}
                             <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#E3F2FD' }]} onPress={() => handleChat(selectedRequest.requester)}>
                                <Ionicons name="chatbubbles-outline" size={20} color="#1976D2" />
                                <Text style={{ color: '#1976D2', fontSize: 10, fontWeight: 'bold' }}>Chat</Text>
                             </TouchableOpacity>

                              {/* 3. TERIMA */}
                             <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#E8F5E9' }]} onPress={() => handleApproveRequest(selectedRequest.id)}>
                                <Ionicons name="checkmark-circle-outline" size={20} color={Colors.secondary} />
                                <Text style={{ color: Colors.secondary, fontSize: 10, fontWeight: 'bold' }}>Terima</Text>
                             </TouchableOpacity>
                        </View>
                    </ScrollView>
                )}
            </View>
        </View>
      </Modal>

      {/* --- MODAL 2: LAPORAN DETAILS + Mark Found --- */}
      <Modal animationType="slide" transparent={true} visible={reportModalVisible} onRequestClose={() => setReportModalVisible(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <ModalHeader title={`Laporan: ${selectedReport?.name}`} onClose={() => setReportModalVisible(false)} />
                
                <TouchableOpacity style={styles.markFoundBtnLarge} onPress={() => handleMarkFound(selectedReport?.id)}>
                    <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
                    <Text style={styles.markFoundTextLarge}>Tandai Sudah Ditemukan</Text>
                </TouchableOpacity>

                <Text style={styles.modalSubtitle}>Respon dari Komunitas</Text>
                {REPORT_RESPONSES.length > 0 ? (
                    <FlatList 
                        data={REPORT_RESPONSES}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.responseCard}>
                                <View style={styles.responseHeader}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={styles.avatarMini} />
                                        <Text style={styles.responseName}>{item.reporterName}</Text>
                                    </View>
                                    <Text style={styles.responseTime}>{item.time}</Text>
                                </View>
                                <Text style={styles.responseText}>"{item.message}"</Text>
                                <TouchableOpacity style={styles.chatBtnSmall} onPress={() => handleChat(item.reporterName)}>
                                    <Ionicons name="chatbubble-ellipses-outline" size={16} color={Colors.white} />
                                    <Text style={styles.chatBtnText}>Chat</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                ) : (
                    <Text style={{ color: '#999', padding: 20, textAlign: 'center' }}>Belum ada respon.</Text>
                )}
            </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// --- SUB COMPONENTS ---

const ModalHeader = ({ title, onClose }) => (
    <View style={styles.modalHeader}>
        <Text style={styles.modalTitle}>{title}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <Ionicons name="close" size={20} color="#555" />
        </TouchableOpacity>
    </View>
);

const InfoSection = ({ title, children }) => (
    <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>{title}</Text>
        {children}
    </View>
);

const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>{label}</Text>
        <Text style={styles.infoValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingTop: 30 },
  scrollContent: { padding: 20, paddingBottom: 50 },
  contentArea: { minHeight: 200, marginTop: 10 },
  
  // Tabs Content
  tabContent: { flex: 1 },
  sectionTitle: { 
      fontSize: 16, fontWeight: 'bold', color: Colors.text, marginBottom: 15, textAlign: 'center',
      textTransform: 'uppercase', letterSpacing: 0.5 
  },
  emptyText: { textAlign: 'center', color: '#888', fontStyle: 'italic', marginTop: 20 },

  // Cards
  card: { backgroundColor: Colors.white, padding: 16, borderRadius: 16, marginBottom: 12, ...Colors.shadow },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatarSmall: { width: 40, height: 40, borderRadius: 20, marginRight: 10, backgroundColor: '#eee' },
  cardTitle: { fontWeight: 'bold', fontSize: 14, color: Colors.text },
  cardSubtitle: { fontSize: 12, color: Colors.primary },
  cardTime: { fontSize: 10, color: '#999' },
  cardBody: { fontSize: 13, color: '#555', marginBottom: 10, fontStyle: 'italic' },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 4 },
  linkText: { fontSize: 12, color: Colors.secondary, fontWeight: 'bold' },

  // Mark Found Button (Small)
  markFoundBtnSmall: {
      backgroundColor: Colors.secondary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      padding: 8, borderRadius: 8, marginTop: -10, marginBottom: 15, marginHorizontal: 4
  },
  markFoundTextSmall: { color: Colors.white, fontWeight: 'bold', fontSize: 12, marginLeft: 6 },

  // Mark Found Button (Large)
  markFoundBtnLarge: {
      backgroundColor: Colors.secondary, flexDirection: 'row', alignItems: 'center', justifyContent: 'center',
      padding: 15, borderRadius: 12, marginBottom: 20, width: '100%'
  },
  markFoundTextLarge: { color: Colors.white, fontWeight: 'bold', fontSize: 14, marginLeft: 8 },

  // Modal Common
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: Colors.white, borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: Colors.text },
  closeBtn: { padding: 5, backgroundColor: '#F0F0F0', borderRadius: 20 },
  
  // Profile Detail
  profileSection: { alignItems: 'center', marginBottom: 20 },
  avatarLarge: { width: 80, height: 80, borderRadius: 40, marginBottom: 10 },
  profileName: { fontSize: 20, fontWeight: 'bold', color: Colors.secondary },
  profileRole: { fontSize: 14, color: '#666' },
  
  infoSection: { marginBottom: 20, backgroundColor: '#F9F9F9', padding: 15, borderRadius: 12 },
  infoTitle: { fontSize: 12, fontWeight: 'bold', color: '#888', marginBottom: 10, textTransform: 'uppercase' },
  infoItem: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  infoLabel: { fontSize: 14, color: '#555' },
  infoValue: { fontSize: 14, fontWeight: 'bold', color: Colors.text },

  // Three Button Action Row
  threeBtnRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginTop: 10 },
  btnAction: { 
      flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center',
      gap: 4
  },

  // Report Responses
  modalSubtitle: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 10 },
  responseCard: { backgroundColor: '#F5F5F5', padding: 12, borderRadius: 12, marginBottom: 10 },
  responseHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  avatarMini: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#CCC', marginRight: 8 },
  responseName: { fontWeight: 'bold', fontSize: 13, color: Colors.text },
  responseTime: { fontSize: 10, color: '#999' },
  responseText: { fontSize: 13, color: '#444', marginBottom: 10 },
  chatBtnSmall: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', paddingVertical: 6, paddingHorizontal: 12, borderRadius: 20, alignSelf: 'flex-start', gap: 6 },
  chatBtnText: { color: Colors.white, fontSize: 12, fontWeight: 'bold' },

  logoutBtn: { marginTop: 10, alignItems: 'center', padding: 15 },
  logoutText: { color: Colors.error, fontWeight: 'bold' },
});