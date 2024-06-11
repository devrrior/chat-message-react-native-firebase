import MessageEntity from '../../domain/entities/MessageEntity';
import IChatRepositoryPort from '../ports/IChatReporitoryPort';

class CreateMessageUseCase {
  constructor(private chatRepository: IChatRepositoryPort) {}

  async execute(
    chatId: string,
    message: MessageEntity,
  ): Promise<MessageEntity> {
    return await this.chatRepository.createMessage(chatId, message);
  }
}

export default CreateMessageUseCase;
