class UserEntity {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImageUrl: string;
  providerData: object;

  constructor(
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    profileImageUrl: string,
    providerData: object,
  ) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.profileImageUrl = profileImageUrl;
    this.providerData = providerData;
  }

  toFirebase() {
    return {
      _id: this._id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      profileImageUrl: this.profileImageUrl,
      providerData: this.providerData,
    };
  }

  static fromFirebase(data: any) {
    return new UserEntity(
      data._id,
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.profileImageUrl,
      data.providerData,
    );
  }
}

export default UserEntity;
