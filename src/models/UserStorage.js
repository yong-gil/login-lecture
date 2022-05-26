"use strict"

class UserStorage {
    /* 변수앞에 #은 은닉 */
    static #users = {
        id  : ['112', '119', '202'],
        pwd : ['112', '119', '202'],
        name : ['a' , 'b', 'c']
    }

    static getUsers(...fields){
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
}

module.exports = UserStorage;