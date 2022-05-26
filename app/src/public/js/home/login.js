"use strict"

console.log("login.js start");

const id        = document.querySelector('#id');
const pwd       = document.querySelector('#pwd');
const loginBtn  = document.querySelector('#loginBtn');

const mId       = document.querySelector('#mId');
const mPwd      = document.querySelector('#mPwd');
const mPwdChk   = document.querySelector('#mPwdChk');
const emailAddr = document.querySelector('#emailAddr');
const regiBtn   = document.querySelector('#regiBtn');

const reg_email = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;


loginBtn.addEventListener("click", loginProcess);
regiBtn.addEventListener("click", registerProcess);

function loginProcess(){
    console.log("로그인 프로세스 시작");
    const req = {
        id : id.value,
        pwd : pwd.value,
    };
    if(isNull(req.id)){alert("아이디를 입력해주세요."); return;}
    if(isNull(req.pwd)){alert("패스워드를 입력해주세요."); return;}

    fetch("/login", {
        method  : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req)
    }).then((res) => res.json()) //프로미스
      .then((res) => {
          console.log(res);
          if(res.success){
              alert(res.msg);
              location.href = "/";
              return;
          }
          alert(res.msg);
          return;
      })
      .catch((err) => {
          console.error(new Error("로그인중에 에러발생"));
      })

}

function registerProcess(){
    console.log("회원가입 프로세스 시작");
    const req = {
        id      : mId.value,
        pwd     : mPwd.value,
        pwdChk  : mPwdChk.value,
        email   : emailAddr.value
    }
    if(isNull(req.id)){alert("ID를 입력해주세요."); return;}
    /* ID조건 특수문자불가.. */
    if(isNull(req.pwd)){alert("PW를 입력해주세요."); return;}
    /* @~@자 사이, 특수문자포함.. */ 
    if(isNull(req.pwdChk)){alert("PW확인을 입력해주세요."); return;}
    if(isNull(req.email)){alert("EMAIL을 입력해주세요."); return;}
    if(req.pwd !== req.pwdChk){alert("PW를 확인해주세요"); return;}
    if(!validEmail(req.email)){alert("EMAIL 형식에 맞게 입력해주세요.");return;}

    fetch("/register", {
        method : "POST",
        headers : {
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(req)
    }).then((res) => res.json())
      .then((res) => {
        console.log(res);
        if(res.success){
            alert(res.msg);
            //SIGN IN으로 체크 변경
            location.href = "/login"
            return;
        }
        alert(res.msg);
        return;
      })
      .catch((err) => {
        console.error(new Error("회원가입 중 에러발생"));
      });
}

function validEmail(value){
    console.log("reg_email.test(value) : "+reg_email.test(value));
    return reg_email.test(value);
}

function isNull(value){
    if(value == null || value == '' || typeof value == 'undefiend'){
        return true;
    }
    return false;
}