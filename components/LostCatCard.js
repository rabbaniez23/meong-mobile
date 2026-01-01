import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Badge from './ui/Badge';

export default function LostCatCard({ name, lastSeen, location, image, onPress, ...props }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.badgeContainer}>
             <Badge text="Dicari" variant="error" />
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.lastSeen}>🕒 {lastSeen}</Text>
        </View>

        <View style={styles.locationRow}>
          <Ionicons name="location" size={16} color={Colors.secondary} />
          <Text style={styles.location} numberOfLines={1}>{location}</Text>
        </View>
        
        {/* Description & Reward */}
        {props.description && (
             <Text style={styles.description} numberOfLines={2}>{props.description}</Text>
        )}
        
        {props.reward && (
            <View style={styles.rewardContainer}>
                <Ionicons name="gift-outline" size={14} color="#D32F2F" />
                <Text style={styles.rewardText}>Imbalan: {props.reward}</Text>
            </View>
        )}

        <View style={styles.footer}>
            <Text style={styles.detailsLink}>Lihat Detail</Text>
            <Ionicons name="chevron-forward" size={16} color={Colors.primary} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    marginBottom: 16,
    ...Colors.shadow,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F5F5F5',
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  badgeContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  lastSeen: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderTopWidth: 1,
      borderTopColor: '#F0F0F0',
      paddingTop: 12,
  },
  detailsLink: {
      fontSize: 14,
      fontWeight: 'bold',
      color: Colors.primary,
  },
  description: {
      fontSize: 13,
      color: '#555',
      marginBottom: 10,
      lineHeight: 18,
  },
  rewardContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFEBEE',
      alignSelf: 'flex-start',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      marginBottom: 12,
      gap: 4,
  },
  rewardText: {
      fontSize: 12,
      color: '#D32F2F',
      fontWeight: 'bold',
  }
});