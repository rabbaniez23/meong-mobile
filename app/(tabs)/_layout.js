import { Tabs } from 'expo-router';
import { Colors } from '../../constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary, // Ganti jadi secondary (Hijau Tua) biar lebih tegas
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopWidth: 1,
          borderTopColor: '#F0F0F0',
          height: 84, 
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginBottom: 10,
        },
      }}
    >
      {/* 1. ADOPSI */}
      <Tabs.Screen
        name="adopsi"
        options={{
          title: 'Adopsi',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'paw' : 'paw-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 2. LAPOR */}
      <Tabs.Screen
        name="hilang"
        options={{
          title: 'Lapor',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'megaphone' : 'megaphone-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 3. DONASI */}
      <Tabs.Screen
        name="donasi"
        options={{
          title: 'Donasi',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'heart' : 'heart-outline'} size={24} color={color} />
          ),
        }}
      />

      {/* 4. PROFIL */}
      <Tabs.Screen
        name="profil"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'person' : 'person-outline'} size={24} color={color} />
          ),
        }}
      />
      
      {/* --- HALAMAN YANGDISEMBUNYIKAN DARI MENU (href: null) --- */}
      
      {/* Detail Adopsi (Disembunyikan) */}
      <Tabs.Screen 
        name="adopsi-detail" 
        options={{ 
          href: null, // Ini kuncinya: null artinya tombolnya hilang
        }} 
      />

      {/* Detail Hilang (Disembunyikan) */}
      <Tabs.Screen 
        name="hilang-detail" 
        options={{ 
          href: null, 
        }} 
      />

      {/* Sembunyikan index jika ada sisa */}
      <Tabs.Screen name="index" options={{ href: null }} /> 
    </Tabs>
  );
}