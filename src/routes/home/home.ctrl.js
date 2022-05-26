"use strict"

//const UserStorage = require("../../models/UserStorage");
const Users = require("../../models/User");

const output = {
    home : (req, res) => {
        res.render("home/index");
    },
    login : (req,res) => {
        res.render("home/login");
    },
}
const response = {};
const process = {
    login : (req, res) => {
        const user = new Users(req.body);
        const response = user.login();
        return res.json(response); 
        
        /*
        const mid = req.body.id,
            mpwd = req.body.pwd;
           1번 인스턴스화
        const userStorage = new UserStorage();
        userStorage.users;
           2번 바로 users에 접근하려면 users에 static을 붙여 정적변수로 변경 필요
        UserStorage.users
           3번 바로 접근하면 안됨. getMethod() 이용해야함.
        const users = UserStorage.getUsers("id", "pwd");
        

        if(users.id.indexOf(mid) > -1){
            const idx = users.id.indexOf(mid);
            if(users.pwd[idx] == mpwd){
                response.success = "true";
                response.msg = SUCCESS_MSG;
                return res.json(response);
            }
        }
        response.success = false;
        response.msg = FAIL_MSG;
        return res.json(response);
        */
    }
};

module.exports = {
    output,
    process,
}