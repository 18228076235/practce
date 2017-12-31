 var mongodb = require("mongodb");
 var MongoClient = mongodb.MongoClient;
 
 var CONN_DB_STR = "mongodb://101.132.180.228:27017/flay";
//var CONN_DB_STR = "mongodb://localhost:27017/haha";


 module.exports = {
     getDb: function(callback) {
         MongoClient.connect(CONN_DB_STR, (err, db) => {
             if (err) {
                 callback(err, null);
             } else {
                 callback(null, db);
             }
         })
     }
 }