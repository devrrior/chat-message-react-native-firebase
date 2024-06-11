import {useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, ScrollView, Platform} from 'react-native';
import ChatAppBar from '../components/ChatAppBar';
import MessageTextItem from '../components/MessageItem';
import MessageInput from '../components/MessageInput';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ChatScreenRouteProp} from '../types/chatScreensRouteProps';
import {
  createMessageUseCase,
  updateLastMessageUseCase,
} from '../../dependecies';
import MessageEntity from '../../../domain/entities/MessageEntity';
import {
  firebaseAuth,
  firebaseDB,
  firebaseStorage,
} from '../../../../../config/firebase.config';
import LastMessageEntity from '../../../domain/entities/LastMessageEntity';
import {collection, onSnapshot, orderBy, query} from 'firebase/firestore';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import MessageImageItem from '../components/MessageImageItem';

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

  const handleSendImage = async (imageUri: string) => {
    if (!imageUri) {
      return;
    }

    const filename = imageUri.substring(imageUri.lastIndexOf('/') + 1);
    const storageRef = ref(firebaseStorage, `images/${filename}`);
    const uploadUri =
      Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

    const blob = await fetch(uploadUri).then(response => response.blob());

    const snapshot = await uploadBytes(storageRef, blob);
    const url = await getDownloadURL(snapshot.ref);

    const messageEntity = new MessageEntity(
      url,
      'image',
      new Date().toISOString(),
      userCredentials?.uid as string,
    );

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
      <MessageInput onSendText={handleSendText} onSendImage={handleSendImage} />
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
