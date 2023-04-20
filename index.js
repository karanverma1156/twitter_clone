let express = require('express');
const app = express();
const db =  require('./database');

// setting the view, path and body parser

var path = require('path');
app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')))
app.set('views',path.join(__dirname,'view'));
app.set('view engine', 'ejs');

app.get('/', function(req,res){
    
    let msg = "";
    if(req.query['msg'] != ""){
        msg = req.query['msg'];
    }

    res.render('main',{msg:msg});

});

app.get('/home',function(req,res){
    let msg = "";
    if(req.query['msg'] != "")
    {
        msg = req.query['msg'];
    }

    res.render('home',{msg:msg});
})

app.get('/login',(req,res)=>{
    let msg = "";
    if(req.query['msg'] != "")
    {
        msg = req.query['msg'];
    }
    res.render('login',{msg:msg});
})

app.post('/login2',(req,res)=>{

    let msg = "";
    if(req.query['msg'] != "")
    {
        msg = req.query['msg'];
    }

    let username = req.body.username;
    let password = req.body.pass;

    let sql = "select * from user where username='"+username+"' && password='"+password+"'";
    
    db.query(sql,function(error,result,field){

            if(error)
            {
                msg = error;
                res.redirect('/login?msg='+msg);
            }

            if(result.length)
            {
                var username = result[0].username; 

                if(result[0].verify == 1)
                {
                    msg = "Welcome"+username;
                    res.render('home',{data:result,msg:msg});
                }

                else{
                    msg = "Account not verified";
                    res.redirect('/login?msg='+msg);
                }

            }

            else{
                msg = "Invalid Credentials or User not found";
                res.redirect('/login?msg='+msg);
            }
        })

})

app.get('/verifypage', (req,res)=>{
    let msg ="";
    if(req.query['msg'] != "")
    {
        msg = req.query['msg'];
    }

    res.render('verifypage',{msg:msg})
})

app.get('/edituser',function(req,res){

    let msg ="";
    if(req.query['msg']!="")
    {
        msg = req.query['msg'];
    }

    let sql = "select * from user where uid =" + req.query['uid'];

    db.query(sql,function(error,result,field){
        if(error)
        {
            msg = error;
            res.redirect('/login?msg='+msg);
        }

        else{
            msg = "Edit the data";
            res.render('edituser',{data:result,msg:msg});
        }
    })

})

app.post('/editusersub',(req,res)=>{

    let msg = "";

    if(req.query['msg']!="")
    {
        msg = req.query['msg'];
    }

    let email = req.body.email;
    let mobile = req.body.mobile;
    let password = req.body.password;

    let sql = "update user set email='"+email+"',mobile="+mobile+",password='"+password+"'";

    db.query(sql,function(error,result,field){
        if(error)
        {
            msg = error;
            res.redirect('/login?msg='+msg);
        }

        else{
            res.redirect('/login?msg=data updated');
        }
    })

})

app.post('/adduser',(req,res)=>{

    let username = req.body.username;
    let email = req.body.email;
    let mobile = req.body.mobile;
    let dob = req.body.dob;
    let dor = req.body.dor;
    let gender = req.body.gender;
    let password = req.body.pass;

    let sql = "insert into user (username,email,mobile,password,dob,dor,gender) values ('"+username+"','"+email+"',"+mobile+", '"+password+"','"+dob+"', '"+dor+"','"+gender+"')";

    let msg = "";

    db.query(sql,function(error,result,field){
        if(error)
        {
            msg = error;
            res.redirect('/?msg='+msg);
            console.log(error);
        }

        else{
            msg = "User added successfully, verify to login!";
            res.redirect('/verifypage?msg='+msg);
        }
    })

})

app.listen(3000);