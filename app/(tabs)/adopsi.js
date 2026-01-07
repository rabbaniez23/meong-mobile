import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Text,
  Animated,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Input from "../../components/ui/Input";
import ListingCard from "../../components/ListingCard";
import FilterBar from "../../components/FilterBar";
import CustomHeader from "../../components/CustomHeader";
import { adoptionService } from "../../lib/services";

// Fallback Dummy Data (used when API fails or for development)
const FALLBACK_DATA = [
  {
    id: "1",
    name: "Hattoo",
    breed: "Domestik",
    age: "1 Thn",
    gender: "Jantan",
    location: "Bandung",
    image: require("../../assets/Hatto.jpeg"),
    description: "Kucing aktif suka main tali. Vaksin lengkap.",
    user: { name: "Rani K." },
    status: "available",
  },
  {
    id: "2",
    name: "Abu",
    breed: "Anggora Mix",
    age: "5 Bln",
    gender: "Betina",
    location: "Jakarta",
    image: require("../../assets/Abu.jpeg"),
    description: "Pemalu tapi manja.",
    user: { name: "Dedi S." },
    status: "adopted",
  },
  {
    id: "3",
    name: "Oyen",
    breed: "Tabby",
    age: "2 Thn",
    gender: "Jantan",
    location: "Surabaya",
    image: require("../../assets/Oyen.jpeg"),
    description: "Raja makan, badan gembul.",
    user: { name: "Meong Shelter" },
    status: "available",
  },
];

export default function AdopsiScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [adoptionData, setAdoptionData] = useState(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchAdoptions();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const fetchAdoptions = async () => {
    try {
      const data = await adoptionService.getAll();
      if (data && data.length > 0) {
        // Transform API data to match component expectations
        const transformed = data.map((item) => ({
          ...item,
          image: item.images?.[0]?.imageUrl
            ? { uri: item.images[0].imageUrl }
            : require("../../assets/kucing.png"),
          user: { name: "User" }, // Will be populated properly later
        }));
        setAdoptionData(transformed);
      }
    } catch (error) {
      console.log("Using fallback data:", error.message);
      // Keep fallback data on error
    } finally {
      setLoading(false);
    }
  };

  const filteredData = adoptionData.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.breed.toLowerCase().includes(search.toLowerCase());

    // Filter Logic
    if (filter === "Semua") return matchesSearch;
    if (filter === "Kitten") return matchesSearch && item.age.includes("Bln");
    if (filter === "Jantan" || filter === "Betina")
      return matchesSearch && item.gender === filter;

    return matchesSearch;
  });

  const goToDetail = (item) => {
    router.push({
      pathname: "/(tabs)/adopsi-detail",
      params: { catData: JSON.stringify(item) },
    });
  };

  const renderItem = ({ item }) => (
    <ListingCard
      name={item.name}
      breed={item.breed}
      age={item.age}
      gender={item.gender}
      image={item.image}
      status={item.status} // Pass status
      onPress={() => goToDetail(item)}
    />
  );

  return (
    <View style={styles.container}>
      <CustomHeader
        title="Adopsi"
        leftIcon="chatbubbles-outline"
        onLeftPress={() => router.push("/chat-list")}
        rightIcon="notifications-outline"
        onRightPress={() => router.push("/notifications")}
      />

      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.searchContainer}>
          <View style={styles.searchWrapper}>
            <Input
              placeholder="Cari ras, nama, atau lokasi..."
              icon="search"
              value={search}
              onChangeText={setSearch}
              style={{ borderWidth: 0, backgroundColor: "transparent" }}
            />
          </View>
        </View>

        <View style={{ marginBottom: 15 }}>
          <FilterBar
            filters={["Semua", "Kitten", "Jantan", "Betina"]}
            activeFilter={filter}
            onSelect={setFilter}
          />
        </View>

        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      </Animated.View>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/add-adopsi")}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={32} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  content: {
    flex: 1,
    paddingTop: 10,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 5,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    paddingTop: 10,
  },
  row: {
    justifyContent: "space-between",
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...Colors.shadow,
    elevation: 8,
  },
});
