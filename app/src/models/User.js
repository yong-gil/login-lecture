"use strict"

const { getUserInfo } = require("./UserStorage");
const UserStorage  = require("./UserStorage");
const SUCCESS_MSG  = "로그인 성공";
const PWD_FAIL_MSG = "비밀번호가 틀렸습니다.";
const ID_FAIL_MSG  = "아이디가 틀렸습니다.";
const DUAL_MEMBER_MSG = "이미 가입한 회원입니다.";
const SUCCESS_MEMBER_MSG  = "회원가입이 성공했습니다.";

class User{
    constructor(body){
        this.body = body;
    }

    async login(){
        const body = this.body;
         const { id, pwd } = await UserStorage.getUserInfo(body.id);
        console.log("login() : "+await UserStorage.getUserInfo(body.id));
        if(id){
            if(id === body.id && pwd === body.pwd){
                return { success : true , msg : SUCCESS_MSG };
            }
            return { success : false , msg : PWD_FAIL_MSG };
        }
        return { success : false , msg : ID_FAIL_MSG };
    }

    async register(){
        const body = this.body;
        const response = await UserStorage.save(body);
        console.log(response);
        if(response.success){
            return {success : response.success, msg : SUCCESS_MEMBER_MSG }
        }
        return {success : response.success, msg : DUAL_MEMBER_MSG }
    }
}

module.exports = User;