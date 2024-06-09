import ChatEntity from '../../domain/entities/ChatEntity';
import IChatRepositoryPort from '../ports/IChatReporitoryPort';

class CreateChatUseCase {
  constructor(private chatRepository: IChatRepositoryPort) {}

  async execute(collaborators: string[]): Promise<ChatEntity> {
    return this.chatRepository.create(collaborators);
  }
}

export default CreateChatUseCase;
