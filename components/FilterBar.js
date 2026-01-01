import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';

export default function FilterBar({ filters, activeFilter, onSelect }) {
  return (
    <View style={styles.container}>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filters.map((filter) => {
          const isActive = activeFilter === filter;
          return (
            <TouchableOpacity
              key={filter}
              style={[
                styles.chip,
                isActive && styles.activeChip,
              ]}
              onPress={() => onSelect(filter)}
            >
              <Text style={[styles.text, isActive && styles.activeText]}>
                {filter}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 20,
    gap: 10,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  activeChip: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  text: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  activeText: {
    color: Colors.white,
  },
});
