import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ActivityTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: 'Riwayat Adopsi', icon: 'paw' },
    { id: 'Permintaan', icon: 'mail-unread' },
    { id: 'Laporan Saya', icon: 'megaphone' },
    { id: 'Donasi', icon: 'heart' }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
          {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <TouchableOpacity
                    key={tab.id}
                    style={[styles.tab, isActive && styles.activeTab]}
                    onPress={() => setActiveTab(tab.id)}
                    activeOpacity={0.8}
                >
                    <Ionicons 
                        name={isActive ? tab.icon : `${tab.icon}-outline`} 
                        size={24} 
                        color={isActive ? Colors.secondary : '#999'} 
                    />
                </TouchableOpacity>
              );
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  segmentContainer: {
      flexDirection: 'row',
      backgroundColor: '#F5F5F5',
      borderRadius: 16,
      padding: 6,
      justifyContent: 'space-between'
  },
  tab: {
      flex: 1,
      paddingVertical: 12,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
  },
  activeTab: {
      backgroundColor: Colors.white,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
  },
});
