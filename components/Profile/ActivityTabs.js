import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ActivityTabs({ activeTab, setActiveTab }) {
  const tabs = ['Riwayat Adopsi', 'Permintaan', 'Laporan Saya', 'Donasi'];

  return (
    <View style={styles.container}>
      <View style={styles.segmentContainer}>
          {tabs.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                    key={tab}
                    style={[styles.tab, isActive && styles.activeTab]}
                    onPress={() => setActiveTab(tab)}
                    activeOpacity={0.8}
                >
                    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                        {tab}
                    </Text>
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
      backgroundColor: '#EEE',
      borderRadius: 12,
      padding: 4,
  },
  tab: {
      flex: 1,
      paddingVertical: 10,
      alignItems: 'center',
      borderRadius: 10,
  },
  activeTab: {
      backgroundColor: Colors.white,
      ...Colors.shadow,
      elevation: 2,
  },
  tabText: {
      fontSize: 12,
      fontWeight: '600',
      color: '#888',
  },
  activeTabText: {
      color: Colors.secondary,
      fontWeight: 'bold',
  },
});
