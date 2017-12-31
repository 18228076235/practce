var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conn = require('./conn.js');
var async=require("async")

var app = express();

var hostname = "172.19.103.13"; //服务器主机
//var hostname="localhost"
var port = 8000; //服务器 端口

var server = require("http").createServer(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// 处理跨域方法 jsonp
app.all('*', function(req, res, next) {
    // res.header("Access-Control-Allow-Headers","Access-Control-Allow-Headers")
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    next()
});

app.post('/register', (req, res) => {
   var username=req.body.username;
    var passwrod=req.body.passwrod;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var reg=db.collection("reg")
        reg.insert({username:username,passwrod:passwrod},(err,sout)=>{
            res.send('1')
        })
    })

})


app.get("/find",(req,res)=>{
    var id=req.query.id;  
    conn.getDb((err,db)=>{
        if(err) throw err;
        var reg=db.collection("reg")
        reg.find({username:id},{passwrod:1,_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('0')
            }
        })
    })
})

app.post("/reset",(req,res)=>{
    var username=req.body.username;
    var passwrod=req.body.passwrod;
    conn.getDb((err,db)=>{
        if(err) throw err;
       var reg=db.collection("reg");
       reg.update({username:username},{username:username,passwrod:passwrod},(err,sout)=>{
        res.send('1')
       })
        
    })
})

app.get('/mantt',(req,res)=>{
   var indx=(req.query.typeid)*1;
   var typeid=0;
   if(indx==1||indx==3){
    typeid=2
   }else{
    typeid=1
   }

  
    conn.getDb((err,db)=>{
        if(err) throw err;
        var reg=db.collection('toutiao');
        reg.find({typeid:typeid},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('0')
            }
        })
    })
})

app.get('/banner',(req,res)=>{
    
    conn.getDb((err,db)=>{
        if(err) throw err;
        var banner=db.collection("banner");
        banner.find({},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send(0)
            }
        })

    })
})


app.get('/findman',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var findman=db.collection("find");
        findman.find({},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send(0)
            }
        })

    })
})

app.get('/lsj',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var lsj=db.collection('lsj');
        lsj.find({},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send(0)
            }
        })
    })
})

app.get('/detil',(req,res)=>{
    var id=(req.query.id)*1;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var reg=db.collection('toutiao');
        reg.find({id:id},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send(0)
            }
        })
    })
})

app.post('/comment',(req,res)=>{
    var id=req.body.id;
    var usename=req.body.usename;
    var cont=req.body.cont;
    var time=req.body.time
    conn.getDb((err,db)=>{
        var comment=db.collection("comment");
        comment.insert({id:id,username:usename,cont:cont,like:0,time:time},(err,resout)=>{
            if(err) throw err;
            res.send('1')
        })   
    })   
})

app.get('/getcom',(req,res)=>{
    var id=req.query.id;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var comment=db.collection("comment");
        comment.find({id:id},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('0')
            }
        })
    })
})

app.get('/hqx',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var lsj=db.collection('hqx');
        lsj.find({},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send(0)
            }
        })
    })
})

app.post("/user",(req,res)=>{
    var id=req.body.id*1;
    var username=req.body.username;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var user=db.collection("user")
        var toutiao=db.collection('toutiao')
        // user.insert({username:username,id:id},(err,resout)=>{
        //     if(err) throw err;
        //     res.send("1")
        // })
       async.waterfall([function(callback){
            toutiao.find({id:id},{_id:0}).toArray((err,resout)=>{
                if(err) throw err;
                if(resout.length>0){
                    callback(null,resout)
                }else{
                    callback(null,'0')
                }
            })
       },function(sql,callback){
           user.insert({username:username,id:id,cont:sql},(err,resout)=>{
            if(err) throw err;
           callback(null,resout)
         })
       }],function(err,resout){
            if(err) throw err;
            if(resout){
                res.send("0")
            }
       })
    })

})


app.get('/mylike',(req,res)=>{
    var username=req.query.username;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var user=db.collection("user")
        user.find({username:username}).toArray((err,resout)=>{
            if(err) throw err;
            console.log(resout)
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send("0")
            }
        })
    })
})

server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})