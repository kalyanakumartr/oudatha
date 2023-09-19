const mysql =require('mysql');
const doenv=require('dotenv');
doenv.config({
    path:"./.env",
});
var connections=mysql.createConnection({
    // host:'localhost',
    // user:'root',
    // password:'root',
    // database:'oudatha'

    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE
});
connections.connect(function(err)
{
    if(!!err)
    {
        console.log(err);
    }
    else
    {
        console.log("Connected");
        // console.log(Math.abs(-7.25));
    }
});


module.exports=connections ;