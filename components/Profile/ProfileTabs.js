import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../constants/Colors';

export default function ProfileTabs({ activeTab, setActiveTab }) {
  const tabs = ['Riwayat Adopsi', 'Riwayat Donasi', 'Tentang'];

  return (
    <View style={styles.container}>
       {tabs.map((tab) => {
          const isActive = activeTab === tab;
          return (
            <TouchableOpacity
              key={tab}
              style={[styles.tabButton, isActive && styles.activeTabButton]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {tab}
              </Text>
              {isActive && <View style={styles.indicator} />}
            </TouchableOpacity>
          );
        })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
    position: 'relative',
  },
  activeTabButton: {
    // backgroundColor: '#F9F9F9',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    width: '40%',
    height: 3,
    backgroundColor: Colors.secondary,
    borderRadius: 3,
  },
});
