import UserEntity from '../../domain/entities/UserEntity';

interface IUserRepositoryPort {
  authenticate(user: UserEntity): Promise<UserEntity | null>;
  create(user: UserEntity): Promise<UserEntity>;
  list(): Promise<UserEntity[]>;
}

export default IUserRepositoryPort;
