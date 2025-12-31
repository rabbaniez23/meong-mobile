import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, SafeAreaView, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ProfileStats from '../../components/Profile/ProfileStats';
import ProfileTabs from '../../components/Profile/ProfileTabs';
import ActionListItem from '../../components/Profile/ActionListItem';
import CatCard from '../../components/CatCard';

export default function ProfilScreen() {
  const [activeTab, setActiveTab] = useState('Postingan');

  // --- Mock Data ---
  const MOCK_POSTS = [
    { id: '1', name: 'Mochi', breed: 'Kucing Kampung', age: '1.5th', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1887&auto=format&fit=crop' },
    { id: '2', name: 'Oyen', breed: 'Domestik', age: '8bln', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop' },
  ];

  const MOCK_LAMARAN = [
    { id: '1', title: 'Adopsi Luna', subtitle: 'Pemilik: Budi Santoso', status: 'Waiting', type: 'Adopsi' },
    { id: '2', title: 'Adopsi Garfield', subtitle: 'Pemilik: Siti Aminah', status: 'Rejected', type: 'Adopsi' },
  ];

  const MOCK_DONASI = [
    { id: '1', title: 'Donasi Makanan', subtitle: 'Campaign: Bantu Kucing Pasar', status: 'Selesai', type: 'Donasi', date: '12 Okt 2023' },
    { id: '2', title: 'Donasi Obat', subtitle: 'Campaign: Steril Gratis', status: 'Selesai', type: 'Donasi', date: '28 Sep 2023' },
    { id: '3', title: 'Uang Tunai', subtitle: 'Campaign: Rumah Singgah', status: 'Pending', type: 'Donasi', date: '1 Jan 2024' },
  ];

  const MOCK_INBOX = [
    { id: '1', title: 'Permintaan Adopsi Mochi', subtitle: 'Dari: Ahmad Dhani', status: 'Waiting', type: 'Adopsi' },
    { id: '2', title: 'Permintaan Adopsi Oyen', subtitle: 'Dari: Raisa', status: 'Approved', type: 'Adopsi' },
  ];

  // --- Render Content Based on Tab ---
  const renderContent = () => {
    switch (activeTab) {
      case 'Postingan':
        return (
          <View style={styles.listContainer}>
            {MOCK_POSTS.map((item) => (
              <CatCard 
                key={item.id}
                name={item.name} 
                breed={item.breed} 
                age={item.age} 
                image={item.image}
                onPress={() => {}}
              />
            ))}
          </View>
        );
      case 'Lamaran':
        return (
          <View style={styles.listContainer}>
             {MOCK_LAMARAN.map((item) => (
              <ActionListItem key={item.id} {...item} />
             ))}
          </View>
        );
      case 'Donasi':
        return (
          <View style={styles.listContainer}>
            {MOCK_DONASI.map((item) => (
              <ActionListItem key={item.id} {...item} />
             ))}
          </View>
        );
      case 'Inbox':
        return (
          <View style={styles.listContainer}>
            {MOCK_INBOX.map((item) => (
              <ActionListItem key={item.id} {...item} />
             ))}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Profil Saya</Text>
          <TouchableOpacity>
            <Ionicons name="settings-outline" size={24} color={Colors.text} />
          </TouchableOpacity>
        </View>

        {/* User Info */}
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
             <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1780&auto=format&fit=crop' }} 
              style={styles.avatar} 
            />
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.primary} />
            </View>
          </View>
          
          <Text style={styles.userName}>Rabbani Ez</Text>
          <Text style={styles.userRole}>Cat Lover & Adopter</Text>
          
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Profil</Text>
          </TouchableOpacity>
        </View>

        {/* Statistics */}
        <ProfileStats />

        {/* Dynamic Tabs */}
        <ProfileTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Content Area */}
        <View style={styles.contentArea}>
          {renderContent()}
        </View>
        
        {/* Padding for bottom nav */}
        {/* <View style={{ height: 100 }} />  <-- Removed in favor of contentContainerStyle */}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  userRole: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  editButton: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  editButtonText: {
    color: Colors.primary,
    fontWeight: '600',
    fontSize: 14,
  },
  contentArea: {
    paddingHorizontal: 20,
  },
  listContainer: {
    gap: 0,
  },
});
