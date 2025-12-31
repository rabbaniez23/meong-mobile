import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '../../constants/Colors';
import CatCard from '../../components/CatCard';

const ADOPSI_DATA = [
  { id: '1', name: 'Miko', breed: 'Kucing Kampung', age: '1th', image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1887&auto=format&fit=crop' },
  { id: '2', name: 'Luna', breed: 'Anggora', age: '2th', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop' },
  { id: '3', name: 'Simba', breed: 'Domestik', age: '5bln', image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=2030&auto=format&fit=crop' },
  { id: '4', name: 'Nala', breed: 'Persia', age: '3th', image: 'https://images.unsplash.com/photo-1495360019602-e0019216774a?q=80&w=2070&auto=format&fit=crop' },
  { id: '5', name: 'Leo', breed: 'Munchkin', age: '1th', image: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=1935&auto=format&fit=crop' },
  { id: '6', name: 'Milo', breed: 'British Shorthair', age: '2th', image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=2070&auto=format&fit=crop' },
];

const CATEGORIES = ['Semua', 'Kitten', 'Dewasa', 'Jantan', 'Betina'];

export default function AdopsiScreen() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('Semua');

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>Cari Teman Baru</Text>
        <TouchableOpacity style={styles.filterBtn}>
          <Ionicons name="filter" size={20} color={Colors.secondary} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.categoryContainer}
      >
        {CATEGORIES.map((cat, index) => (
          <TouchableOpacity 
            key={index} 
            style={[
              styles.categoryPill, 
              activeCategory === cat && styles.activeCategoryPill
            ]}
            onPress={() => setActiveCategory(cat)}
          >
            <Text style={[
              styles.categoryText, 
              activeCategory === cat && styles.activeCategoryText
            ]}>
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={ADOPSI_DATA}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <CatCard 
              name={item.name} 
              breed={item.breed} 
              age={item.age} 
              image={item.image}
              onPress={() => {}}
            />
          </View>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContainer}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => router.push('/post-adopsi')}
      >
        <Ionicons name="add" size={30} color="#FFF" />
      </TouchableOpacity>
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
    paddingTop: 10,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary,
  },
  filterBtn: {
    padding: 8,
    borderRadius: 50,
    backgroundColor: Colors.white,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeCategoryPill: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    color: Colors.text,
    fontWeight: '600',
  },
  activeCategoryText: {
    color: Colors.white,
  },
  listContainer: {
    paddingHorizontal: 12, // Reduced padding to fit 2 columns better
    paddingBottom: 120, // Bottom Tab padding
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 0, // Card component already has margin
  },
  cardWrapper: {
    flex: 1,
    marginHorizontal: 8, // Gap between columns
    maxWidth: '46%', // Force 2 column width
  },
  fab: {
    position: 'absolute',
    bottom: 110, // Above bottom tabs
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});