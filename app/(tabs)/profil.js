import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, ScrollView, SafeAreaView, Alert, Text, TouchableOpacity, Image, Modal, Animated, FlatList, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ProfileHeader from '../../components/Profile/ProfileHeader';
import IdentityGrid from '../../components/Profile/IdentityGrid';
import StatsOverview from '../../components/Profile/StatsOverview';
import ActivityTabs from '../../components/Profile/ActivityTabs';
import HistoryList from '../../components/Profile/HistoryList';
import LostCatCard from '../../components/LostCatCard';
import ListingCard from '../../components/ListingCard'; // Re-use Listing Card for "My Adoption Posts"

// Enable LayoutAnimation for Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

// --- MOCK USER DATA ---
const USER_DATA = {
  name: "Rizki Rabbani",
  email: "rizki.r@upi.edu",
  role: "Cat Guardian",
  avatar: require('../../assets/kucing.png'), 
  job: "Software Engineer",
  age: 24,
  location: "Bandung, ID",
  joinDate: "Jan 2024",
  status: "Verified Account", // NEW
  motivation: "Mewujudkan dunia yang ramah bagi setiap ekor.", // NEW
  stats: {
    adoptions: 2,
    reports: 3,
    donated: "500kb"
  }
};

// --- INITIAL DATA ---
const INITIAL_ADOPTION_HISTORY = [
    { id: '1', catName: 'Miko', date: '10 Jan 2025', catBreed: 'Domestik', status: 'Approved', image: require('../../assets/Miko.jpeg') },
    { id: '2', catName: 'Oyen', date: '05 Des 2024', catBreed: 'Orange', status: 'Rejected', image: require('../../assets/Oyen.jpeg') },
];

const INITIAL_REPORTS = [ // (Lost Cats)
    { id: '1', name: 'Mochi', lastSeen: 'Kemarin Sore', location: 'Jl. Dago', image: require('../../assets/Putih.jpeg'), status: 'Dicari', distance: '0.5' },
    { id: '2', name: 'Tom', lastSeen: '1 Minggu lalu', location: 'Gasibu', image: require('../../assets/Abu.jpeg'), status: 'Ditemukan', distance: '2.0' },
    { id: '3', name: 'Luna', lastSeen: '2 Hari lalu', location: 'Cihampelas', image: require('../../assets/Hatto.jpeg'), status: 'Dicari', distance: '1.2' }, 
];

const INITIAL_ADOPTION_POSTS = [ // NEW (My Adoption Listings)
    { id: '1', name: 'Hattoo', breed: 'Domestik', age: '1 Thn', gender: 'Jantan', image: require('../../assets/Hatto.jpeg'), status: 'available' },
    { id: '2', name: 'Luna', breed: 'Siam', age: '4 Bln', gender: 'Betina', image: require('../../assets/Abu.jpeg'), status: 'adopted' },
];

const INITIAL_REQUESTS = [
    { 
        id: '1', requester: 'Budi Santoso', catName: 'Hattoo', date: 'Baru saja', message: 'Saya berminat adopsi Hatto. Rumah saya sudah ada pagar.', 
        details: { 
            job: 'Wiraswasta', age: 29, location: 'Cimahi', 
            // Enhanced Questionnaire Data
            questionnaire: {
                experience: true,
                fence: true,
                vaccineCommitment: true,
                indoor: true
            }
        }
    },
    { 
        id: '2', requester: 'Siti Aminah', catName: 'Oyen', date: '2 Jam lalu', message: 'Apakah Oyen bisa diantar? Saya mau adopt.', 
        details: { 
            job: 'Dokter', age: 31, location: 'Setiabudi',
            questionnaire: {
                experience: true,
                fence: false, // Warning
                vaccineCommitment: true,
                indoor: false
            }
        }
    }
];

const DONATION_HISTORY = [
    { id: '1', amount: '50.000', date: '20 Des 2024', campaign: 'Bantu Kucing Jalanan', status: 'Berhasil' },
    { id: '2', amount: '100.000', date: '15 Nov 2024', campaign: 'Pengobatan Muezza', status: 'Berhasil' },
];

export default function ProfilScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Riwayat Adopsi');
  
  // State for Lists
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  
  // Post Management State
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [adoptionPosts, setAdoptionPosts] = useState(INITIAL_ADOPTION_POSTS);
  const [myPostFilter, setMyPostFilter] = useState('lost'); // 'lost' or 'adoption'
  
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

  const removeRequest = (id) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setRequests(prev => prev.filter(r => r.id !== id));
      setRequestModalVisible(false);
  };

  const handleRejectRequest = (id) => {
      Alert.alert("Tolak Permintaan", "Yakin ingin menolak permintaan ini?", [
          { text: "Batal", style: "cancel" },
          { text: "Tolak", onPress: () => removeRequest(id), style: 'destructive' }
      ]);
  };

  const handleApproveRequest = (id) => {
      Alert.alert("Terima Permintaan", "Anda akan menerima permintaan ini. Kucing akan ditandai sebagai 'Diadopsi'.", [
          { text: "Batal", style: "cancel" },
          { text: "Terima", onPress: () => removeRequest(id) }
      ]);
  };

  // --- REPORT LOGIC ---
  const showReportDetails = (report) => {
      setSelectedReport(report);
      setReportModalVisible(true);
  };

  const handleMarkFound = (id) => {
      Alert.alert("Kucing Ditemukan!", "Laporan akan dihapus dari daftar pencarian.", [
          { text: "Belum", style: "cancel" },
          { 
              text: "Ya, Ditemukan", 
              onPress: () => {
                  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                  setReports(prev => prev.filter(r => r.id !== id));
                  setReportModalVisible(false);
              }
          }
      ]);
  };

  const handleMarkAdopted = (id) => {
      Alert.alert("Tandai Teradopsi", "Ubah status menjadi teradopsi?", [
           { text: "Batal", style: "cancel" },
           { text: "Ya", onPress: () => console.log("Marking adpoted " + id) }
      ]);
  };

  // --- CHAT LOGIC ---
  const handleChat = (userName, catName, type) => {
      setRequestModalVisible(false);
      setReportModalVisible(false);
      
      const contextString = type === 'adoption' 
        ? `Pengajuan Adopsi: ${catName}` 
        : `Laporan Penemuan: ${catName}`;
      
      const initialMsg = type === 'adoption'
        ? `Halo ${userName}, saya ingin mendiskusikan pengajuan adopsi untuk ${catName}.`
        : `Halo ${userName}, terima kasih atas info mengenai ${catName}.`;

      const roomId = `room-${userName}-${Date.now()}`;

      router.push({ 
          pathname: '/chat-room', 
          params: { 
              roomId,
              userName, 
              context: contextString,
              initialMessage: initialMsg 
          } 
      });
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

            {/* 3. Postingan Saya (Renamed from Laporan Saya) */}
            {activeTab === 'Postingan Saya' && (
                <View style={styles.tabContent}>
                    {/* Sub Filter Chips */}
                    <View style={styles.postFilterContainer}>
                        <TouchableOpacity 
                            style={[styles.filterChip, myPostFilter === 'lost' && styles.filterChipActive]}
                            onPress={() => setMyPostFilter('lost')}
                        >
                            <Text style={[styles.filterText, myPostFilter === 'lost' && styles.filterTextActive]}>Kehilangan</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.filterChip, myPostFilter === 'adoption' && styles.filterChipActive]}
                            onPress={() => setMyPostFilter('adoption')}
                        >
                            <Text style={[styles.filterText, myPostFilter === 'adoption' && styles.filterTextActive]}>Tawaran Adopsi</Text>
                        </TouchableOpacity>
                    </View>

                    {myPostFilter === 'lost' ? (
                        // LOST POSTS LIST
                        reports.length === 0 ? (
                             <Text style={styles.emptyText}>Tidak ada laporan aktif.</Text>
                        ) : (
                             reports.map((report) => (
                                <View key={report.id} style={{ marginBottom: 15 }}>
                                    <LostCatCard 
                                        name={report.name}
                                        lastSeen={report.lastSeen}
                                        location={report.location}
                                        image={report.image}
                                        distance={report.distance}
                                        onPress={() => showReportDetails(report)} 
                                    />
                                    {/* Action Buttons */}
                                    <View style={styles.cardActionRow}>
                                        <TouchableOpacity style={styles.actionBtnOutline}>
                                            <Ionicons name="create-outline" size={16} color={Colors.text} />
                                            <Text style={styles.actionBtnText}>Edit</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.actionBtnFilled, { backgroundColor: Colors.error }]}
                                            onPress={() => handleMarkFound(report.id)}
                                        >
                                            <Ionicons name="checkmark-done" size={16} color="white" />
                                            <Text style={[styles.actionBtnText, { color: 'white' }]}>Selesai</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )
                    ) : (
                        // ADOPTION POSTS LIST
                        adoptionPosts.length === 0 ? (
                            <Text style={styles.emptyText}>Belum ada postingan adopsi.</Text>
                        ) : (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                                {adoptionPosts.map((post) => (
                                    <View key={post.id} style={{ width: '48%', marginBottom: 15 }}>
                                        <ListingCard 
                                            name={post.name}
                                            breed={post.breed}
                                            age={post.age}
                                            gender={post.gender}
                                            image={post.image}
                                            status={post.status}
                                            onPress={() => Alert.alert("Detail", "Edit atau hapus postingan ini.")}
                                        />
                                        <TouchableOpacity 
                                            style={styles.miniEditBtn}
                                            onPress={() => handleMarkAdopted(post.id)}
                                        >
                                            <Ionicons name="ellipsis-horizontal" size={16} color="#555" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )
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

      {/* --- MODAL 1: PERMINTAAN DETAILS (Selection Criteria) --- */}
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
                        
                        {/* 1. Basic Info */}
                        <InfoSection title="Informasi Personal">
                            <InfoItem label="Pekerjaan" value={selectedRequest.details.job} />
                            <InfoItem label="Usia" value={selectedRequest.details.age} />
                            <InfoItem label="Lokasi" value={selectedRequest.details.location} />
                        </InfoSection>

                        {/* 2. Questionnaire Results (NEW) */}
                        {selectedRequest.details.questionnaire && (
                            <InfoSection title="Hasil Kuisioner Adopsi">
                                <QuestionnaireItem 
                                    label="Pengalaman" 
                                    isYes={selectedRequest.details.questionnaire.experience} 
                                />
                                <QuestionnaireItem 
                                    label="Rumah Berpagar" 
                                    isYes={selectedRequest.details.questionnaire.fence} 
                                />
                                <QuestionnaireItem 
                                    label="Komitmen Vaksin" 
                                    isYes={selectedRequest.details.questionnaire.vaccineCommitment} 
                                />
                                <QuestionnaireItem 
                                    label="Indoor Only" 
                                    isYes={selectedRequest.details.questionnaire.indoor} 
                                />
                            </InfoSection>
                        )}
                        
                        <View style={styles.threeBtnRow}>
                             {/* TOLAK */}
                             <TouchableOpacity style={[styles.btnAction, { backgroundColor: '#FFEBEE' }]} onPress={() => handleRejectRequest(selectedRequest.id)}>
                                <Ionicons name="close-circle-outline" size={20} color={Colors.error} />
                                <Text style={{ color: Colors.error, fontSize: 10, fontWeight: 'bold' }}>Tolak</Text>
                             </TouchableOpacity>

                              {/* CHAT */}
                             <TouchableOpacity 
                                style={[styles.btnAction, { backgroundColor: '#E3F2FD' }]} 
                                onPress={() => handleChat(selectedRequest.requester, selectedRequest.catName, 'adoption')}
                             >
                                <Ionicons name="chatbubbles-outline" size={20} color="#1976D2" />
                                <Text style={{ color: '#1976D2', fontSize: 10, fontWeight: 'bold' }}>Chat</Text>
                             </TouchableOpacity>

                              {/* TERIMA */}
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

      {/* --- MODAL 2: LAPORAN DETAILS --- */}
      <Modal animationType="slide" transparent={true} visible={reportModalVisible} onRequestClose={() => setReportModalVisible(false)}>
        <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
                <ModalHeader title={`Laporan: ${selectedReport?.name}`} onClose={() => setReportModalVisible(false)} />
                
                <TouchableOpacity style={styles.markFoundBtnLarge} onPress={() => handleMarkFound(selectedReport?.id)}>
                    <Ionicons name="checkmark-circle" size={20} color={Colors.white} />
                    <Text style={styles.markFoundTextLarge}>Tandai Sudah Ditemukan</Text>
                </TouchableOpacity>

                <Text style={styles.modalSubtitle}>Respon masuk:</Text>
                <Text style={{ color: '#999', padding: 20, textAlign: 'center' }}>Belum ada respon.</Text>
            
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

const QuestionnaireItem = ({ label, isYes }) => (
    <View style={styles.infoItem}>
        <Text style={styles.infoLabel}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <Ionicons 
                name={isYes ? "checkmark-circle" : "close-circle"} 
                size={16} 
                color={isYes ? Colors.primary : Colors.error} 
            />
            <Text style={{ fontWeight: 'bold', color: isYes ? Colors.primary : Colors.error }}>
                {isYes ? "Ya" : "Tidak"}
            </Text>
        </View>
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

  // Post Filter (Chips)
  postFilterContainer: { flexDirection: 'row', justifyContent: 'center', marginBottom: 20, gap: 10 },
  filterChip: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: '#E0E0E0' },
  filterChipActive: { backgroundColor: Colors.primary },
  filterText: { color: '#666', fontWeight: 'bold', fontSize: 12 },
  filterTextActive: { color: 'white' },

  // Action Buttons for My Posts
  cardActionRow: { 
      flexDirection: 'row', justifyContent: 'flex-end', marginTop: -10, marginBottom: 15, 
      backgroundColor: 'white', padding: 10, borderRadius: 12, ...Colors.shadow, gap: 10 
  },
  actionBtnOutline: { 
      paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', 
      flexDirection: 'row', alignItems: 'center', gap: 5 
  },
  actionBtnFilled: { 
      paddingVertical: 6, paddingHorizontal: 12, borderRadius: 8, 
      flexDirection: 'row', alignItems: 'center', gap: 5 
  },
  actionBtnText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  miniEditBtn: {
      position: 'absolute', top: 10, right: 10, width: 24, height: 24, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.8)',
      justifyContent: 'center', alignItems: 'center'
  },

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

  modalSubtitle: { fontSize: 14, fontWeight: '600', color: '#666', marginBottom: 10 },
  logoutBtn: { marginTop: 10, alignItems: 'center', padding: 15 },
  logoutText: { color: Colors.error, fontWeight: 'bold' },
});