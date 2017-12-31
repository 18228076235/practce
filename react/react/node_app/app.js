var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var conn = require('./conn.js');
var async=require("async")

var app = express();

//var hostname = "172.19.103.13"; //服务器主机
 var hostname="localhost"
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
    var number=req.body.number;
    var password=req.body.password;
    var name=req.body.name;
    var word=req.body.name;
    async.waterfall([
        function(callback){
            conn.getDb((err,db)=>{
                if(err) throw err;
                var reg=db.collection("reg")
                reg.find({number:number}).toArray((err,sout)=>{
                    if(sout.length>0){
                        callback(null,sout)
                    }else{
                        callback(null,true)
                    }         
                })
            })
        },function(sql,callback){
            if(sql==true){
                conn.getDb((err,db)=>{
                    if(err) throw err;
                    var reg=db.collection("reg")
                    reg.insert({number:number,password:password},(err,sout)=>{
                      callback(null,true)
                    })
                })
            }else{         
                callback(null,sql)
            }         
        }
    ],function(err,resout){
        if(err) throw err;
        if(resout==true){
            res.send('1')
        }else{
            res.send(resout)
        }
    })
})


app.post('/name',(req,res)=>{
    var number=req.body.number;
    var word=req.body.word;
    var name=req.body.name;
    var sex=req.body.sex;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var reg=db.collection('reg')
        reg.update({number:number},{$set:{name:name,word:word,sex:sex}},(err,resout)=>{
            if(err) throw err;
            res.send(resout)
        })
        db.close()
    })

})
app.get('/login',(req,res)=>{
    var number=req.query.number; 
    conn.getDb((err,db)=>{
        var reg=db.collection('reg')
        if(err) throw err;
        reg.find({number:number}).toArray((err,res)=>{
            if(err) throw err;
            if(res.length>0){
                res.send('1')
            }else{
                res.send('2')
            }
        })
        db.close()
    })

})

app.get('/recommend',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var recommend=db.collection('recommend')
        recommend.find({},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('1')
            }
        })
        db.close()
    })
})


app.get('/recommend_limit',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var recommend=db.collection('recommend')
        recommend.find({},{_id:0}).limit(4).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('1')
            }
        })
        db.close()
    })
})

app.get('/ardetail',(req,res)=>{
    var artId=req.query.artId*1   
 
    conn.getDb((err,db)=>{
        if(err) throw err;
        var detail=db.collection('ardetail')
        detail.find({artId:artId},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;

            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('0')
            }
        })
        db.close()
    })
})

var mongoose=require('mongoose')
app.post('/comment',(req,res)=>{
    var artId=req.body.artId*1 
    var cont=req.body.cont;
    var username=req.body.name;
    var time=req.body.time;
    var commentId=req.body.commentId;
    var isadd=req.body.isadd*1;
  
    var cid = mongoose.Types.ObjectId(commentId);

 
    conn.getDb((err,db)=>{
        if(err) throw err;
        var detail=db.collection('comment')  
        if(cont!=undefined){
            detail.insert({cont:cont,username:username,time:time,artId:artId},(err,resout)=>{
                if(err) throw err;
                    res.send(resout)
            })
        } else{
            detail.update({_id:cid},{$set:{isadd:isadd}},(err,resout)=>{
                if(err) throw err;
                res.send('2')
            })
        }         
        db.close()
    })
})

app.get('/commentdata',(req,res)=>{
    var artId=req.query.artId*1;
  
    conn.getDb((err,db)=>{
        if(err) throw err;
        var comment=db.collection('comment')
        comment.find({artId:artId},{}).toArray((err,resout)=>{

            if(resout.length){
                res.send(resout)
            }else{
                res.send('0')
            }
        })  
        db.close()   
    })
})


//探索页面
app.get('/explore',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var explore=db.collection('explore')
        explore.find({},{_id:0}).toArray((err,resout)=>{
            if(resout.length){
                res.send(resout)
            }else{
                res.send(0)
            }
        })     
    })
})

//分类
app.get('/carelog',(req,res)=>{
    var cateName=req.query.cateName;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var carelog=db.collection('class')
        carelog.find({cateName:cateName},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('0')
            }
        })
    })
})

//column
app.get('/zhuanti',(req,res)=>{
    conn.getDb((err,db)=>{
        if(err) throw err;
        var zhuanti=db.collection('zhuanti')
        zhuanti.find({},{_id:0}).toArray((err,resout)=>{
            if(resout.length){
                res.send(resout)
            }else{
                res.send(0)
            }
        })     
    })
})

//columnDetail
app.get('/columnDetail',(req,res)=>{
    var cateName=req.query.cateName;

    conn.getDb((err,db)=>{
        if(err) throw err;
        var carelog=db.collection('columnDetail')
        carelog.find({"column.name":cateName},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout[0].articles)
            }else{
                res.send('0')
            }
        })
    })
})

//收藏
app.post('/collection',(req,res)=>{
    var username=req.body.username;
    var artId=req.body.artId;
    var check=req.body.check;
    if(check==true){
        conn.getDb((err,db)=>{
            if(err) throw err;
            var like=db.collection('like')
   
            async.waterfall([
                function(callback){
                    var detail=db.collection('ardetail')
                    var artid=artId*1
                    detail.find({artId:artid},{_id:0,artTitle:1,artThumb:1,artEditor:1}).toArray((err,resout)=>{
                        if(err) throw err;             
                           callback(null,resout);
                    })
                },
                function(sql,callback){

                    like.insert({username:username,artId:artId,check:check,sql},(err,resout)=>{
                        if(err) throw err;
                        callback(null,resout)
                    })  
                }
            ],function(err,resout){
                res.send(resout)
            })
              
        })
    }else{
        conn.getDb((err,db)=>{
            if(err) throw err;
            var like=db.collection('like') 

            like.remove({username:username,artId:artId},(err,resout)=>{
                if(err) throw err;
            })     
        })
    }
   
})

app.get('/check',(req,res)=>{
    var username=req.query.username;
    var artId=req.query.artId;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var like=db.collection('like') 
        like.find({username:username,artId:artId},{_id:0,check:1}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout[0].check)
            }else{
                res.send('0')
            }
        })     
    })
})

app.get('/myCollectin',(req,res)=>{
    var username=req.query.username;
    conn.getDb((err,db)=>{
        if(err) throw err;
        var like=db.collection('like') 
        like.find({username:username},{_id:0}).toArray((err,resout)=>{
            if(err) throw err;
            if(resout.length>0){
                res.send(resout)
            }else{
                res.send('0')
            }
        })     
    })
})


server.listen(port, hostname, () => {
    console.log(`Server is running at http://${hostname}:${port}`)
})