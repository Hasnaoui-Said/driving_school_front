export class User {

  username: String;
  uuid: String;
  email: String;
  password: String;
  firstName: String;
  lastName: String;
  cin: String;
  phone: String;
  accountState: String;

  constructor() {
    this.uuid = "";
    this.username = "";
    this.email = "";
    this.password = "";
    this.firstName = "";
    this.lastName = "";
    this.cin = "";
    this.phone = "";
    this.accountState = "";
  }
}
