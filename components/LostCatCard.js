import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function LostCatCard({ name, reward, location, date, image, onContact }) {
  return (
    <View style={styles.card}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <View style={styles.badge}>
          <Text style={styles.badgeText}>DICARI</Text>
        </View>
      </View>
      
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
        
        {reward && (
          <View style={styles.rewardContainer}>
            <Ionicons name="cash-outline" size={16} color={Colors.error} />
            <Text style={styles.rewardText}>Imbalan: {reward}</Text>
          </View>
        )}

        <View style={styles.locationContainer}>
          <Ionicons name="location-sharp" size={16} color="#666" />
          <Text style={styles.locationText}>{location}</Text>
        </View>

        <TouchableOpacity style={styles.contactButton} onPress={onContact}>
          <Ionicons name="logo-whatsapp" size={18} color="white" />
          <Text style={styles.contactButtonText}>Hubungi Pemilik</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: Colors.error, // Reddish shadow for urgency
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#FFEAEA', // Subtle red border
  },
  imageContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: Colors.error,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  content: {
    padding: 16,
  },
  header: {
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
  date: {
    fontSize: 12,
    color: '#888',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#FFEBEE',
    padding: 6,
    borderRadius: 6,
    alignSelf: 'flex-start',
    gap: 4,
  },
  rewardText: {
    color: Colors.error,
    fontWeight: 'bold',
    fontSize: 14,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 4,
  },
  locationText: {
    color: '#666',
    fontSize: 14,
    flex: 1,
  },
  contactButton: {
    backgroundColor: '#25D366', // WhatsApp Green
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
