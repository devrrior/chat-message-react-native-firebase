import ChatEntity from '../../domain/entities/ChatEntity';

interface IChatRepositoryPort {
  create(participants: string[]): Promise<ChatEntity>;
  list(): Promise<ChatEntity[]>;
}

export default IChatRepositoryPort;
