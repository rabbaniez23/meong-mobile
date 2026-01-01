import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2; // 20px padding left/right + 20px gap

export default function ListingCard({ name, breed, age, image, gender, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} />
          <View style={styles.badge}>
              <Text style={styles.badgeText}>{age}</Text>
          </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Ionicons 
                name={gender === 'Jantan' ? 'male' : 'female'} 
                size={14} 
                color={gender === 'Jantan' ? '#1976D2' : '#F57C00'} 
            />
        </View>
        <Text style={styles.breed} numberOfLines={1}>{breed}</Text>
        
        <View style={styles.footer}>
            <Text style={styles.adoptText}>Adopsi</Text>
            <Ionicons name="arrow-forward-circle" size={20} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 20,
    ...Colors.shadow,
    elevation: 3,
  },
  imageContainer: {
    width: '100%',
    height: CARD_WIDTH, // Square image
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  badgeText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  content: {
    padding: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1,
    marginRight: 5,
  },
  breed: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#F5F5F5',
      paddingTop: 8,
  },
  adoptText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: Colors.primary,
  }
});
