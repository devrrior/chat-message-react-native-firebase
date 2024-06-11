class LastMessageEntity {
  message: string;
  date: string;
  authorId: string;

  constructor(message: string, date: string, authorId: string) {
    this.message = message;
    this.date = date;
    this.authorId = authorId;
  }

  toFirestore() {
    return {
      message: this.message,
      date: this.date,
      authorId: this.authorId,
    };
  }

  static fromFirestore(data: any) {
    return new LastMessageEntity(data.message, data.date, data.authorId);
  }
}

export default LastMessageEntity;
