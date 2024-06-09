import {useRef, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ChatAppBar from '../components/ChatAppBar';
import MessageItem from '../components/MessageItem';
import MessageInput from '../components/MessageInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChatScreenRouteProp} from '../types/chatScreensRouteProps';

const ChatScreen = ({navigation}: ChatScreenRouteProp) => {
  const [messages, setMessages] = useState([
    {
      message: '¡Hola Carlos! ¿Qué tal todo?',
      time: '02:58 PM',
      isRead: true,
      isSender: false,
    },
    {
      message: '¡Hola Ana! Todo bien, ¿y tú? ¿Cómo va el trabajo?',
      time: '02:58 PM',
      isRead: true,
      isSender: true,
    },
    {
      message:
        'Me está gustando mucho. Hay un equipo genial y estoy aprendiendo un montón de cosas nuevas.',
      time: '02:58 PM',
      isRead: true,
      isSender: false,
    },
    {
      message:
        '¡Me alegro mucho! Oye, ¿para cuándo te animas a venir a una de nuestras quedadas con el grupo?',
      time: '02:59 PM',
      isRead: true,
      isSender: true,
    },
    {
      message:
        'Tengo un poco de lío últimamente, pero espero poder ir a la próxima. ¿Qué hacéis?',
      time: '02:59 PM',
      isRead: true,
      isSender: false,
    },
    {
      message:
        'Pues solemos hacer de todo: cenas, excursiones, quedadas para hacer deporte...',
      time: '02:59 PM',
      isRead: true,
      isSender: true,
    },
    {
      message: '¡Suena genial! Me apunto seguro en cuanto pueda.',
      time: '03:00 PM',
      isRead: true,
      isSender: false,
    },
    {
      message: '¡Genial! Ya me contarás qué te parece.',
      time: '03:00 PM',
      isRead: false,
      isSender: true,
    },
  ]);

  const scrollViewRef = useRef<ScrollView>(null);

  const handleSend = (newMessage: string) => {
    setMessages([
      ...messages,
      {message: newMessage, time: '03:00 PM', isRead: false, isSender: true},
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChatAppBar
        avatar="https://via.placeholder.com/42"
        name="Eduardo"
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({animated: true});
        }}>
        {messages.map((msg, index) => (
          <MessageItem key={index} {...msg} />
        ))}
      </ScrollView>
      <MessageInput onSend={handleSend} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: '#F4F4F4',
  },
});

export default ChatScreen;
