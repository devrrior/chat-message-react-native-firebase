import LastMessageEntity from './LastMessageEntity';
import ParticipantEntity from './ParticipantEntity';

class ChatEntity {
  _id: string;
  participants: ParticipantEntity[];
  participantIds: string[];
  lastMessage: LastMessageEntity;
  unreadMessages: number;

  constructor(
    _id: string,
    participants: ParticipantEntity[],
    participantIds: string[],
    lastMessage: LastMessageEntity,
    unreadMessages: number,
  ) {
    this._id = _id;
    this.participants = participants;
    this.participantIds = participantIds;
    this.lastMessage = lastMessage;
    this.unreadMessages = unreadMessages;
  }

  toFirestore() {
    return {
      _id: this._id,
      participants: this.participants.map(participant =>
        participant.toFirestore(),
      ),
      participantIds: this.participantIds,
      lastMessage: this.lastMessage.toFirestore(),
      unreadMessages: this.unreadMessages,
    };
  }

  static fromFirestore(data: any) {
    return new ChatEntity(
      data._id,
      data.participants.map((participantData: any) =>
        ParticipantEntity.fromFirestore(participantData),
      ),
      data.participantIds,
      LastMessageEntity.fromFirestore(data.lastMessage),
      data.unreadMessages,
    );
  }
}

export default ChatEntity;
