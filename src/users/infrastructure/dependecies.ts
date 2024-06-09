import IUserRepositoryPort from '../application/ports/IUserRepositoryPort';
import AuthenticateUserUseCase from '../application/use-cases/AuthenticateUserUseCase';
import RegisterUserUseCase from '../application/use-cases/RegisterUserUseCase';
import UserRepositoryAdapter from './adapters/UserRepositoryAdapter';

const userRepositoryAdapter: IUserRepositoryPort = new UserRepositoryAdapter();

const authenticateUseCase = new AuthenticateUserUseCase(userRepositoryAdapter);
const registerUseCase = new RegisterUserUseCase(userRepositoryAdapter);

export {authenticateUseCase, registerUseCase};
