import React, { useState, useEffect, useRef } from 'react';
import { 
    View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, 
    Image, KeyboardAvoidingView, Platform, 
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomHeader from '../components/CustomHeader';

const MOCK_MESSAGES = [
    { id: '1', text: "Halo, saya melihat laporan kamu tentang Mochi.", sender: 'other', time: '10:00' },
    { id: '2', text: "Iya, apakah kamu melihatnya?", sender: 'me', time: '10:05' },
    { id: '3', text: "Sepertinya saya melihat kucing mirip Mochi di dekat taman Lansia tadi pagi.", sender: 'other', time: '10:10' },
];

export default function ChatScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets(); 
    const { userName } = useLocalSearchParams(); 
    const [messages, setMessages] = useState(MOCK_MESSAGES);
    const [inputText, setInputText] = useState('');
    const flatListRef = useRef(null);

    const sendMessage = () => {
        if (inputText.trim()) {
            const newMsg = {
                id: Date.now().toString(),
                text: inputText,
                sender: 'me',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMsg]);
            setInputText('');
        }
    };

    const ChatUserInfo = (
        <TouchableOpacity style={styles.userInfo} activeOpacity={0.7}>
            <Image source={require('../assets/icon.png')} style={styles.avatar} />
            <View>
                <Text style={styles.userName}>{userName || "User"}</Text>
                <Text style={styles.userStatus}>Online</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={{ flex: 1, backgroundColor: Colors.white }}>
            <CustomHeader 
                title="" // Custom center content
                centerContent={ChatUserInfo}
                leftIcon="arrow-back"
                onLeftPress={() => router.back()}
                rightIcon="ellipsis-vertical"
                onRightPress={() => {}}
            />

            <KeyboardAvoidingView 
                style={{ flex: 1 }} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
            >
                <View style={{ flex: 1, backgroundColor: Colors.background }}>
                    {/* Chat Area */}
                    <FlatList
                        ref={flatListRef}
                        data={messages}
                        keyExtractor={item => item.id}
                        contentContainerStyle={styles.chatContainer}
                        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
                        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
                        renderItem={({ item }) => (
                            <View style={[
                                styles.messageBubble, 
                                item.sender === 'me' ? styles.myMessage : styles.otherMessage
                            ]}>
                                <Text style={[
                                    styles.messageText, 
                                    item.sender === 'me' ? styles.myText : styles.otherText
                                ]}>{item.text}</Text>
                                <Text style={[
                                     styles.timeText,
                                     item.sender === 'me' ? styles.myTime : styles.otherTime
                                ]}>{item.time}</Text>
                            </View>
                        )}
                        style={{ flex: 1 }}
                    />

                    {/* Input Area */}
                    <View style={[
                        styles.inputContainer, 
                        { paddingBottom: insets.bottom > 0 ? insets.bottom : 12 }
                    ]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Ketik pesan..."
                            value={inputText}
                            onChangeText={setInputText}
                            multiline
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage}>
                            <Ionicons name="send" size={20} color={Colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    userInfo: { flexDirection: 'row', alignItems: 'center' },
    avatar: { width: 35, height: 35, borderRadius: 17.5, marginRight: 10, backgroundColor: '#EEE', borderWidth: 1, borderColor: Colors.white },
    userName: { fontSize: 16, fontWeight: 'bold', color: Colors.white },
    userStatus: { fontSize: 12, color: '#E0E0E0' },
    
    chatContainer: { padding: 16, paddingBottom: 20 },
    messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 16, marginBottom: 10 },
    myMessage: { alignSelf: 'flex-end', backgroundColor: Colors.primary, borderBottomRightRadius: 2 },
    otherMessage: { alignSelf: 'flex-start', backgroundColor: Colors.white, borderBottomLeftRadius: 2, elevation: 2 },
    messageText: { fontSize: 15, lineHeight: 22 },
    myText: { color: Colors.white },
    otherText: { color: Colors.text },
    timeText: { fontSize: 10, marginTop: 4, alignSelf: 'flex-end' },
    myTime: { color: 'rgba(255,255,255,0.7)' },
    otherTime: { color: '#999' },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: Colors.white,
        borderTopWidth: 1,
        borderTopColor: '#F0F0F0',
    },
    input: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginRight: 10,
        fontSize: 15,
        maxHeight: 100,
        color: Colors.text,
    },
    sendBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});