import User from "../db/models/users";

let users: User[] = [
  
];

export class UserService {
  public getAllUsers() {
    return users;
  }

  public getUserById(id: string) {
    return users.find((user) => user.id === id);
  }

  // public createUser(name: string, email: string) {
  //   const id = Date.now().toString();
  //   const newUser: User = { id, name, email };
  //   users.push(newUser);
  //   return newUser;
  // }
  public async createUser(name: string, email: string): Promise<User> {
    const id = Date.now().toString();

    try {
      // const newUser: User = await User.create({
      //   id,
      //   name,
      //   email,
      // });

      const data = {};
      const newUser: User = await User.create({...data});
  

      // await User.create({})

      users.push(newUser);
      return newUser;
    } catch (error) {
      // Handle error if necessary
      throw error;
    }
  }




  public updateUser(id: string, name: string, email: string) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users[userIndex].name = name;
      users[userIndex].email = email;
      return users[userIndex];
    }
    return null;
  }

  public deleteUser(id: string) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1)[0];
      return deletedUser;
    }
    return null;
  }
}
