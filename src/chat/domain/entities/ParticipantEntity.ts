class ParticipantEntity {
  _id: string;
  firstname: string;
  lastname: string;

  constructor(_id: string, firstname: string, lastname: string) {
    this._id = _id;
    this.firstname = firstname;
    this.lastname = lastname;
  }

  toFirestore() {
    return {
      _id: this._id,
      firstname: this.firstname,
      lastname: this.lastname,
    };
  }

  static fromFirestore(data: any) {
    return new ParticipantEntity(data._id, data.firstname, data.lastname);
  }
}

export default ParticipantEntity;
