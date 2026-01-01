import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import Badge from './ui/Badge';

const { width } = Dimensions.get('window');

export default function FeedCard({ 
  user = { name: 'User', avatar: null }, 
  time, 
  status, // 'Adoption' | 'Lost' | 'Found'
  image, 
  title, 
  details, 
  description, 
  onPress,
  onActionPress
}) {
  const isLost = status === 'Lost' || status === 'Dicari';

  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.95}>
      {/* Header: User Info */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
            <Image 
                source={user.avatar || require('../assets/icon.png')} 
                style={styles.avatar} 
            />
            <View>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.time}>{time}</Text>
            </View>
        </View>
        <Badge 
            text={status} 
            variant={isLost ? 'error' : 'success'} 
        />
      </View>

      {/* Media Content */}
      <Image source={image} style={styles.postImage} />

      {/* Action Bar */}
      <View style={styles.actionBar}>
         <View style={styles.actionLeft}>
            <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="heart-outline" size={24} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="chatbubble-outline" size={22} color={Colors.text} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconBtn}>
                <Ionicons name="paper-plane-outline" size={22} color={Colors.text} />
            </TouchableOpacity>
         </View>
         <TouchableOpacity style={styles.callBtn} onPress={onActionPress}>
             <Ionicons name={isLost ? "eye-outline" : "paw-outline"} size={20} color={Colors.white} />
             <Text style={styles.callText}>{isLost ? "Saya Melihat!" : "Adopsi"}</Text>
         </TouchableOpacity>
      </View>

      {/* Body Text */}
      <View style={styles.body}>
         <Text style={styles.title}>{title}</Text>
         <Text style={styles.details}>{details}</Text>
         <Text style={styles.description} numberOfLines={2}>
             <Text style={styles.userName}>{user.name} </Text>
             {description}
         </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    marginBottom: 20,
    borderRadius: 0, // Edge-to-edge aesthetics functionality usually implies 0, but let's do safe rounded
    // To make it look "Instagram" like, usually full width or slightly rounded.
    // Let's go with slightly rounded for modern feel but full width visually in list.
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    paddingBottom: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EEE',
  },
  userName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.text,
  },
  time: {
    fontSize: 11,
    color: '#888',
  },
  postImage: {
    width: width,
    height: width, // 1:1 Aspect Ratio
    resizeMode: 'cover',
  },
  actionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  actionLeft: {
    flexDirection: 'row',
    gap: 16,
  },
  iconBtn: {
      padding: 4,
  },
  callBtn: {
      backgroundColor: Colors.secondary,
      paddingVertical: 6,
      paddingHorizontal: 14,
      borderRadius: 20,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
  },
  callText: {
      color: Colors.white,
      fontSize: 12,
      fontWeight: 'bold',
  },
  body: {
      paddingHorizontal: 12,
  },
  title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.text,
      marginBottom: 2,
  },
  details: {
      fontSize: 12,
      color: Colors.secondary,
      fontWeight: '600',
      marginBottom: 6,
  },
  description: {
      fontSize: 14,
      color: '#444',
      lineHeight: 20,
  },
});
