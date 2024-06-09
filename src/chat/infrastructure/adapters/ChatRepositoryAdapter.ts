import {collection, doc, getDocs, setDoc} from 'firebase/firestore';
import IChatRepositoryPort from '../../application/ports/IChatReporitoryPort';
import ChatEntity from '../../domain/entities/ChatEntity';
import {firebaseDB} from '../../../../config/firebase.config';

class ChatRepositoryAdapter implements IChatRepositoryPort {
  async list(): Promise<ChatEntity[]> {
    const docs = await getDocs(collection(firebaseDB, 'chats'));

    return docs.docs.map(doc => {
      const data = doc.data();

      return data as ChatEntity;
    });
  }

  async create(participants: string[]): Promise<ChatEntity> {
    const id = `${Date.now()}`;

    const newChat = {
      _id: id,
      participants,
      lastMessage: '',
      lastMessageDate: '',
      lastMessageSender: '',
      unreadMessages: 0,
    };

    setDoc(doc(firebaseDB, 'chats', id), newChat);

    return new ChatEntity(id, participants, '', '', '');
  }
}

export default ChatRepositoryAdapter;
