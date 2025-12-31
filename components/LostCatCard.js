import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function LostCatCard({ name, reward, location, date, image, onFoundPress }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.badge}>
        <Text style={styles.badgeText}>DICARI</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.reward}>{reward}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.infoText} numberOfLines={1}>{location}</Text>
        </View>
        
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={16} color="#666" />
          <Text style={styles.infoText}>{date}</Text>
        </View>

        {/* Tombol Lapor Temuan */}
        <TouchableOpacity style={styles.foundBtn} onPress={onFoundPress}>
          <Ionicons name="eye" size={20} color="white" />
          <Text style={styles.foundText}>Saya Menemukan!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#FFE0E0', // Outline kemerahan tipis
  },
  image: {
    width: '100%',
    height: 200, // Gambar lebih besar biar jelas
    resizeMode: 'cover',
  },
  badge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#FF4D4D', // Merah terang
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  content: {
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
  },
  reward: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#D32F2F', // Merah tua untuk uang
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  infoText: {
    marginLeft: 6,
    color: '#555',
    fontSize: 14,
    flex: 1,
  },
  foundBtn: {
    marginTop: 15,
    backgroundColor: Colors.secondary, // Pakai Hijau Tua atau Warna Kontras
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  foundText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  }
});