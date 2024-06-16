import ChatEntity from '../../domain/entities/ChatEntity';
import LastMessageEntity from '../../domain/entities/LastMessageEntity';
import MessageEntity from '../../domain/entities/MessageEntity';
import ParticipantEntity from '../../domain/entities/ParticipantEntity';

interface IChatRepositoryPort {
  createChat(participants: ParticipantEntity[]): Promise<ChatEntity>;
  createMessage(chatId: string, message: MessageEntity): Promise<MessageEntity>;
  updateLastMessage(
    chatId: string,
    lastMessage: LastMessageEntity,
  ): Promise<void>;
  list(): Promise<ChatEntity[]>;
  uploadImage(imageUri: string, type: string): Promise<string>;
}

export default IChatRepositoryPort;
