"use strict"

class UserStorage {
    /* 변수앞에 #은 은닉 */
    static #users = {
        id  : ['112', '119', '202'],
        pwd : ['112', '119', '202'],
        name : ['a' , 'b', 'c']
    }

    static getUserInfo(id){
        console.log("id : "+ id);
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users)
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {})
        return userInfo;
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