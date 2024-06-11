import ChatEntity from '../../domain/entities/ChatEntity';
import ParticipantEntity from '../../domain/entities/ParticipantEntity';
import IChatRepositoryPort from '../ports/IChatReporitoryPort';

class CreateChatUseCase {
  constructor(private chatRepository: IChatRepositoryPort) {}

  async execute(participants: ParticipantEntity[]): Promise<ChatEntity> {
    return this.chatRepository.createChat(participants);
  }
}

export default CreateChatUseCase;
