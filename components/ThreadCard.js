import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ThreadCard({ 
  user = { name: 'User', avatar: null }, 
  time, 
  content, 
  image, 
  likes = 0, 
  comments = 0, 
  category, 
  onCommentPress, // Specific handler for Comment
  onSharePress,   // Specific handler for Share
}) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <View style={styles.container}>
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
            {/* 1. Comment Button */}
            <TouchableOpacity style={styles.actionBtn} onPress={onCommentPress}>
                <Ionicons name="chatbubble-outline" size={20} color="#888" />
                <Text style={styles.actionText}>{comments}</Text>
            </TouchableOpacity>
            
            {/* 2. Like Button */}
            <TouchableOpacity style={styles.actionBtn} onPress={handleLike}>
                <Ionicons 
                  name={isLiked ? "heart" : "heart-outline"} 
                  size={20} 
                  color={isLiked ? Colors.error : "#888"} 
                />
                <Text style={[styles.actionText, isLiked && { color: Colors.error }]}>
                  {likeCount}
                </Text>
            </TouchableOpacity>

            {/* 3. Share Button - Retweet removed */}
            <TouchableOpacity style={styles.actionBtn} onPress={onSharePress}>
                <Ionicons name="share-social-outline" size={20} color="#888" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
      maxWidth: 120, 
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
      paddingRight: 40, // More concise spacing
      marginTop: 5,
  },
  actionBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 6,
      padding: 5, // Hit slop
  },
  actionText: {
      fontSize: 13,
      color: '#888',
  },
});
