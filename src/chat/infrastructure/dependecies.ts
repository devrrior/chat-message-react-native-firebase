import IChatRepositoryPort from '../application/ports/IChatReporitoryPort';
import CreateChatUseCase from '../application/use-cases/CreateChatUseCase';
import CreateMessageUseCase from '../application/use-cases/CreateMessageUseCase';
import ListChatsUseCase from '../application/use-cases/ListChatsUseCase';
import UpdateLastMessage from '../application/use-cases/UpdateLastMessageUseCase';
import ChatRepositoryAdapter from './adapters/ChatRepositoryAdapter';

const chatRepository: IChatRepositoryPort = new ChatRepositoryAdapter();

const listChatsUseCase = new ListChatsUseCase(chatRepository);
const createChatUseCase = new CreateChatUseCase(chatRepository);
const createMessageUseCase = new CreateMessageUseCase(chatRepository);
const updateLastMessageUseCase = new UpdateLastMessage(chatRepository);

export {
  listChatsUseCase,
  createChatUseCase,
  createMessageUseCase,
  updateLastMessageUseCase,
};
