import IChatRepositoryPort from '../ports/IChatReporitoryPort';

class UploadImageUseCase {
  constructor(private chatRepository: IChatRepositoryPort) {}

  async execute(imageUri: string, type: string): Promise<string> {
    return await this.chatRepository.uploadImage(imageUri, type);
  }
}

export default UploadImageUseCase;
