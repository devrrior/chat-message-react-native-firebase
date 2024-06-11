import UserEntity from '../../domain/entities/UserEntity';
import IUserRepositoryPort from '../ports/IUserRepositoryPort';

class FindUserByIdUseCase {
  constructor(private userRepository: IUserRepositoryPort) {}

  async execute(userId: string): Promise<UserEntity | null> {
    const user = await this.userRepository.findById(userId);

    return user;
  }
}

export default FindUserByIdUseCase;
