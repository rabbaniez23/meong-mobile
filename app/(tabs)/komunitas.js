import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text, Image, Animated, Modal, TextInput, KeyboardAvoidingView, Platform, Keyboard, ScrollView, Alert, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ThreadCard from '../../components/ThreadCard';
import FilterBar from '../../components/FilterBar';
import CustomHeader from '../../components/CustomHeader';
import { CameraView, useCameraPermissions } from 'expo-camera';

const { width } = Dimensions.get('window');

// Data Dummy Thread 
const THREADS_DATA = [
  { 
    id: '1', 
    user: { name: 'Drh. Anisa Putri', avatar: null },
    time: '2j',
    category: 'Kesehatan',
    content: 'Musim hujan gini banyak kucing kena flu. Jangan lupa kasih vitamin C ya guys! 🌧️💊',
    image: null, 
    likes: 120,
    comments: 45,
  },
  { 
    id: '2', 
    user: { name: 'Komunitas Meong Bdg', avatar: null },
    time: '4j',
    category: 'Event',
    content: 'Gathering minggu ini fix di CFD Dago ya. See you there! 😻',
    image: require('../../assets/Hatto.jpeg'), 
    likes: 245,
    comments: 88,
  },
  { 
      id: '3', 
      user: { name: 'Rian Gaming', avatar: null },
      time: '5j',
      category: 'Diskusi',
      content: 'Ada yang tau merk dry food yang bagus buat penggemuk tapi low grain?',
      image: null, 
      likes: 15,
      comments: 32,
    },
];

// INITIAL STORY DATA (With Types support)
const INITIAL_STORY_DATA = [
    { id: 'me', name: 'Cerita Anda', isMe: true, stories: [] },
    { id: '1', name: 'Ahmad S.', hasStory: true, stories: [ { type: 'image', source: require('../../assets/Hatto.jpeg'), id: 's1' } ] },
    { id: '2', name: 'Rani K.', hasStory: true, stories: [ { type: 'text', content: 'Kucingku lahiran 5 kitten! 🎉', bg: '#FF9A8B', id: 's2' } ] },
    { id: '3', name: 'Dedi P.', hasStory: true, stories: [ { type: 'image', source: require('../../assets/Oyen.jpeg'), id: 's3' } ] },
    { id: '4', name: 'Shelter Bdg', hasStory: true, stories: [ { type: 'image', source: require('../../assets/kucing.png'), id: 's4' } ] },
];

export default function KomunitasScreen() {
  const router = useRouter();
  const [filter, setFilter] = useState('Semua');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Thread State
  const [selectedThread, setSelectedThread] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([{ id: '1', user: 'Rian Gaming', text: 'Setuju banget dok!', time: '1j' }]);

  // Story Viewer State
  const [storyData, setStoryData] = useState(INITIAL_STORY_DATA);
  const [viewerVisible, setViewerVisible] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Create Story State
  const [createStoryVisible, setCreateStoryVisible] = useState(false);
  const [storyMode, setStoryMode] = useState('camera'); // 'camera' or 'text'
  const [textStoryContent, setTextStoryContent] = useState('');
  const [textStoryBg, setTextStoryBg] = useState('#FF9A8B');
  
  // Camera State
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef(null);
  const [facing, setFacing] = useState('back');

  useEffect(() => {
    Animated.timing(fadeAnim, { toValue: 1, duration: 500, useNativeDriver: true }).start();
  }, []);

  // --- STORY VIEWER LOGIC ---
  useEffect(() => {
    if (viewerVisible) {
      startProgress();
    } else {
      progressAnim.setValue(0);
    }
  }, [viewerVisible, currentUserIndex, currentStoryIndex]);

  const startProgress = () => {
    progressAnim.setValue(0);
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 3000, 
      useNativeDriver: false,
    }).start(({ finished }) => {
      if (finished) {
        nextStory();
      }
    });
  };

  const nextStory = () => {
    const user = storyData[currentUserIndex];
    if (user && currentStoryIndex < user.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1);
    } else {
      if (currentUserIndex < storyData.length - 1) {
        let nextIndex = currentUserIndex + 1;
        while (nextIndex < storyData.length && (!storyData[nextIndex].stories || storyData[nextIndex].stories.length === 0)) {
           nextIndex++;
        }
        if (nextIndex < storyData.length) {
            setCurrentUserIndex(nextIndex);
            setCurrentStoryIndex(0);
        } else {
            setViewerVisible(false);
        }
      } else {
        setViewerVisible(false);
      }
    }
  };

  const openStory = (index) => {
      const user = storyData[index];
      if (user.isMe && (!user.stories || user.stories.length === 0)) {
          if (!permission || !permission.granted) {
             requestPermission();
          }
          setCreateStoryVisible(true);
      } else {
          setCurrentUserIndex(index);
          setCurrentStoryIndex(0);
          setViewerVisible(true);
      }
  };

  // --- DELETE STORY LOGIC ---
  const handleDeleteStory = () => {
      Alert.alert(
          "Hapus Cerita",
          "Apakah Anda yakin ingin menghapus cerita ini?",
          [
              { text: "Batal", style: "cancel" },
              { text: "Hapus", style: "destructive", onPress: () => confirmDelete() }
          ]
      );
  };

  const confirmDelete = () => {
      const updatedData = [...storyData];
      const user = updatedData[currentUserIndex];

      user.stories.splice(currentStoryIndex, 1);

      if (user.stories.length === 0) {
           user.hasStory = false; 
           setViewerVisible(false); 
      } else {
           if (currentStoryIndex >= user.stories.length) {
               setCurrentStoryIndex(0); 
           }
           progressAnim.setValue(0);
      }
      setStoryData(updatedData);
  };

  // --- CREATE STORY LOGIC ---
  const handlePostStory = async (type, content) => {
      let newStory;
      if (type === 'text') {
          if (!content.text) return;
          newStory = { type: 'text', content: content.text, bg: content.bg, id: Date.now().toString() };
      } else {
          if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.5, skipProcessing: true });
                newStory = { type: 'image', source: { uri: photo.uri }, id: Date.now().toString() };
            } catch (error) {
                Alert.alert("Error", "Gagal mengambil gambar");
                return;
            }
          } else {
             newStory = { type: 'image', source: require('../../assets/Hatto.jpeg'), id: Date.now().toString() };
          }
      }
      const updatedData = [...storyData];
      updatedData[0].stories.unshift(newStory); 
      updatedData[0].hasStory = true;
      setStoryData(updatedData);
      setCreateStoryVisible(false);
      setTextStoryContent('');
      Alert.alert("Sukses", "Cerita berhasil diupload!");
  };

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  const handleSendComment = () => {
      if (!commentInput.trim()) return;
      const newComment = {
          id: Date.now().toString(),
          user: 'Saya',
          text: commentInput,
          time: 'Baru saja'
      };
      setComments([...comments, newComment]);
      setCommentInput('');
      Keyboard.dismiss();
  };

  // --- RENDERERS ---
  const StoryList = () => (
      <View style={styles.storyContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 15 }}>
              {storyData.map((user, index) => {
                  const hasStories = user.stories && user.stories.length > 0;
                  
                  if (user.isMe && !hasStories) {
                      return (
                          <TouchableOpacity key={user.id} style={styles.storyItem} onPress={() => openStory(index)}>
                              <View style={[styles.storyRing, { borderColor: 'transparent' }]}>
                                  <Image source={require('../../assets/icon.png')} style={styles.storyAvatar} />
                                  <View style={styles.addStoryBadge}>
                                      <Ionicons name="add" size={14} color={Colors.white} />
                                  </View>
                              </View>
                              <Text style={styles.storyName}>Cerita Anda</Text>
                          </TouchableOpacity>
                      );
                  }
                  
                  if (!hasStories) return null;

                  return (
                      <TouchableOpacity key={user.id} style={styles.storyItem} onPress={() => openStory(index)}>
                            <View style={[styles.storyRing, user.isMe ? { borderColor: '#DDD' } : { borderColor: Colors.primary }]}>
                                <Image source={user.stories[0].type === 'image' ? user.stories[0].source : require('../../assets/icon.png')} style={styles.storyAvatar} />
                            </View>
                            <Text style={styles.storyName} numberOfLines={1}>{user.name}</Text>
                      </TouchableOpacity>
                  );
              })}
          </ScrollView>
      </View>
  );

  const currentUser = storyData[currentUserIndex];
  const currentStory = currentUser?.stories[currentStoryIndex];
  const isMyStory = currentUser?.isMe;

  return (
    <View style={styles.container}>
        <CustomHeader 
            title="Komunitas" 
            leftIcon="chatbubbles-outline"
            onLeftPress={() => router.push('/chat-list')}
            rightIcon="notifications-outline"
            onRightPress={() => router.push('/notifications')}
        />

      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        <FlatList
            data={THREADS_DATA.filter(t => filter === 'Semua' || t.category === filter)}
            renderItem={({ item }) => (
                <ThreadCard 
                    user={item.user} time={item.time} content={item.content}
                    category={item.category} image={item.image} likes={item.likes} comments={item.comments}
                    onCommentPress={() => { setSelectedThread(item); setModalVisible(true); }}
                    onSharePress={() => Alert.alert("Bagikan", "Disalin!")}
                />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={() => (
                <View>
                    <StoryList />
                    {/* Filter Bar */}
                    <View style={{ borderBottomWidth: 1, borderBottomColor: '#F0F0F0' }}>
                        <FilterBar 
                            filters={['Semua', 'Trending', 'Kesehatan', 'Event', 'Diskusi']}
                            activeFilter={filter}
                            onSelect={setFilter}
                        />
                    </View>
                </View>
            )}
        />

        {/* FAB */}
        <TouchableOpacity style={styles.fab} onPress={() => router.push('/add-post')}>
            <Ionicons name="add" size={32} color={Colors.white} />
        </TouchableOpacity>

        {/* --- MODALS --- */}
        
        {/* 1. THREAD DETAIL MODAL (Fixed: Now includes Comments) */}
        <Modal visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
            <View style={{ flex: 1, backgroundColor: Colors.white }}>
                <CustomHeader title="Diskusi" leftIcon="close" onLeftPress={() => setModalVisible(false)} />
                
                <KeyboardAvoidingView 
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1 }}
                >
                    <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
                        {selectedThread && (
                            <View style={{ padding: 20 }}>
                                <View style={styles.userRow}>
                                    <View style={styles.avatarPlaceholder} />
                                    <View>
                                        <Text style={styles.userName}>{selectedThread.user.name}</Text>
                                        <Text style={styles.time}>{selectedThread.time} • {selectedThread.category}</Text>
                                    </View>
                                </View>
                                <Text style={styles.threadText}>{selectedThread.content}</Text>
                                {selectedThread.image && (
                                    <Image source={selectedThread.image} style={styles.threadImage} />
                                )}
                                <View style={styles.statsRow}>
                                    <Text style={styles.statText}>{selectedThread.likes} Suka</Text>
                                    <Text style={styles.statText}>{selectedThread.comments} Komentar</Text>
                                </View>

                                <View style={styles.divider} />

                                <Text style={styles.commentHeader}>Komentar ({comments.length})</Text>
                                {comments.map((c, index) => (
                                    <View key={index} style={styles.commentItem}>
                                        <View style={styles.commentAvatar} />
                                        <View style={{ flex: 1 }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={styles.commentUser}>{c.user}</Text>
                                                <Text style={styles.commentTime}>{c.time}</Text>
                                            </View>
                                            <Text style={styles.commentText}>{c.text}</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        )}
                    </ScrollView>

                    {/* Input Bar */}
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={styles.input}
                            placeholder="Tulis komentar..."
                            value={commentInput}
                            onChangeText={setCommentInput}
                            multiline
                        />
                        <TouchableOpacity onPress={handleSendComment} style={styles.sendBtn}>
                            <Ionicons name="send" size={20} color={Colors.primary} />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
        </Modal>

        {/* 2. STORY VIEWER MODAL */}
        <Modal visible={viewerVisible} transparent={true} animationType="fade" onRequestClose={() => setViewerVisible(false)}>
            <View style={styles.storyViewerContainer}>
                {/* Progress Bar */}
                <View style={styles.progressBarContainer}>
                     {currentUser?.stories.map((_, idx) => (
                         <View key={idx} style={styles.progressBarBg}>
                             {idx === currentStoryIndex ? (
                                 <Animated.View style={[styles.progressBarFill, { 
                                     width: progressAnim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }) 
                                 }]} />
                             ) : (
                                 <View style={[styles.progressBarFill, { width: idx < currentStoryIndex ? '100%' : '0%' }]} />
                             )}
                         </View>
                     ))}
                </View>

                {/* Header Info */}
                <View style={styles.storyHeader}>
                    <Image source={require('../../assets/icon.png')} style={styles.storyHeaderAvatar} />
                    <Text style={styles.storyHeaderName}>{currentUser?.name}</Text>
                    <Text style={styles.storyHeaderTime}>Baru saja</Text>
                    
                    <View style={{ marginLeft: 'auto', flexDirection: 'row', alignItems: 'center', gap: 15 }}>
                         {/* DELETE BUTTON (Titik Tiga) */}
                         {isMyStory && (
                             <TouchableOpacity onPress={handleDeleteStory}>
                                 <Ionicons name="ellipsis-vertical" size={24} color="white" />
                             </TouchableOpacity>
                         )}
                         <TouchableOpacity onPress={() => setViewerVisible(false)}>
                             <Ionicons name="close" size={28} color="white" />
                         </TouchableOpacity>
                    </View>
                </View>

                {/* Content */}
                <View style={styles.storyContent}>
                    {currentStory?.type === 'image' ? (
                        <Image source={currentStory.source} style={styles.storyFullImage} />
                    ) : (
                         <View style={[styles.storyTextContainer, { backgroundColor: currentStory?.bg || '#333' }]}>
                             <Text style={styles.storyTextContent}>{currentStory?.content}</Text>
                         </View>
                    )}
                </View>
                
                <TouchableOpacity style={styles.leftNav} onPress={nextStory} /> 
                <TouchableOpacity style={styles.rightNav} onPress={nextStory} />
            </View>
        </Modal>

        {/* 3. CREATE STORY MODAL */}
        <Modal visible={createStoryVisible} animationType="slide" onRequestClose={() => setCreateStoryVisible(false)}>
            <View style={{ flex: 1, backgroundColor: 'black' }}>
                
                {/* TOP HEADER */}
                <View style={styles.createStoryHeader}>
                     <TouchableOpacity onPress={() => setCreateStoryVisible(false)} style={styles.headerIconBtn}>
                         <Ionicons name="close" size={30} color="white" />
                     </TouchableOpacity>
                     
                     <TouchableOpacity 
                        style={styles.postBtnHeader}
                        onPress={() => handlePostStory(storyMode, storyMode === 'text' ? { text: textStoryContent, bg: textStoryBg } : {})}
                     >
                         <Text style={styles.postBtnText}>Posting</Text>
                         <Ionicons name="arrow-forward" size={18} color={Colors.white} />
                     </TouchableOpacity>
                </View>

                {/* BODY */}
                <KeyboardAvoidingView 
                    style={{ flex: 1 }} 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    {storyMode === 'camera' ? (
                        <View style={styles.cameraView}>
                            {(!permission || !permission.granted) ? (
                                <View style={styles.permissionView}>
                                    <Text style={{color: 'white', marginBottom: 20}}>Izin kamera diperlukan</Text>
                                    <TouchableOpacity onPress={requestPermission} style={{backgroundColor: Colors.primary, padding: 10, borderRadius: 8}}>
                                        <Text style={{color: 'white'}}>Izinkan Kamera</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : (
                                <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
                                    <View style={styles.cameraControls}>
                                        <TouchableOpacity onPress={toggleCameraFacing}>
                                            <Ionicons name="camera-reverse-outline" size={40} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                </CameraView>
                            )}
                            
                            <TouchableOpacity 
                                style={styles.shutterBtn} 
                                onPress={() => handlePostStory('image', {})}
                            >
                                <View style={styles.shutterInner} />
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View style={[styles.textStoryView, { backgroundColor: textStoryBg }]}>
                            <TextInput 
                                style={styles.storyTextInput}
                                placeholder="Ketik sesuatu..."
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                multiline
                                value={textStoryContent}
                                onChangeText={setTextStoryContent}
                                autoFocus
                            />
                            
                            <View style={styles.colorPicker}>
                                {['#FF9A8B', '#FF6A88', '#2AB', '#884DFF', '#333'].map(c => (
                                    <TouchableOpacity key={c} onPress={() => setTextStoryBg(c)} style={[styles.colorDot, { backgroundColor: c }]} />
                                ))}
                            </View>
                        </View>
                    )}
                </KeyboardAvoidingView>

                {/* BOTTOM TABS */}
                 <View style={styles.storyModeTabs}>
                     <TouchableOpacity onPress={() => setStoryMode('text')} style={[styles.modeTab, storyMode === 'text' && styles.activeModeTab]}>
                         <Text style={[styles.modeText, storyMode==='text' && styles.modeTextActive]}>TEKS</Text>
                     </TouchableOpacity>
                     <TouchableOpacity onPress={() => setStoryMode('camera')} style={[styles.modeTab, storyMode === 'camera' && styles.activeModeTab]}>
                         <Text style={[styles.modeText, storyMode==='camera' && styles.modeTextActive]}>KAMERA</Text>
                     </TouchableOpacity>
                 </View>

            </View>
        </Modal>

      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white },
  listContainer: { paddingBottom: 80 },
  storyContainer: { paddingVertical: 10, paddingBottom: 0 },
  storyItem: { alignItems: 'center', marginRight: 15, width: 70 },
  storyRing: { width: 68, height: 68, borderRadius: 34, borderWidth: 2, padding: 3, justifyContent: 'center', alignItems: 'center', marginBottom: 5 },
  storyAvatar: { width: '100%', height: '100%', borderRadius: 30, backgroundColor: '#EEE' },
  storyName: { fontSize: 11, color: '#333', textAlign: 'center' },
  addStoryBadge: { position: 'absolute', bottom: 0, right: 0, backgroundColor: Colors.primary, width: 20, height: 20, borderRadius: 10, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: Colors.white },
  fab: { position: 'absolute', bottom: 20, right: 20, width: 56, height: 56, borderRadius: 28, backgroundColor: Colors.primary, justifyContent: 'center', alignItems: 'center', ...Colors.shadow, elevation: 5 },

  // Story Viewer
  storyViewerContainer: { flex: 1, backgroundColor: 'black' },
  progressBarContainer: { flexDirection: 'row', paddingTop: 45, paddingHorizontal: 10, gap: 5 },
  progressBarBg: { flex: 1, height: 3, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2 },
  progressBarFill: { height: '100%', backgroundColor: 'white', borderRadius: 2 },
  storyHeader: { flexDirection: 'row', alignItems: 'center', padding: 15, marginTop: 0 },
  storyHeaderAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 10 },
  storyHeaderName: { color: 'white', fontWeight: 'bold' },
  storyHeaderTime: { color: '#CCC', marginLeft: 10, fontSize: 12 },
  storyContent: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  storyFullImage: { width: width, height: '80%', resizeMode: 'contain' },
  storyTextContainer: { width: width, height: '100%', justifyContent: 'center', alignItems: 'center', padding: 40 },
  storyTextContent: { color: 'white', fontSize: 24, fontWeight: 'bold', textAlign: 'center' },
  leftNav: { position: 'absolute', left: 0, top: 100, bottom: 0, width: width * 0.4 },
  rightNav: { position: 'absolute', right: 0, top: 100, bottom: 0, width: width * 0.4 },

  // Create Story
  createStoryHeader: { 
      position: 'absolute', top: 50, left: 0, right: 0, zIndex: 20, 
      flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 
  },
  headerIconBtn: { padding: 5 },
  postBtnHeader: { 
      backgroundColor: Colors.primary, paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20,
      flexDirection: 'row', alignItems: 'center', gap: 5
  },
  postBtnText: { color: 'white', fontWeight: 'bold' },
  storyModeTabs: { 
      position: 'absolute', bottom: 30, left: 0, right: 0, 
      flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 20, zIndex: 20 
  },
  modeTab: { padding: 10 },
  activeModeTab: { backgroundColor: 'rgba(50,50,50,0.5)', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20 },
  modeText: { color: '#888', fontWeight: 'bold', fontSize: 14 },
  modeTextActive: { color: 'white', fontWeight: 'bold', fontSize: 16 },
  cameraView: { flex: 1, backgroundColor: '#000' },
  camera: { flex: 1 },
  cameraControls: { flex: 1, backgroundColor: 'transparent', flexDirection: 'row', justifyContent: 'flex-end', margin: 20 },
  permissionView: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  shutterBtn: { position: 'absolute', bottom: 100, alignSelf:'center', width: 80, height: 80, borderRadius: 40, borderWidth: 5, borderColor: 'white', justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  shutterInner: { width: 60, height: 60, borderRadius: 30, backgroundColor: 'white' },
  textStoryView: { flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' },
  storyTextInput: { fontSize: 30, color: 'white', textAlign: 'center', width: '80%', fontWeight: 'bold', maxHeight: 300 },
  colorPicker: { position: 'absolute', bottom: 120, flexDirection: 'row', gap: 15 },
  colorDot: { width: 30, height: 30, borderRadius: 15, borderWidth: 2, borderColor: 'white' },
  
  // Styles for restored Comment Modal (re-added missing styles)
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EEE', marginRight: 10 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  time: { fontSize: 12, color: '#888' },
  threadText: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 10 },
  threadImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 10, resizeMode: 'cover' },
  statsRow: { flexDirection: 'row', gap: 15, marginTop: 5, marginBottom: 15 },
  statText: { color: '#666', fontSize: 13 },
  divider: { height: 1, backgroundColor: '#EEE', marginVertical: 15 },
  commentHeader: { fontWeight: 'bold', fontSize: 16, marginBottom: 15 },
  commentItem: { flexDirection: 'row', marginBottom: 20 },
  commentAvatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#EEE', marginRight: 10 },
  commentUser: { fontWeight: 'bold', fontSize: 14 },
  commentTime: { fontSize: 10, color: '#999' },
  commentText: { fontSize: 14, color: '#444', marginTop: 2 },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
      backgroundColor: Colors.white,
      paddingBottom: Platform.OS === 'ios' ? 20 : 10,
  },
  input: {
      flex: 1,
      backgroundColor: '#F9F9F9',
      borderRadius: 20,
      paddingHorizontal: 15,
      paddingVertical: 8,
      marginRight: 10,
      maxHeight: 100,
  },
  sendBtn: {
      padding: 10,
  }
});
