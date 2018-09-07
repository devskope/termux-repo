class UserStore extends Array {
  findByUsername(username) {
    return this.find(x => x.username === username);
  }

  add(newUser) {
    newUser.id = this.length + 1; // eslint-disable-line no-param-reassign
    this.push(newUser);
  }
}

class AdminStore extends Array {
  add(newAdmin) {
    newAdmin.id = this.length + 1; // eslint-disable-line no-param-reassign
    this.push(newAdmin);
  }
}

export const users = new UserStore();
export const admins = new AdminStore();

export const user = { anonymous: true };
