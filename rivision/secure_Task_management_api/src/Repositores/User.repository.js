import { users } from "../data/users.js"



export const userrepo = {
    findByEmail(email) {
        return users.find(
        (user) => user.email === email
   );
 },

 findById(id) {
    return users.find(
        (user) => user.id === id
    );
 },

 findAll() {
    return users;
 },

 create(UserData) {
    users.push(UserData);
 },

 update(id, updateData) {
    const user = users.find(
        (user) => user.id === id
    );

    if(!user) return null;
    Object.assign(user, updateData);
        
    },

    delete(id) {
        const userIndex = users.findIndex(
            (user) => user.id === id
        );

        if(userIndex === -1) {
            const deletedUser = users[userIndex];
              users.splice(userIndex, 1);
              return deletedUser;

        }
    }
}