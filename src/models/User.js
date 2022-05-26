"use strict"

const { getUserInfo } = require("./UserStorage");
const UserStorage  = require("./UserStorage");
const SUCCESS_MSG  = "로그인 성공";
const PWD_FAIL_MSG = "비밀번호가 틀렸습니다.";
const ID_FAIL_MSG  = "아이디가 틀렸습니다.";

class User{
    constructor(body){
        this.body = body;
    }

    login(){
        const body = this.body;
        const { id, pwd } = UserStorage.getUserInfo(body.id);
        
        if(id){
            if(id === body.id && pwd === body.pwd){
                return { success : true , msg : SUCCESS_MSG };
            }
            return { success : false , msg : PWD_FAIL_MSG };
        }
        return { success : false , msg : ID_FAIL_MSG };
    }
}

module.exports = User;