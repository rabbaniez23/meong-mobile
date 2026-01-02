import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity,  FlatList, TextInput, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../../components/ui/ScreenWrapper';

// Mock Comments
const MOCK_COMMENTS = [
    { id: '1', user: 'Rian Gaming', avatar: null, text: 'Setuju banget dok! Kucing saya juga pilek kemarin.', time: '1j' },
    { id: '2', user: 'Cat Lover 99', avatar: null, text: 'Vitamin C merk apa yang bagus dok?', time: '45m' },
];

export default function KomunitasDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [input, setInput] = useState('');

  let thread = {};
  if (params.threadData) {
      thread = JSON.parse(params.threadData);
  }

  const handleSend = () => {
      if (!input.trim()) return;
      const newComment = {
          id: Date.now().toString(),
          user: 'Saya',
          avatar: null,
          text: input,
          time: 'Just now'
      };
      setComments([...comments, newComment]);
      setInput('');
      Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={Colors.text} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Diskusi</Text>
          <View style={{ width: 24 }} />
      </View>

      <KeyboardAvoidingView 
        style={{ flex: 1 }} 
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView style={styles.content}>
            {/* Thread Content */}
            <View style={styles.threadContainer}>
                <View style={styles.userRow}>
                    <View style={styles.avatarPlaceholder} />
                    <View>
                        <Text style={styles.userName}>{thread.user?.name || "User"}</Text>
                        <Text style={styles.time}>{thread.time} • {thread.category}</Text>
                    </View>
                </View>
                <Text style={styles.threadText}>{thread.content}</Text>
                {thread.image && (
                    <Image source={thread.image} style={styles.threadImage} />
                )}
                <View style={styles.statsRow}>
                    <Text style={styles.statText}>{thread.likes} Suka</Text>
                    <Text style={styles.statText}>{thread.comments} Komentar</Text>
                </View>
            </View>

            <View style={styles.divider} />

            {/* Comments List */}
            <View style={styles.commentsSection}>
                <Text style={styles.commentHeader}>Komentar ({comments.length})</Text>
                {comments.map((comment) => (
                    <View key={comment.id} style={styles.commentItem}>
                        <View style={styles.commentAvatar} />
                        <View style={{ flex: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={styles.commentUser}>{comment.user}</Text>
                                <Text style={styles.commentTime}>{comment.time}</Text>
                            </View>
                            <Text style={styles.commentText}>{comment.text}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>

        {/* Input Bar */}
        <View style={styles.inputContainer}>
            <TextInput 
                style={styles.input}
                placeholder="Tulis komentar..."
                value={input}
                onChangeText={setInput}
                multiline
            />
            <TouchableOpacity onPress={handleSend} style={styles.sendBtn}>
                <Ionicons name="send" size={20} color={Colors.primary} />
            </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.white, paddingTop: 30 },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1 },
  threadContainer: { padding: 20 },
  userRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  avatarPlaceholder: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#EEE', marginRight: 10 },
  userName: { fontWeight: 'bold', fontSize: 16 },
  time: { fontSize: 12, color: '#888' },
  threadText: { fontSize: 16, lineHeight: 24, color: '#333', marginBottom: 10 },
  threadImage: { width: '100%', height: 200, borderRadius: 12, marginBottom: 10, resizeMode: 'cover' },
  statsRow: { flexDirection: 'row', gap: 15, marginTop: 5 },
  statText: { color: '#666', fontSize: 13 },
  
  divider: { height: 8, backgroundColor: '#F5F5F5' },
  
  commentsSection: { padding: 20, paddingBottom: 100 },
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
