import MessageType from '../types/MessageType';

class MessageEntity {
  message: string;
  type: MessageType;
  time: string;
  authorId: string;

  constructor(
    message: string,
    type: MessageType,
    time: string,
    authorId: string,
  ) {
    this.message = message;
    this.type = type;
    this.time = time;
    this.authorId = authorId;
  }

  toFirestore() {
    return {
      message: this.message,
      type: this.type,
      time: this.time,
      authorId: this.authorId,
    };
  }

  static fromFirestore(data: any) {
    return new MessageEntity(data.message, data.type, data.time, data.authorId);
  }
}

export default MessageEntity;
