import UserEntity from '../../domain/entities/UserEntity';
import IUserRepositoryPort from '../ports/IUserRepositoryPort';

class AuthenticateUserUseCase {
  constructor(private userRepository: IUserRepositoryPort) {}

  async execute(email: string, password: string): Promise<UserEntity | null> {
    const user = new UserEntity('', '', '', email, password, {});
    return this.userRepository.authenticate(user);
  }
}

export default AuthenticateUserUseCase;
