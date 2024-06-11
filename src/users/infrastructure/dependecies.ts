import IUserRepositoryPort from '../application/ports/IUserRepositoryPort';
import AuthenticateUserUseCase from '../application/use-cases/AuthenticateUserUseCase';
import FindUserByIdUseCase from '../application/use-cases/FindUserByIdUseCase';
import ListUsersUseCase from '../application/use-cases/ListUsersUseCase';
import RegisterUserUseCase from '../application/use-cases/RegisterUserUseCase';
import UserRepositoryAdapter from './adapters/UserRepositoryAdapter';

const userRepositoryAdapter: IUserRepositoryPort = new UserRepositoryAdapter();

const authenticateUseCase = new AuthenticateUserUseCase(userRepositoryAdapter);
const registerUseCase = new RegisterUserUseCase(userRepositoryAdapter);
const listUsersUseCase = new ListUsersUseCase(userRepositoryAdapter);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepositoryAdapter);

export {
  authenticateUseCase,
  registerUseCase,
  listUsersUseCase,
  findUserByIdUseCase,
};
