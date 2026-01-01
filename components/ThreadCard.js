import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ThreadCard({ 
  user = { name: 'User', avatar: null }, 
  time, 
  content, 
  image, 
  likes, 
  comments, 
  category, // New Prop
  onPress 
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {/* Left Column: Avatar */}
      <View style={styles.leftCol}>
        <Image 
            source={user.avatar || require('../assets/icon.png')} 
            style={styles.avatar} 
        />
      </View>

      {/* Right Column: Content */}
      <View style={styles.rightCol}>
        {/* Header */}
        <View style={styles.header}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                 <Text style={styles.name} numberOfLines={1}>{user.name}</Text>
                 <Text style={styles.dot}>·</Text>
                 <Text style={styles.time}>{time}</Text>
            </View>
            {/* Category Badge */}
            {category && (
                <View style={[styles.badge, styles.getBadgeColor(category)]}>
                    <Text style={styles.badgeText}>{category}</Text>
                </View>
            )}
        </View>

        {/* Content */}
        <Text style={styles.content}>{content}</Text>
        
        {/* Optional Image */}
        {image && (
            <Image source={image} style={styles.postImage} />
        )}

        {/* Action Bar */}
        <View style={styles.actionBar}>
            <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="chatbubble-outline" size={18} color="#888" />
                <Text style={styles.actionText}>{comments}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="repeat-outline" size={18} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="heart-outline" size={18} color="#888" />
                <Text style={styles.actionText}>{likes}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn}>
                <Ionicons name="share-social-outline" size={18} color="#888" />
            </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  // ... Helper function for styles not standard in stylesheet but used in render
  // We can't put function in StyleSheet, so we put it outside or use logic in render.
  // For simplicity, let's just use conditional styles in render? 
  // Actually, let's keep it simple.
  
  container: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    backgroundColor: Colors.white,
  },
  getBadgeColor: (cat) => {
      switch(cat) {
          case 'Kesehatan': return { backgroundColor: '#E3F2FD' }; // Blue
          case 'Event': return { backgroundColor: '#E8F5E9' }; // Green
          case 'Tips': return { backgroundColor: '#FFF3E0' }; // Orange
          default: return { backgroundColor: '#F3E5F5' }; // Purple
      }
  },
  badge: {
     paddingHorizontal: 8,
     paddingVertical: 2,
     borderRadius: 8,
     marginLeft: 6,
  },
  badgeText: {
      fontSize: 10,
      fontWeight: 'bold',
      color: '#555',
  },
  leftCol: {
      marginRight: 12,
  },
  avatar: {
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: '#EEE',
  },
  rightCol: {
      flex: 1,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
  },
  name: {
      fontSize: 15,
      fontWeight: 'bold',
      color: Colors.text,
      marginRight: 4,
      maxWidth: 120, // Prevent name from pushing time off screen
  },
  username: {
      fontSize: 14,
      color: '#888',
      marginRight: 4,
      flex: 1, // Let username shrink if needed
  },
  dot: {
      fontSize: 14,
      color: '#888',
      marginRight: 4,
  },
  time: {
      fontSize: 14,
      color: '#888',
  },
  content: {
      fontSize: 15,
      color: Colors.text,
      lineHeight: 22,
      marginBottom: 10,
  },
  postImage: {
      width: '100%',
      height: 180,
      borderRadius: 16,
      marginBottom: 12,
      resizeMode: 'cover',
      borderWidth: 1,
      borderColor: '#F0F0F0',
  },
  actionBar: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      maxWidth: '90%',
  },
  actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
  },
  actionText: {
      fontSize: 13,
      color: '#888',
  },
});
