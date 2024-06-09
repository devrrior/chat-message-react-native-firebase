class ChatEntity {
  _id: string;
  participants: string[];
  lastMessage: string;
  lastMessageDate: string;
  lastMessageAuthor: string;

  constructor(
    _id: string,
    participants: string[],
    lastMessage: string,
    lastMessageDate: string,
    lastMessageAuthor: string,
  ) {
    this._id = _id;
    this.participants = participants;
    this.lastMessage = lastMessage;
    this.lastMessageDate = lastMessageDate;
    this.lastMessageAuthor = lastMessageAuthor;
  }
}

export default ChatEntity;
