import UserEntity from '../../domain/entities/UserEntity';

interface IUserRepositoryPort {
  authenticate(user: UserEntity): Promise<UserEntity>;
  create(user: UserEntity): Promise<UserEntity>;
}

export default IUserRepositoryPort;
