class ParticipantEntity {
  _id: string;
  firstname: string;
  lastname: string;
  profileImageUrl: string;

  constructor(
    _id: string,
    firstname: string,
    lastname: string,
    profileImageUrl: string,
  ) {
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
    this.profileImageUrl = profileImageUrl;
  }

  toFirestore() {
    return {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
      profileImageUrl: this.profileImageUrl,
    };
  }

  static fromFirestore(data: any) {
    return new ParticipantEntity(
      data._id,
      data.firstname,
      data.lastname,
      data.profileImageUrl,
    );
  }
}

export default ParticipantEntity;
