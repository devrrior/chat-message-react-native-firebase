import UserEntity from '../../domain/entities/UserEntity';
import IUserRepositoryPort from '../ports/IUserRepositoryPort';

class RegisterUserUseCase {
  constructor(private userRepository: IUserRepositoryPort) {}

  async execute(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<UserEntity> {
    const user = new UserEntity('', firstName, lastName, email, password, {});

    return this.userRepository.create(user);
  }
}

export default RegisterUserUseCase;
