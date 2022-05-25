"use strict"

const users = {
    id  : ['112', '119', '202'],
    pwd : ['112', '119', '202']
}

const output = {
    home : (req, res) => {
        res.render("home/index");
    },
    login : (req,res) => {
        res.render("home/login");
    },
}

const process = {
    login : (req, res) => {
        console.log(req.body);
        const mid = req.body.id,
            mpwd = req.body.pwd;
        
        if(users.id.indexOf(mid) > -1){
            const idx = users.id.indexOf(mid);
            if(users.pwd[idx] == mpwd){
                return res.json({
                    success : true,
                    msg : '로그인 성공',
                })
            }
        }
        return res.json({
            success : false,
            msg : '로그인 실패'
        })
    }
};

module.exports = {
    output,
    process,
}