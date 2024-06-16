import {useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import ChatAppBar from '../components/ChatAppBar';
import MessageInput from '../components/MessageInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChatScreenRouteProp} from '../types/chatScreensRouteProps';
import {
  createMessageUseCase,
  updateLastMessageUseCase,
  uploadImageUseCase,
} from '../../dependecies';
import MessageEntity from '../../../domain/entities/MessageEntity';
import {firebaseAuth, firebaseDB} from '../../../../../config/firebase.config';
import LastMessageEntity from '../../../domain/entities/LastMessageEntity';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import MessageImageItem from '../components/MessageImageItem';
import MessageVideoItem from '../components/MessageVideoItem';
import MessageType from '../../../domain/types/MessageType';
import MessageAudioItem from '../components/MessageAudioItem';
import MessageTextItem from '../components/MessageTextItem';

const ChatScreen = ({navigation, route}: ChatScreenRouteProp) => {
  const {chatId, name, profileImageUrl} = route.params;

  const [messages, setMessages] = useState([] as MessageEntity[]);
  const userCredentials = firebaseAuth.currentUser;

  const scrollViewRef = useRef<ScrollView>(null);

  useLayoutEffect(() => {
    const collectionRef = collection(firebaseDB, `chats/${chatId}/messages`);
    const q = query(collectionRef, orderBy('time', 'asc'));

    const unsubscribe = onSnapshot(q, snapshot => {
      const newMessages = snapshot.docs.map(doc => doc.data() as MessageEntity);
      setMessages(newMessages);
    });

    return () => {
      unsubscribe();
    };
  }, [chatId]);

  const handleSendText = async (newMessage: string) => {
    const messageEntity = new MessageEntity(
      newMessage,
      'text',
      new Date().toISOString(),
      userCredentials?.uid as string,
    );

    const createdMessage = await createMessageUseCase.execute(
      chatId,
      messageEntity,
    );

    const lastMessage = new LastMessageEntity(
      createdMessage.message,
      createdMessage.time,
      createdMessage.authorId,
    );

    await updateLastMessageUseCase.execute(chatId, lastMessage);
  };

  const handleSendFile = async (fileUri: string, messageType: MessageType) => {
    if (!fileUri) {
      return;
    }
    console.log(fileUri);

    const url = await uploadImageUseCase.execute(fileUri, messageType);
    console.log(url);

    const messageEntity = new MessageEntity(
      url,
      messageType,
      '',
      userCredentials?.uid as string,
    );
    console.log(messageEntity);

    await createMessageUseCase.execute(chatId, messageEntity);
  };

  const renderMessages = () => {
    return messages.map((msg, index) => {
      const date = new Date(msg.time);
      if (msg.type === 'image') {
        return (
          <MessageImageItem
            key={index}
            message={msg.message}
            time={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
            isSender={msg.authorId === userCredentials?.uid}
          />
        );
      } else if (msg.type === 'video') {
        return (
          <MessageVideoItem
            key={index}
            message={msg.message}
            time={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
            isSender={msg.authorId === userCredentials?.uid}
          />
        );
      } else if (msg.type === 'audio') {
        return (
          <MessageAudioItem
            key={index}
            audioUri={msg.message}
            time={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
            isSender={msg.authorId === userCredentials?.uid}
          />
        );
      }

      return (
        <MessageTextItem
          key={index}
          message={msg.message}
          time={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`}
          isSender={msg.authorId === userCredentials?.uid}
        />
      );
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ChatAppBar
        avatar={profileImageUrl}
        name={name}
        onBackPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.messagesContainer}
        ref={scrollViewRef}
        onContentSizeChange={() => {
          scrollViewRef.current?.scrollToEnd({animated: true});
        }}>
        {renderMessages()}
      </ScrollView>
      <MessageInput onSendText={handleSendText} onSendFile={handleSendFile} />
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
