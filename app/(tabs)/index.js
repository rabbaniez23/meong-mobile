import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../constants/Colors'; // Pastikan file Colors.js sudah ada

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halo, Meong! 🐾</Text>
      <Text style={styles.subtitle}>Ini halaman Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background, // Warna krem dari style guide
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.secondary, // Hijau tua
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.text,
  },
});