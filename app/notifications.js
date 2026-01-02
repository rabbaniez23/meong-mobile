import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import ScreenWrapper from '../components/ui/ScreenWrapper';

const NOTIFICATIONS = [
    {
        id: '1',
        type: 'ADOPTION', // New Cat
        user: { name: 'Meong Shelter', avatar: null },
        title: 'Kucing Baru Tersedia!',
        message: 'Kucing Persia "Luna" siap diadopsi. Cek sekarang sebelum keduluan!',
        time: 'Baru saja',
        read: false,
        image: require('../assets/Hatto.jpeg'),
        action: '/(tabs)/adopsi' 
    },
    {
        id: '4',
        type: 'SYSTEM', // Request Accepted
        user: { name: 'System', avatar: null },
        title: 'Adopsi Disetujui',
        message: 'Selamat! Pengajuan adopsi kamu untuk "Miko" telah disetujui.',
        time: '1h',
        read: true,
        image: require('../assets/Miko.jpeg'),
        action: '/chat-room?userName=MeongShelter&context=Adopsi%20Miko&initialMessage=Terima%20kasih%20telah%20menyetujui!'
    },
    {
        id: '3',
        type: 'LOST', // Lost Cat
        user: { name: 'Budi Santoso', avatar: null },
        title: 'Seseorang Melapor!',
        message: 'Asep melaporkan melihat kucing hilangmu "Mochi". Lihat detailnya.',
        time: '2j',
        read: true,
        image: require('../assets/Putih.jpeg'),
        action: '/(tabs)/profil' // Direct to profiling requests/reports tab
    },
];

export default function NotificationsScreen() {
    const router = useRouter();
    const [notifs, setNotifs] = useState(NOTIFICATIONS);

    const markAsRead = (id, action) => {
        setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        if (action) {
            // Check if action is a chat link with params or simple path
            if (action.includes('?')) {
                // primitive parsing for demo
                const [pathname, queryString] = action.split('?');
                const params = {};
                queryString.split('&').forEach(part => {
                    const [key, val] = part.split('=');
                    params[key] = decodeURIComponent(val);
                });
                router.push({ pathname, params });
            } else {
                router.push(action);
            }
        }
    };

    const getIcon = (type) => {
        switch (type) {
            case 'ADOPTION': return 'paw';
            case 'LOST': return 'alert-circle';
            case 'COMMUNITY': return 'chatbubbles';
            case 'DONATION': return 'heart';
            case 'SYSTEM': return 'checkmark-circle';
            default: return 'notifications';
        }
    };

    const getColor = (type) => {
        switch (type) {
            case 'ADOPTION': return Colors.secondary;
            case 'LOST': return Colors.error;
            case 'COMMUNITY': return '#2196F3';
            case 'DONATION': return '#E91E63';
            case 'SYSTEM': return Colors.primary;
            default: return '#666';
        }
    };

    return (
        <ScreenWrapper>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={Colors.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifikasi</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.list}>
                <Text style={styles.sectionHeader}>Hari Ini</Text>
                
                {notifs.map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={[styles.item, !item.read && styles.unreadItem]}
                        onPress={() => markAsRead(item.id, item.action)}
                        activeOpacity={0.7}
                    >
                        {/* Avatar / Icon */}
                        <View style={styles.avatarContainer}>
                            {item.image ? (
                                <Image source={item.image} style={styles.avatarImg} />
                            ) : (
                                <View style={[styles.avatarPlaceholder, { backgroundColor: getColor(item.type) + '20' }]}>
                                    <Ionicons name={getIcon(item.type)} size={24} color={getColor(item.type)} />
                                </View>
                            )}
                            {/* Small Badge Icon overlay */}
                            <View style={[styles.typeBadge, { backgroundColor: getColor(item.type) }]}>
                                <Ionicons name={getIcon(item.type)} size={10} color={Colors.white} />
                            </View>
                        </View>

                        {/* Content */}
                        <View style={styles.content}>
                            <View style={styles.rowTop}>
                                <Text style={styles.itemTitle}>{item.title}</Text>
                                <Text style={styles.time}>{item.time}</Text>
                            </View>
                            <Text style={styles.message} numberOfLines={2}>
                                {item.message}
                            </Text>
                        </View>

                        {/* Unread Dot */}
                        {!item.read && <View style={styles.blueDot} />}
                    </TouchableOpacity>
                ))}

                <Text style={[styles.sectionHeader, { marginTop: 20 }]}>Minggu Lalu</Text>
                <View style={styles.emptyState}>
                    <Text style={styles.emptyText}>Tidak ada notifikasi lama.</Text>
                </View>

            </ScrollView>
        </ScreenWrapper>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: Colors.text,
    },
    list: {
        paddingBottom: 40,
    },
    sectionHeader: {
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.text,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: Colors.white,
    },
    unreadItem: {
        backgroundColor: '#F0F9FF', // Subtle blue tint for unread
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 15,
    },
    avatarImg: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarPlaceholder: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    typeBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 18,
        height: 18,
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1.5,
        borderColor: Colors.white,
    },
    content: {
        flex: 1,
    },
    rowTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 4,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: Colors.text,
    },
    time: {
        fontSize: 12,
        color: '#999',
    },
    message: {
        fontSize: 13,
        color: '#555',
        lineHeight: 18,
    },
    blueDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#2196F3',
        marginLeft: 10,
    },
    emptyState: { alignItems: 'center', padding: 20 },
    emptyText: { color: '#999', fontStyle: 'italic' },
});
