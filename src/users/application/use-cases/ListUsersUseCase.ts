import UserEntity from '../../domain/entities/UserEntity';
import IUserRepositoryPort from '../ports/IUserRepositoryPort';

class ListUsersUseCase {
  constructor(private usersRepository: IUserRepositoryPort) {}

  async execute(): Promise<UserEntity[]> {
    return this.usersRepository.list();
  }
}

export default ListUsersUseCase;
