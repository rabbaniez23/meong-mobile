import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function ListingCard({ name, breed, age, gender, image, status, onPress }) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
      setIsSaved(!isSaved);
      // Logic for saving to "Favorites" would go here (Context/Redux)
  };

  return (
    <TouchableOpacity style={[styles.card, status === 'adopted' && styles.cardInactive]} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
          <Image source={image} style={[styles.image, status === 'adopted' && styles.imageInactive]} />
          
          {/* Status Overlay */}
          {status === 'adopted' && (
              <View style={styles.adoptedOverlay}>
                  <Text style={styles.adoptedText}>ADOPTED</Text>
              </View>
          )}

          {/* Save Button */}
          <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
              <Ionicons name={isSaved ? "heart" : "heart-outline"} size={20} color={isSaved ? Colors.error : 'white'} />
          </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.header}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Ionicons 
            name={gender === 'Jantan' ? 'male' : 'female'} 
            size={16} 
            color={gender === 'Jantan' ? '#1976D2' : '#F57C00'} 
          />
        </View>
        <Text style={styles.breed} numberOfLines={1}>{breed}</Text>
        
        <View style={styles.footer}>
          <Text style={styles.age}>{age}</Text>
          {status === 'adopted' ? (
               <Text style={[styles.statusText, { color: Colors.success }]}>• Teradopsi</Text>
          ) : (
               <Text style={[styles.statusText, { color: Colors.primary }]}>• Tersedia</Text>
          )}
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
    width: '48%', // Adjusted for 2 column layout consistency
    ...Colors.shadow,
    overflow: 'hidden',
  },
  cardInactive: {
      opacity: 0.8,
      backgroundColor: '#F5F5F5',
  },
  imageContainer: {
      height: 140,
      width: '100%',
      position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageInactive: {
      opacity: 0.6,
  },
  adoptedOverlay: {
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
  },
  adoptedText: {
      color: 'white',
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 1,
      transform: [{ rotate: '-15deg' }],
      borderWidth: 2,
      borderColor: 'white',
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 8,
  },
  saveBtn: {
      position: 'absolute',
      top: 10,
      right: 10,
      width: 30,
      height: 30,
      borderRadius: 15,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignItems: 'center',
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
    flex: 1, 
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
    gap: 5,
  },
  age: {
    fontSize: 10,
    color: '#555',
    backgroundColor: '#F0F5E5',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    overflow: 'hidden',
  },
  statusText: {
      fontSize: 10,
      fontWeight: 'bold',
  }
});
