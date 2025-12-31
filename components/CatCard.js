import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function CatCard({ name, breed, age, image, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Gambar Kucing */}
      <Image source={{ uri: image }} style={styles.image} />
      
      {/* Info Kucing */}
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.name}>{name}</Text>
          <Ionicons name="male-female" size={16} color={Colors.primary} />
        </View>
        <Text style={styles.breed}>{breed}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.age}>{age}</Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Detail</Text>
          </View>
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
    flexDirection: 'row', // Biar gambar di kiri, teks di kanan
    padding: 10,
    elevation: 2, // Bayangan di Android
    shadowColor: '#000', // Bayangan di iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 12,
    backgroundColor: '#eee',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
  breed: {
    fontSize: 14,
    color: '#888',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  age: {
    fontSize: 12,
    color: Colors.primary,
    fontWeight: '600',
    backgroundColor: '#F0F5E5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  button: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});