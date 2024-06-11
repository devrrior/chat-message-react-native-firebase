import {collection, doc, getDocs, setDoc} from 'firebase/firestore';
import IChatRepositoryPort from '../../application/ports/IChatReporitoryPort';
import ChatEntity from '../../domain/entities/ChatEntity';
import {firebaseDB} from '../../../../config/firebase.config';
import ParticipantEntity from '../../domain/entities/ParticipantEntity';
import LastMessageEntity from '../../domain/entities/LastMessageEntity';
import MessageEntity from '../../domain/entities/MessageEntity';

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
}

export default ChatRepositoryAdapter;
