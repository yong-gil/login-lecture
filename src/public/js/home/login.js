"use strict"

console.log("login.js start");

const id = document.querySelector('#id');
const pwd = document.querySelector('#pwd');
const btn = document.querySelector('#btn');

btn.addEventListener("click", loginprocess);

function loginprocess(){
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
    }).then((res) => res.json())
      .then((res) => {
          console.log(res);
          if(res.success){
              alert("로그인 성공");
              location.href = "/";
              return;
          }
          alert("로그인 실패");
          return;
      })
      .catch((err) => {
          console.error(new Error("로그인중에 에러발생"));
      })

}

function isNull(value){
    if(value == null || value == '' || typeof value == 'undefiend'){
        return true;
    }
    return false;
}