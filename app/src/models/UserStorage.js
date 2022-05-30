"use strict"

const { error } = require("console");
const db = require("../config/db");


class UserStorage {
/* 변수앞에 #은 은닉 
    static #users = {
        id  : ['112', '119', '202'],
        pwd : ['112', '119', '202'],
        name : ['a' , 'b', 'c']
    }
*/
    static getUserInfo(id){
        return new Promise((resolve, reject) => {
            db.query("select * from users WHERE id = ?", [id], (err, data) => {
                if(err)reject(err);
                resolve(data[0]);
            });            

        });
    }

    static #getUserInfo(data, id){
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users)
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {}); 
        return userInfo;
    }

    static getUsers(isAll, ...fields){}

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
        return new Promise((resolve, reject) => {
            db.query("INSERT INTO users (id, pwd, email) VALUES (?, ?, ?)", [userInfo.id, userInfo.pwd, userInfo.email], (err, data) => {
                if(err)reject(err);
                resolve({success : true});
            });            

        });
    }
}

module.exports = UserStorage;