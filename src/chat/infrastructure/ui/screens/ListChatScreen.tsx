import React from 'react';
import {StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import AppBar from '../../../../shared/infrastructure/ui/components/AppBar';
import TabBar from '../components/TabBar';
import ChatItem from '../components/ChatItem';
import FloatingButton from '../components/FloatingButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ListChatScreenRouteProp} from '../types/chatScreensRouteProps';

const chats = [
  {
    name: 'Rodrigo',
    message: 'Por supuesto, acabamos de añadir',
    time: '3:40 PM',
    unread: 2,
  },
  {
    name: 'Eduardo',
    message: '¿Desea pagar en línea o en persona en el',
    time: '3:40 PM',
  },
  {
    name: 'Fernanda',
    message: 'Desde juguetes para masticar hasta cóm',
    time: '3:40 PM',
  },
  {
    name: 'Javier',
    message: '¿Buscas la prenda perfecta para llamar la',
    time: '3:40 PM',
  },
  {
    name: 'Zenteno',
    message: 'Únete a nuestro gimnasio y comienza tu',
    time: '3:40 PM',
  },
];

const ListChatScreen = ({navigation}: ListChatScreenRouteProp) => {
  const renderChats = () => {
    return chats.map((chat, index) => (
      <TouchableOpacity
        key={index}
        onPress={() =>
          navigation.navigate('ChatScreen', {
            name: chat.name,
            avatar: 'https://via.placeholder.com/42',
            _id: '1',
          })
        }>
        <ChatItem
          name={chat.name}
          message={chat.message}
          time={chat.time}
          unread={chat.unread}
        />
      </TouchableOpacity>
    ));
  };
  return (
    <SafeAreaView style={styles.container}>
      <AppBar
        title=""
        leftIcon="menu"
        rightIcon="search"
        onLeftPress={() => console.log('Left icon pressed')}
        onRightPress={() => console.log('Right icon pressed')}
      />
      <TabBar />
      <ScrollView style={styles.messagesContainer}>{renderChats()}</ScrollView>
      <FloatingButton onPress={() => console.log('Floating button pressed')} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  messagesContainer: {
    display: 'flex',
    paddingHorizontal: 10,
  },
});

export default ListChatScreen;
