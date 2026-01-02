import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';

// Mock Messages History
const CHAT_HISTORY = [
    { id: '1', name: 'Drh. Anisa Putri', message: 'Baik, nanti saya cek kondisi kucingnya ya.', time: '10:30', unread: 2, avatar: null },
    { id: '2', name: 'Meong Shelter', message: 'Terima kasih donasinya kak! 🙏', time: 'Kemarin', unread: 0, avatar: null },
    { id: '3', name: 'Ahmad F.', message: 'Kucingnya masih ada kak?', time: 'Senin', unread: 0, avatar: null },
    { id: '4', name: 'Siti Aminah', message: 'Oke siap.', time: 'Minggu', unread: 0, avatar: null },
];

export default function ChatListScreen() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <TouchableOpacity 
        style={styles.chatItem} 
        onPress={() => router.push({ pathname: '/chat-room', params: { userName: item.name } })}
    >
        <View style={styles.avatarContainer}>
            <Image source={item.avatar || require('../assets/icon.png')} style={styles.avatar} />
        </View>
        <View style={styles.contentContainer}>
            <View style={styles.headerRow}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.time}>{item.time}</Text>
            </View>
            <View style={styles.messageRow}>
                <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
                {item.unread > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.unread}</Text>
                    </View>
                )}
            </View>
        </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pesan</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={CHAT_HISTORY}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    backgroundColor: Colors.green, // WhatsApp Green-ish
    paddingVertical: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 40, // Status bar sapce
    backgroundColor: Colors.primary,
  },
  headerTitle: {
      color: Colors.white,
      fontSize: 20,
      fontWeight: 'bold',
  },
  list: {
      paddingBottom: 20,
  },
  chatItem: {
      flexDirection: 'row',
      padding: 15,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
      marginRight: 15,
  },
  avatar: {
      width: 50,
      height: 50,
      borderRadius: 25,
      backgroundColor: '#EEE',
  },
  contentContainer: {
      flex: 1,
  },
  headerRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 5,
  },
  name: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.text,
  },
  time: {
      fontSize: 12,
      color: '#888',
  },
  messageRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
  },
  message: {
      fontSize: 14,
      color: '#666',
      flex: 1,
      marginRight: 10,
  },
  badge: {
      backgroundColor: Colors.primary,
      borderRadius: 10,
      minWidth: 20,
      height: 20,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 5,
  },
  badgeText: {
      color: Colors.white,
      fontSize: 10,
      fontWeight: 'bold',
  },
});
