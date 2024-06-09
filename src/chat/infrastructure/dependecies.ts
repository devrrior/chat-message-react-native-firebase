import IChatRepositoryPort from '../application/ports/IChatReporitoryPort';
import CreateChatUseCase from '../application/use-cases/CreateChatUseCase';
import ListChatsUseCase from '../application/use-cases/ListChatsUseCase';
import ChatRepositoryAdapter from './adapters/ChatRepositoryAdapter';

const chatRepository: IChatRepositoryPort = new ChatRepositoryAdapter();

const listChatsUseCase = new ListChatsUseCase(chatRepository);
const createChatUseCase = new CreateChatUseCase(chatRepository);

export {listChatsUseCase, createChatUseCase};