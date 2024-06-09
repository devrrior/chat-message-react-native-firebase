class UserEntity {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  providerData: object;

  constructor(
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    providerData: object,
  ) {
    this._id = _id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.providerData = providerData;
  }
}

export default UserEntity;
