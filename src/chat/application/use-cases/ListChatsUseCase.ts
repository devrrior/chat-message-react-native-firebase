import ChatEntity from '../../domain/entities/ChatEntity';
import IChatRepositoryPort from '../ports/IChatReporitoryPort';

class ListChatsUseCase {
  constructor(private chatRepository: IChatRepositoryPort) {}

  async execute(): Promise<ChatEntity[]> {
    return this.chatRepository.list();
  }
}

export default ListChatsUseCase;
