var express = require('express');
var router = express.Router();
var sprintf = require('sprintf-js').sprintf;
const bcrypt = require('bcryptjs');
const con = require('../dbconfig');

const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const jimp=require('jimp');
const multer = require('multer');
const path = require('path');
// // const nodemailer =require('nodemailer');

// var MailConfig = require('./email');
// var hbs = require('nodemailer-express-handlebars');



// require('dotenv').config();

// const nodemailer = require('nodemailer');
// const log = console.log;

// // Step 1
// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'Stashook2023@gmail.com',
//                 pass: 'Stashook@123'
//         //  || '1234' // TODO: your gmail password
//     }
// });

// // Step 2
// let mailOptions = {
//     from: 'stashook2023@gmail.com', // TODO: email sender
//     to: 'muthu@stashook.com', // TODO: email receiver
//     subject: 'Nodemailer - Test',
//     text: 'Wooohooo it works!!'
// };
// // d=
// // Step 3
// router.get('/mailsends',transporter.sendMail(mailOptions), function(err, data) {
//     if (err) {
//         return log('Error occurs');
//     }
//     // return log('Email sent!!!');
//     // data.send("S");
// });

// // 

// //mailsend
// // router.post('/mailsend' , function (req,res){
//   router.get('/email/template', (req, res, next) => {
//     MailConfig.ViewOption(gmailTransport,hbs);
//     let HelperOptions = {
//       from: '"muthuslm2006" <muthuslm2006@gmail.com>',
//       to: 'muthu@stashook.com',
//       subject: 'Hellow world!',
//       template: 'test',
//       context: {
//         name:"Muthalagan",
//         email: "muthuslm2006@gmail.com",
//         address: "chennai stashook"
//       }
//     };
//     gmailTransport.sendMail(HelperOptions, (error,info) => {
//       if(error) {
//         console.log(error);
//         res.json(error);
//       }
//       console.log("email is send");
//       console.log(info);
//       res.json(info)
//     });
//   });
  
//   router.get('/email/smtp/template', (req, res, next) => {
//     MailConfig.ViewOption(smtpTransport,hbs);
//     let HelperOptions = {
//       from: '"Tariqul islam" <muthu@stashook.com>',
//       to: 'muthuslm2006@gmail.com',
//       subject: 'Hellow world!',
//       template: 'test',
//       context: {
//         name:"stashook muthu",
//         email: "muthuslm2006@gmail.com",
//         address: "mohanur"
//       }
//     };
//     smtpTransport.verify((error, success) => {
//         if(error) {
//           res.json({output: 'error', message: error})
//           res.end();
//         } else {
//           smtpTransport.sendMail(HelperOptions, (error,info) => {
//             if(error) {
//               res.json({output: 'error', message: error})
//             }
//             res.json({output: 'success', message: info});
//             res.end();
//           });
//         }
//     })
    
//   });
  

//End mail 
//get categeroies with id

router.get('/getcategory/:catid', function (req, res) {
  var getresisterQ = "SELECT * FROM category WHERE catid=" + req.params.catid;
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      res.send(result);
    }
  });
});




// authloginwithtoken
// medile ware create
const authlogin = (req, res, next) => {
  headers = { 'Content-Type': 'application/json' };
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jsonwebtoken.verify(token, process.env.ACCESS_TOKEN, (err, obj) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.username = obj.username;
    req.password = obj.password;
    next();

  })
}

router.get('/getcategory',authlogin ,function (req, res, next) {
  // res.send('respond with a resource');

  var getresisterQ = "SELECT * FROM category"

  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      res.send(result);
    }
  });
});

//getcategoryname
router.get('/getcategoryname/:searchname', function (req, res, next) {
  var getresisterQ = "SELECT * FROM category WHERE categories LIKE '%" + req.params.searchname + "%' OR catid LIKE '%" + req.params.searchname + "%'";
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      res.send(result);
    }
  });
});

//get categeroies
router.get('/getcategory', authlogin, function (req, res) {
  try {
    var getresisterQ = "SELECT y * FROM category"
    con.query(getresisterQ, function (error, result) {

      if (error) {
        res.send("Unable to get data" + error);
      }
      else {
        res.send(result);
      }
    });
  }
  catch (e) {
    console.log("Catch");
    const statusCode = e.statusCoderes || 500;
    res.status(statusCode, "Error").json({ success: 0, message: e.message, status: statusCode });
  }
});


//get appoinement
// router.get('/getappointment', authlogin, (req, res) => {
//   var getapp = "SELECT appointment.appDrId,das.drAppDate,user.username ,user.gender FROM userrolemap urm ,appointment,user ,doctorappointmentslot das WHERE user.id= urm.userId AND urm.roleId=2 AND user.id=appointment.appPatientId AND appointment.appSlotId=das.slotId AND appointment.appDrId= " + req.query.appDrId + " AND das.drAppDate='" + req.query.drAppDate + "'";
//   con.query(getapp, function (error, result) {
//     if (error) {
//       console.log(error)
//       res.send("Unable to get data");
//     }
//     else {
//       console.log("Getapp", getapp);
//       console.log("resu", result);
//       res.send(result);
//     }
//   });
// });

router.get('/getappointment', authlogin,function (req, res) {
  // var getapp = "SELECT u.username,app.appDrId, dps.drAppDate FROM appointment app,doctorappointmentslot dps, user u WHERE u.id=dps.slotId AND appDrId= AND drAppDate=" +req.query.appDrId + req.query.drAppDate;
  // var getappold="SELECT appointment.appDrId,doctorappointmentslot.drAppDate,user.username FROM appointment INNER JOIN doctorappointmentslot ON appointment.appSlotId=doctorappointmentslot.slotid INNER JOIN user ON appointment.appDrId=user.id WHERE appointment.appDrId=" +req.query.appDrId +" AND doctorappointmentslot.drAppDate='"+req.query.drAppDate+"'";
    var getapp="SELECT appointment.appDrId,appointment.id,appointment.appStatusId,das.drAppDate,das.slot,user.username,user.gender FROM userrolemap urm ,appointment,user ,doctorappointmentslot das WHERE user.id= urm.userId AND urm.roleId=2 AND user.id=appointment.appPatientId AND appointment.appSlotId=das.slotId AND appointment.appDrId= " +req.query.appDrId +" AND das.drAppDate='"+req.query.drAppDate+"'";
    con.query(getapp, function (error, result) {
    if (error) {
      
      console.log(error)
      res.send("Unable to get data");
    }
    else {
      console.log(getapp);
      console.log(result);
      res.send(result);
    }
  });
});

/* GET user listing. */

router.get('/getuser', authlogin, function (req, res) {
  var getuserlist = "SELECT * FROM user ";
  con.query(getuserlist, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      res.send(
        result
      );
    }
  });
  process.on('uncaughtException', error => {
    //not single qut this near 1 keyword 
    console.error(`Error : ${error}`)
    process.exit(1);
  });
})

//doctorcategorymap
router.get('/doctorcategorymap', authlogin, function (req, res) {
  try {
    var getresisterQ = "SELECT  u.username as DocName,u.gender,u.email ,u.id as DocId,dcm.categoryId,dcm.docexpreience,dcm.drDesignation ,cat.categories FROM category cat, doctorcategorymap dcm, user u  WHERE dcm.userId=u.id AND cat.catid=dcm.categoryId"
    con.query(getresisterQ, function (error, result) {
      if (error) {
        console.log(error);
        res.send("Unable to get data");
      }
      else {
        res.send({
          status: true,
          result
        });
      }
    });
  }
  catch (e) {
    const statusCode = e.statusCoderes || 500;
    e.status = error.status || `error`;
    res.status(statusCode).json({ success: 0, message: error.message, status: error.statusCode, stack: err.stack });
  }

});



//get doctorby category
router.get('/getDoctorByCategory', authlogin, function (req, res, next) {
  var getresisterQ = "SELECT u.username as DocName,dcm.docexpreience,dcm.doccertificatenum,dcm.categoryId, dcm.drDesignation,dcm.userId as DocId,cat.categories FROM category cat,doctorcategorymap dcm, user u WHERE cat.catid=dcm.categoryId AND dcm.userId= u.id AND dcm.categoryId=" + req.query.categoryId;
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      res.send({
        status: true,
        result
      });
    }
  });

}
);

//getuser id base
router.get('/getuser/:id', function (req, res, next) {
  var getresisterQ = "SELECT * FROM user WHERE id=" + req.params.id;
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      res.send(result);
    }
  });
});

//get user with username
router.get('/getusers/:searchname', function (req, res, next) {
  var getresisterQ = "SELECT * FROM user WHERE username LIKE '%" + req.params.searchname + "%' OR id LIKE '%" + req.params.searchname + "%'"
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      res.send(result);
    }
  });
});


//update to user table and file name in save in imageUrl field and image save to local

// const storageimage=multer.diskStorage({
//   destination:'C:/images/',
//   filename:(req,file,cb)=>{
//     return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const uploadd=multer({
//   storage:storageimage
// })
// router.post('/updateuserimage:/id',uploadd.single('image'),function(req,res){


//   var imageurl = req.file.filename;
//   data[
//   imgafile=imageurl.filename
//   ]
//   console.log("img",imgafile);
//   // var command='UPDATE user SET imageUrl="'+req.file.filename+'" WHERE id="'+req.params.id+'"' ;
//   var command='UPDATE user SET imageUrl='+imgafile+' WHERE id="'+req.params.id+'"' ;
//   console.log(command);
//   let data = [true, 1];
//   con.query(command, data, function (error, result) {

//     if (error) {
//       console.log(error);
//       res.send({ status: false, message: error });

//       console.log(error);
//       throw error;
//     }
//     else {
//       console.log("re" + result)
//       res.status(200).send("Successfully Update image in user table");
//     }
//   });
// })



//***jpg to gif ***** */
//convert collection of jpg file to gif file 
const GIFEncoder = require('gifencoder');
const { createCanvas, loadImage } = require('canvas');
// const { error } = require('console');

const width = 400;
const height = 400;

router.get('/addimagetogif', (req, res) => {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  const encoder = new GIFEncoder(width, height);
  // encoder.createReadStream().pipe(fs.createWriteStream('./output/result'+Date.now()+'.gif'));
  //store c: drive but create foolder for images folder in c drive
  encoder.createReadStream().pipe(fs.createWriteStream('C:/images/result' + Date.now() + '.gif'));
  encoder.start();
  encoder.setRepeat(0);
  encoder.setDelay(1000);
  encoder.setQuality(10);
  const imgList = fs.readdirSync('./images/');
  imgList.forEach(async (f, i) => {
    const image = await loadImage(`./images/${f}`);
    ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);
    encoder.addFrame(ctx);
    if (i === imgList.length - 1) {
      encoder.finish();
      var imgHex = '47494638396101000100800000dbdfef00000021f90401000000002c00000000010001000002024401003b';
      var imgBinary = new Buffer(imgHex, 'hex');
      res.writeHead(200, { 'Content-Type': 'image/gif' });
      res.end(imgBinary, 'binary');
    }
  });
});
//***End Jpg to gif **** */





// addimagetodatabase table for userimage
//storage

const storage = multer.diskStorage({
  destination: 'C:/images/',

  filename: (req1, file, cb) => {
    // console.log("Request name ",req1.params.id);
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    // return cb(null,`${file.fieldname}_`+req1.params.id+`${path.extname(file.originalname)}`)
  }
})

const createimage = async (req, res, next) => {

  var data = {

    imageUrl: req.file.filename,

    // userImage:userImg.filename,
    // status:1
  }
  // console.log("Filename",req.file.filename);
  let result = await con.query("update user set imageUrl='" + req.file.filename + "' WHERE id=" + req.body.id, function (err, rows) {
    if (err) {
      console.log(err);
      res.send({
        message: "errpr", err
      })
    }
    else {
      res.send({ message: "save" })
    }
  })
}
// const { nextTick } = require('process');
const upload = multer({
  storage: storage
})
router.post('/updateuserimage', upload.single('images'), createimage)

//**** End  */



//alter tamil with get image and send response imp
//get image from id base

router.get('/getuserimage/:id', function (req, res) {
  var getresisterQ = "SELECT imageUrl FROM user WHERE id=" + req.params.id;
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      console.log("userimage", result);
      const imagefile = fs.readFileSync('C:/images/' + result[0].imageUrl);
      const bl = Buffer.from(imagefile, 'binary');

      res.send({ "FileName1": result[0].imageUrl, "file": bl });

    }
  });
});
//****End  */
//*** St

router.get('/getuserimagefromlocal', function (req, res) {
  var getresisterQ = "SELECT imageUrl FROM user WHERE id=" + req.query.id;
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      console.log("userimage", result);
      const imagefile = fs.readFileSync('C:/images/' + result[0].imageUrl);
      const bl = Buffer.from(imagefile, 'image/jpeg');
      res.contentType('image/jpeg');
      
      res.send(bl);
      res.end();
      

    }
  });
});
//End  */


//**new St Api  */

router.get('/getuserimage', function (req, res) {
  var getuserlist = "SELECT * FROM userimage ";
  con.query(getuserlist, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data");
    }
    else {
      const buf = Buffer.from(result);
      res.send(
        buf
      );
    }
  });
  process.on('uncaughtException', error => {
    //not single qut this near 1 keyword 
    console.error(`Error : ${error}`)
    process.exit(1);


  });
})



//*** END  */

//St doc desi
router.get('/doctordetail',function(req,res){
  // var cmdd=('select * from user');
var cmdd='select u.userName,app.appDrId,(SELECT drAppDate FROM doctorappointmentslot WHERE slotId=app.appslotid )as appointmentDate,(SELECT slot FROM doctorappointmentslot WHERE slotId=app.appslotid )as slot, (SELECT drDesignation FROM doctorcategorymap WHERE userId=u.id) AS designation from user u, appointment app where app.appDrId=u.id AND app.id='+ req.query.id;
console.log(cmdd);
con.query(cmdd,function(err,result){
  console.log("result",result);
  if(err){
    console.log(err);
  }
  else{
    res.send(result);
  }

})
}
);
//end doc desi
//rating post
router.post('/rating', authlogin ,(req, res) => {
  try {
    // console.log(req.body);
    var cmd = sprintf('SELECT appDrId FROM appointment  WHERE appointment.id=' + req.body.appId);
    con.query(cmd, function (err, getappdrid) {
      console.log("drI", getappdrid);
      // var command = ('INSERT INTO rating (appId,ratingStars,drId,ratingReviewCmd,status) VALUES (%d, %d, %d, "%s", %b);', req.body.appId, req.body.ratingStars,getappdrid[0],req.body.ratingReviewCmd, 1);

      var command = sprintf('INSERT INTO rating (appId,ratingStars,drId,ratingReviewCmd,status) VALUES (%d, %d, %d, "%s", %b);', req.body.appId, req.body.ratingStars, getappdrid[0].appDrId, req.body.ratingReviewCmd, 1);

      console.log("com", command);
      con.query(command, function (err, ratingresult) {
        if (err) throw err;
        var com = sprintf('SELECT COALESCE(SUM(ratingStars),0)  AS SUMOfTot ,COUNT(ratingStars) as ratCount FROM rating  WHERE drId=' + getappdrid[0].appDrId);
        console.log("rresult", ratingresult);
        console.log(com);
        con.query(com, function (err, sel) {
          if (err) throw err;
          var command = sprintf('UPDATE user u SET u.rating=TRUNCATE(' + sel[0].SUMOfTot / sel[0].ratCount + ',2),u.ratingCount=' + sel[0].ratCount + ' WHERE u.id=' + getappdrid[0].appDrId);
          // console.log("update", command);
          con.query(command, function (err, rating) {
            if (err) throw err;
            var appstupdate=sprintf('update appointment SET  appStatusId=7 WHERE appointment.id=' + req.body.appId);
            
            con.query(appstupdate, function (err, sel) {
              if(err)
            { res.send({ status: false, message: err }); }
                        else { res.status(200).send("Rating added Successfully in rating and user table"); }
          });
        })
      })
    })
  }
)}
  catch (e) {
    const statusCode = e.statusCoderes || 500;
    res.status(statusCode, "Error").json({ success: False, Error: e.message, ErrorCode: statusCode });
  }
})


router.post('/adduser', (req, res) => {


  console.log(req.body);
  con.query("select count(email) count from user where email=?", [req.body.email], async (error, result) => {
    console.log("Error", error, result[0].count);
    if (result[0].count > 0) {
      res.send({ status: true, message: "Already email id exist give correct email id " })
      return;
    }
    else {
      let hashedPassword = await bcrypt.hash(req.body.password, 8);
      var command = sprintf('INSERT INTO user (username, password,gender,email,phonenumber,imageUrl,status) VALUES ("%s", "%s","%s","%s","%s","%s",%b);', req.body.username, hashedPassword, req.body.gender, req.body.email, req.body.phonenumber, req.body.imageUrl, 1);
      con.query(command, function (err, mysqlres1) {
        if (err) throw err;
        id = mysqlres1.insertId


        console.log(mysqlres1, 'Last insert ID in User:', mysqlres1.insertId);
        var command = sprintf('INSERT INTO userrolemap (userId ,roleId) VALUES (%d, %d);', id, req.body.usertype);

        con.query(command, function (err, mysqlres2) {

          if (err) {

            res.send({ status: false, message: error });
          }
          else {
            if (req.body.usertype != 1)
              res.status(200).send("Patient added Successfully");
          }
        });

      })
    }
  }

  )

})

//adduser with login for doctor register
router.post('/adduserwithlogin', authlogin, (req, res) => {


  // console.log(req.body);
  con.query("select count(email) count from user where email=?", [req.body.email], async (error, result) => {
    console.log("Error", error, result[0].count);
    if (result[0].count > 0) {
      res.send({ status: true, message: "Alreadty email id exist give correct email id " })
      return;
    }
    else {
      let hashedPassword = await bcrypt.hash(req.body.password, 8);
      var command = sprintf('INSERT INTO user (username, password,gender,email,phonenumber,imageUrl,status) VALUES ("%s", "%s","%s","%s","%s","%s",%b);', req.body.username, hashedPassword, req.body.gender, req.body.email, req.body.phonenumber, req.body.imageUrl, 1);
      con.query(command, function (err, mysqlres1) {
        if (err) throw err;
        id = mysqlres1.insertId

        console.log('Last insert ID in User:', mysqlres1.insertId);
        var command = sprintf('INSERT INTO userrolemap (userId ,roleId) VALUES (%d, %d);', id, req.body.usertype);
        con.query(command, function (err, mysqlres2) {

          if (err) { res.send({ status: false, message: erro }); }
          else {
            if (req.body.usertype != 1)
              res.status(200).send("Patient added Successfully");
          }
        });
        if (req.body.usertype == 1) {
          var command = sprintf('INSERT INTO doctorcategorymap (userId ,categoryId,docexpreience,doccertificatenum,drDesignation) VALUES (%d, %d,%f,%s,"%s");', id, req.body.categoryId, req.body.docexpreience, req.body.doccertificatenum, req.body.drDesignation);
          // console.log("doc",command);
          con.query(command, function (err, mysqlres2) {
            // console.log(command);
            if (err) { res.send({ status: false, message: error }); }

            else {
              res.status(200).send("Doctor added Successfully");
            }
          });
        }
      })
    }
  }

  )

})


// // http://localhost:3002/auth
// router.post('/auth', async function (request, response) {
//   // Capture the input fields
//   let username = request.body.username;
//   let password = request.body.password;
//   if (username && password) {
//     con.query('SELECT *FROM user,userrolemap WHERE id=userId AND username = ?  ', [request.body.username], function (error, results) {
//       if (results.length > 0) {
//         // console.log("Error", error, results[0]);
//         console.log("Error", error);

//         // console.log(results, "check", results[0].password);
//         bcrypt
//           .compare(request.body.password, results[0].password)
//           .then(res => {
//             // console.log("res", res) // return true
//             if (res && results.length > 0) {
//               const accesstoken = jsonwebtoken.sign({ username, password }, process.env.ACCESS_TOKEN);
//               // console.log("token", accesstoken);
//               var type = '';
//               if (results[0].roleId == 3) {
//                 type = "Admin"
//                 response.status(200).send({ appId: appoiid, stsId: statusId, accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
//                 response.end();

//               }
//               else if (results[0].roleId == 1) {
//                 type = "Doctor"
//                 response.status(200).send({ appId: appoiid, stsId: statusId, accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
//                 response.end();
//               }
//               else {
//                 type = "Patient"
//                 if (type == "Patient") {
//                   var appoiid = 0;
//                     var statusId = 0;
//                   comm = "SELECT * FROM appointment app WHERE app.appPatientId=" + results[0].userId + " AND appStatusId=4";
//                   con.query(comm, function (req, res) {
//                                         if (res.length > 0) {
                      
//                       appoiid = res[0].id;
//                       console.log("appid",appoiid);
//                       statusId = res[0].appStatusId;
//                       console.log(statusId);                                           } 
//                     // response.status(200).send({ appId: appoiid, stsId: statusId, accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
//                     else { }
//                     response.status(200).send({ appId: appoiid, stsId: statusId, accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
//                     // res.end();
//                   }
//                   // response.status(200).send({ appId: appoiid, stsId: statusId, accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });

//                   );
//                 }
              
//               }
//               response.status(200).send({ appId: appoiid, stsId: statusId, accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
//               // response.status(20 0).send({ accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
//             }
//             else {
//               response.status(401).send('Incorrect Username and/or Password!');

//             }
//             response.end();
//           })
//           .catch(err => console.error(err.message))
//       } else {
//         response.status(401).send('Incorrect Username and/or Password!');
//         response.end();
//       }
//     }
//     );
//   } else {
//     response.status(401).send('Please enter Username and Password!');
//     response.end();
//   }
// });



// http://localhost:3002/auth
router.post('/auth', async function (request, response) {
  // Capture the input fields
  let username = request.body.username;
  let password = request.body.password;
  if (username && password) {
   con.query('SELECT *FROM user,userrolemap WHERE id=userId AND username = ?  ', [request.body.username], function (error, results) {
      if (results.length > 0) {
        // console.log("Error", error, results[0]);
        console.log("Error", error);
        // console.log(results, "check", results[0].password);
        bcrypt
          .compare(request.body.password, results[0].password)
          .then(res => {
            // console.log("res", res) // return true
            if (res && results.length > 0) {
              const accesstoken = jsonwebtoken.sign({ username, password }, process.env.ACCESS_TOKEN);
              // console.log("token", accesstoken);
              var type = '';
              if (results[0].roleId == 3) {
                type = "Admin"
                response.status(200).send({ accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
                response.end();
              }
              else if (results[0].roleId == 1) {
                type = "Doctor"
                response.status(200).send({ accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
                response.end();
              }
              else {
                type = "Patient"
                            if (type == "Patient") {
                comm = "SELECT * FROM appointment app WHERE app.appPatientId=" + results[0].userId + " AND appStatusId=4";
                  con.query(comm, function (req, res) {
                    var appoiid = 0;
                    var statusId = 0;
                                        if(res.length>0){
                    appoiid = res[0].id;
                    statusId = res[0].appStatusId;
                    }
                    // else{}
                    response.status(200).send({ appId: appoiid, stsId: statusId, accesstoken: accesstoken, usertype: type, username: results[0].username, userId: results[0].userId, email: results[0].email, phonenumber: results[0].phonenumber, Gender: results[0].gender });
                     response.end();
                  }
                  );}                              }
                  //
                          }
                          else
                          {
                            response.status(401).send('Incorrect Username and/or Password!');
                             response.end();
            }
            //  response.end();
                      })
          .catch(err => console.error(err.message))
      } else {
        response.status(401).send('Incorrect Username and/or Password!');
        response.end();
      }
    }
    );
  } else {
    response.status(401).send('Please enter Username and Password!');
    response.end();
  }
});


//get user doctor

router.get('/getdoctorlist/:searchname', authlogin, function (req, res) {
  try {
    var getresisterQ = "SELECT u.username ,dcm.docexpreience ,dcm.drDesignation FROM user u, userrolemap urm  ,doctorcategorymap dcm WHERE username LIKE '%" + req.params.searchname + "%' AND u.id=urm.userId AND urm.roleId=1 AND u.id=dcm.userId ";

    con.query(getresisterQ, function (error, result) {
      // console.log(getresisterQ);
      if (error) {
        // console.log(getresisterQ);
        res.send("Unable to get data");
        // console.log(error.message);

      }
      else {
        res.send({ status: true, result });
      }
    });
  }

  catch (e) {
    const statusCode = e.statusCoderes || 500;
    res.status(statusCode, "Error").json({ success: False, Error: e.message, ErrorCode: statusCode });
  }
});


//get user doctor with error hand

// router.get('/getdoctorlistnew',authlogin, function (req, res, next) {
//     var getresisterQ = "SELECT * FROM user u, userrolemap urm  WHERE u.id=urm.userId AND urm.roleId=1"
//   con.query(getresisterQ, function (err, result1) {
//     try{
//     res.send(200).json({
//       status:'success',
//       message:"d",
//         result1

//     }) 
// }
//   catch(err)
//   {
//     res.status(404).json({
//       status:'fail',
//       message:err.message
//     })
//   }
//   });
// });

//add appoinment
router.post('/addappointment', authlogin, (req, res) => {

  var command = sprintf('INSERT INTO appointment (patientComment,reason,appDrId,appPatientId,appSlotId,appStatusId) VALUES ("%s", "%s", %d, %d, %d, %d);', req.body.patientComment, req.body.reason, req.body.appDrId, req.body.appPatientId, req.body.appSlotId, 2);
  con.query(command, function (error, mysqlres3) {
    console.log("appointmentID", mysqlres3.insertId);
    if (error) {
      res.send({ status: false, message: error });
      console.log(error);
    }
    else {
      console.log(req.body)
      res.status(200).send("Successfully appointmented");
    }
  });
});

//Doctor appoinmentUopdate 
router.post('/doctorAppointmentUpdate/:id', (req, res) => {
  var id = req.params.id;
  var dr = req.body.drPrescription;
  var followUpDate = req.body.followUpDate;
  var patientReport = req.body.patientReport;
  var appStatusId = req.body.appStatusId;

  var command = 'UPDATE appointment SET drPrescription="' + dr + '",followUpDate="' + followUpDate + '", patientReport="' + patientReport + '" , appStatusId="' + appStatusId + '" WHERE id = ' + id + '';
  let data = [true, 1];
  con.query(command, data, function (error, result) {
    if (error) {
      res.send({ status: false, message: error });

      console.log(error);
      throw error;
    }
    else {
      console.log("re" + result)
      res.status(200).send("Successfully Doctor Update");
    }
  });

});
//Doctor Review Pending
router.post('/doctorreviewpending/:id', (req, res) => {
  var id = req.params.id;
  // var dr = req.body.drPrescription;
  // var followUpDate = req.body.followUpDate;
  // var patientReport = req.body.patientReport;
  // var appStatusId = req.body.appStatusId;

  var command = 'UPDATE appointment SET  appStatusId=4 WHERE id = ' + id + '';
  let data = [true, 1];
  con.query(command, data, function (error, result) {
    if (error) {
      res.send({ status: false, message: error });

      console.log(error);
      throw error;
    }
    else {
      console.log("re" + result)
      res.status(200).send("Successfully Doctor Review Update");
    }
  });

});

//Doctor appoinment Cancel
router.post('/doctorAppointmentCancel/:id', authlogin, (req, res) => {
  var id = req.params.id;
  var cmd = 'SELECT * FROM appointment WHERE  appStatusId=1 AND id=' + id;
  con.query(cmd, function (error, getresult) {
    if (getresult.length > 0 && getresult[0].appStatusId == 1) {
      res.send("Already Cancel");

    }
    else {
      var command = 'UPDATE appointment SET appStatusId=3 WHERE id=' + id + ' ';
      let data = [true, 1];
      con.query(command, data, function (error, result) {
        if (error) {
          res.send({ status: false, message: error });
          console.log(error);
          throw error;
        }
        else {
          res.status(200).send("Successfully Doctor Cancel");
        };
      });
    }
  })
});


process.on('uncaughtException', error => {
  //not single qut this near 1 keyword 
  console.error(`Error : ${error}`)
  process.exit(1);
})

//Patient appoinment Cancel
router.post('/patientAppointmentCancel/:id', authlogin, (req, res) => {
  var id = req.params.id;
  var cmd = 'SELECT * FROM appointment WHERE  appStatusId=3 AND id=' + id;
  con.query(cmd, function (error, getresult) {
    if (getresult.length > 0 && getresult[0].appStatusId == 3) {
      res.send("Already Cancel");

    }
    else {
      var command = 'UPDATE appointment SET appStatusId=1 WHERE id=' + id + ' ';
      let data = [true, 1];
      con.query(command, data, function (error, result) {
        if (error) {
          res.send({ status: false, message: error });
          console.log(error);
          throw error;
        }
        else {
          res.status(200).send("Successfully Patient Cancel");
        };
      });
    }
  })

});



// router.get('/getdoctorslot', authlogin, function (req, res, next) {
//   var getresisterQ = "SELECT *,false as booked FROM doctorappointmentslot WHERE appDrId =" + req.query.appDrId + " AND drAppDate='" + req.query.drAppDate + "'";

//   con.query(getresisterQ, function (error, result) {
//     if (error) {
//       console.log(error);
//       res.send("Unable to get data1");
//     }
//     else {
//       var getothertabel = "SELECT GROUP_CONCAT( appSlotId) as slotId FROM appointment app WHERE app.appDrId=" + req.query.appDrId + " AND app.appSlotId IN (SELECT slotId FROM doctorappointmentslot WHERE appDrId=" + req.query.appDrId + " AND drAppDate='" + req.query.drAppDate + "')";
//       con.query(getothertabel, function (errorInside, resultInside) {
//         if (errorInside) {
//           console.log(errorInside);
//           res.send("Unable to get data2");
//         }
//         else {
//           console.log(result, resultInside);
//           res.send({ "Slots": result, "BookedSlots": resultInside });
//         }
//       });
//     }
//   });
//   next(err);
// });

router.get('/getdoctorslot',authlogin,function(req,res){
  var getresisterQ = "SELECT *,false as booked FROM doctorappointmentslot WHERE appDrId =" + req.query.appDrId+ " AND drAppDate='"+req.query.drAppDate+"'";
  //console.log(getresisterQ);
  con.query(getresisterQ, function (error, result) {
    if (error) {
      console.log(error);
      res.send("Unable to get data1");
    }
    else {
    //  var soltId=
      // var getothertabel="SELECT appSlotId FROM appointment app WHERE app.appDrId =" + req.body.drId+ " AND app.appSlotId IN ("+req.body.drAppDate+")";
      var getothertabel="SELECT GROUP_CONCAT( appSlotId) as slotId FROM appointment app WHERE app.appDrId = " + req.query.appDrId+ " AND app.appSlotId IN (SELECT slotId FROM doctorappointmentslot WHERE appDrId =" + req.query.appDrId+ " AND drAppDate='"+req.query.drAppDate+"')";
      //console.log(getothertabel);
con.query(getothertabel,function(errorInside,resultInside){
if (errorInside) {
  console.log(errorInside);
  res.send("Unable to get data2");
}
else {
console.log(result,resultInside);
      res.send({"Slots": result,"BookedSlots":resultInside});
    }   });
}  });
});

//insert slot
router.post('/doctorslot', authlogin, (req, res) => {
  var date = "'" + req.body.date + "'";
  var slot = "'" + req.body.slot + "'";
  console.log(date, slot);

  var command = sprintf('INSERT INTO doctorappointmentslot (date,drId,slot) VALUES (%s, %d,%s);', date, req.body.drId, slot);
  con.query(command, function (error, mysqlres5) {
    console.log(command);
    if (error) {
      res.send({ status: false, message: error });
      console.log(error);
    }
    else {
      console.log("slotId", mysqlres5.insertId);
      console.log(req.body)
      res.status(200).send("Successfully update  Doctor slot");
    }
  });
});


//multislot
router.post('/doctormultislot', authlogin, (req, res) => {
  console.log(req.body);
  var drId = req.body.drId;

  var drAppDate = req.body.drAppDate;
  var appStartHour = req.body.appStartHour;
  var appEndHour = req.body.appEndHour;
  var intervalTime = req.body.intervalTime;

  console.log(drId, drAppDate, appStartHour, appEndHour, intervalTime);
  const sql = 'CALL getdoctorappointmentslotlist (?,?,?,?,?)';

  const result1 = con.query(sql, [drId, drAppDate, appStartHour, appEndHour, intervalTime]);
  console.log(result1);
  return result1;
  //   // con.end() ; not working in Store procerder

});

//error handling


module.exports = router;
