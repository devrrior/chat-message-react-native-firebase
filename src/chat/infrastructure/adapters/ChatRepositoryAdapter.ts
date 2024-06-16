import {collection, doc, getDocs, setDoc} from 'firebase/firestore';
import IChatRepositoryPort from '../../application/ports/IChatReporitoryPort';
import ChatEntity from '../../domain/entities/ChatEntity';
import {firebaseDB, firebaseStorage} from '../../../../config/firebase.config';
import ParticipantEntity from '../../domain/entities/ParticipantEntity';
import LastMessageEntity from '../../domain/entities/LastMessageEntity';
import MessageEntity from '../../domain/entities/MessageEntity';
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage';
import {Platform} from 'react-native';

class ChatRepositoryAdapter implements IChatRepositoryPort {
  async list(): Promise<ChatEntity[]> {
    const snapshot = await getDocs(collection(firebaseDB, 'chats'));

    return snapshot.docs.map(docData =>
      ChatEntity.fromFirestore(docData.data()),
    );
  }

  async createChat(participants: ParticipantEntity[]): Promise<ChatEntity> {
    const id = `${Date.now()}`;

    const lastMessageDate = new Date().toISOString();
    const lastMessageEntity = new LastMessageEntity('', lastMessageDate, '');
    const participantIds = participants.map(participant => participant._id);
    const chatEntity = new ChatEntity(
      id,
      participants,
      participantIds,
      lastMessageEntity,
      0,
    );

    await setDoc(doc(firebaseDB, 'chats', id), chatEntity.toFirestore());

    return chatEntity;
  }

  async createMessage(
    chatId: string,
    message: MessageEntity,
  ): Promise<MessageEntity> {
    message.time = new Date().toISOString();

    await setDoc(
      doc(firebaseDB, 'chats', chatId, 'messages', `${Date.now()}`),
      message.toFirestore(),
    );

    return message;
  }

  async updateLastMessage(
    chatId: string,
    lastMessage: LastMessageEntity,
  ): Promise<void> {
    await setDoc(
      doc(firebaseDB, 'chats', chatId),
      {lastMessage: lastMessage.toFirestore()},
      {merge: true},
    );
  }

  async uploadImage(imageUri: string, type: string): Promise<string> {
    try {
      const dateStr = new Date().toISOString();
      const filename =
        dateStr + imageUri.substring(imageUri.lastIndexOf('/') + 1);
      // replace %20 with - in filename
      const filenameFinal = filename.replace(/%20/g, '-');
      const storageRef = ref(firebaseStorage, `${type}/${filenameFinal}`);
      const uploadUri =
        Platform.OS === 'ios' ? imageUri.replace('file://', '') : imageUri;

      const blob = await fetch(uploadUri).then(response => response.blob());

      const snapshot = await uploadBytes(storageRef, blob);
      const url = await getDownloadURL(snapshot.ref);

      return url;
    } catch (error) {
      throw new Error('Error uploading image');
    }
  }
}

export default ChatRepositoryAdapter;
