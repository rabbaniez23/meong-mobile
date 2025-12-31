import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function CatCard({ name, breed, age, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Gambar dengan Tinggi Tetap (Fixed Height) */}
      <Image source={{ uri: image }} style={styles.image} />
      
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Ionicons name="male-female" size={14} color={Colors.primary} />
        </View>
        <Text style={styles.breed} numberOfLines={1}>{breed}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.age}>{age}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden', // Biar gambar gak keluar radius
    flex: 1, // Penting buat Grid
  },
  image: {
    width: '100%',
    height: 140, // KUNCI: Tinggi gambar dipaksa sama semua
    resizeMode: 'cover',
    backgroundColor: '#eee',
  },
  infoContainer: {
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    flex: 1, // Biar teks panjang otomatis kepotong (...)
    marginRight: 4,
  },
  breed: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  age: {
    fontSize: 11,
    color: Colors.primary,
    fontWeight: '600',
    backgroundColor: '#F0F5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
});