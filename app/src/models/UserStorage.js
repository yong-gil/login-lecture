"use strict"

const { error } = require("console");
const fs = require("fs").promises;


class UserStorage {
/* 변수앞에 #은 은닉 
    static #users = {
        id  : ['112', '119', '202'],
        pwd : ['112', '119', '202'],
        name : ['a' , 'b', 'c']
    }
*/
    static getUserInfo(id){
        console.log("id : "+ id);
        //const users = this.#users;
        /*promise <pending> User.js에서 데이터를 읽기 전 호출해버림.*/ 
        return fs.readFile('./src/databases/file/users.json')
        .then((data) => {
           return this.#getUserInfo(data, id);
        })
        .catch((err) => console.log(err))
    }

    static #getUserInfo(data, id){
        console.log(JSON.parse(data));
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users)
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {}); 
        return userInfo;
    }

    static getUsers(isAll, ...fields){
        //const users = this.#users;
        // const newUsers = fields.reduce((newUsers, field) => {
        //     if(users.hasOwnProperty(field)){
        //         newUsers[field] = users[field];
        //     }
        //     return newUsers;
        // }, {});
        // return newUsers;
        return fs.readFile('./src/databases/file/users.json')
        .then((data) => {
           return this.#getUsers(data, isAll, fields);
        })
        .catch((err) => console.log(err))
    }

    static #getUsers(data, isAll, fields){
        const users = JSON.parse(data);
        if(isAll){return users;}
        const newUsers = fields.reduce((newUsers, field) => {
            if(users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    static async save(userInfo){
        const users = await this.getUsers(true);
        //전체 덮어버려서 가져와서 추가해준다.
        if(users.id.includes(userInfo.id)){return {success:false}}
        users.id.push(userInfo.id);
        users.pwd.push(userInfo.pwd);
        users.email.push(userInfo.email);
        fs.writeFile("./src/databases/file/users.json", JSON.stringify(users));
        return {success:true}
    }
}

module.exports = UserStorage;