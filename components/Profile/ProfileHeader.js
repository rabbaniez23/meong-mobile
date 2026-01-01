import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileHeader({ user, onEdit }) {
  return (
    <View style={styles.card}>
      {/* Settings Action */}
      <TouchableOpacity style={styles.settingsBtn} onPress={onEdit}>
          <Ionicons name="settings-outline" size={22} color={Colors.text} />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.avatarContainer}>
            <Image source={user.avatar} style={styles.avatar} />
            <View style={styles.roleBadge}>
                <Ionicons name="paw" size={12} color={Colors.white} />
                <Text style={styles.roleText}>{user.role}</Text>
            </View>
        </View>
        
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
        
        {/* Quote / Motivation */}
        <View style={styles.quoteBox}>
            <Text style={styles.quote}>"{user.motivation}"</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    ...Colors.shadow,
    elevation: 4,
    marginBottom: 20,
    position: 'relative',
    overflow: 'hidden',
  },
  settingsBtn: {
      position: 'absolute',
      top: 16,
      right: 16,
      zIndex: 10,
      padding: 8,
      backgroundColor: '#F5F5F5',
      borderRadius: 20,
  },
  content: {
    alignItems: 'center',
    padding: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
    ...Colors.shadow,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: Colors.primary,
  },
  roleBadge: {
    position: 'absolute',
    bottom: -8,
    alignSelf: 'center',
    backgroundColor: Colors.secondary,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 2,
    borderColor: Colors.white,
  },
  roleText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  name: {
    fontSize: 22,
    fontWeight: '800', // Premium Bold
    color: Colors.secondary,
    marginTop: 10,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  quoteBox: {
    backgroundColor: '#F0F5E5',
    padding: 12,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  quote: {
    fontSize: 13,
    fontStyle: 'italic',
    color: Colors.secondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});
