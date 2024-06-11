import LastMessageEntity from '../../domain/entities/LastMessageEntity';
import IChatRepositoryPort from '../ports/IChatReporitoryPort';

class UpdateLastMessage {
  constructor(private readonly chatRepository: IChatRepositoryPort) {}

  async execute(chatId: string, lastMessage: LastMessageEntity): Promise<void> {
    this.chatRepository.updateLastMessage(chatId, lastMessage);
  }
}

export default UpdateLastMessage;
