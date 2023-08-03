var express = require('express');
var router = express.Router();
const pool=require("./pool");
const multer=require("./multer");
const upload = require('./multer');
/* GET home page. */

router.post('/restaurant_submit',upload.any(), function(req, res, next) {
    pool.query("insert into restaurants(restaurantname, ownername, phonenumber, emailid, mobileno, url, fssai, gstno, gsttype, filefssai, fileshopact, filelogo, address, stateid, cityid, createdat, updatedat)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fssai, req.body.gstno, req.body.gsttype, req.files[0].filename, req.files[1].filename, req.files[2].filename, req.body.address, req.body.stateid, req.body.cityid, req.body.createdat, req.body.updatedat],function(error,result){
      if(error){
      console.log(error);
      res.status(200).json({status:false,message:"Database Error",});
      }
      else{
        res.status(200).json({status:true,message:"Restaurant Added Successfully",});
      }
    }
  );
});

router.get('/fetch_all_restaurant',function(req,res){
  pool.query('select * from restaurants',function(error,result){
    if(error){
      console.log(error);
      res.status(200).json({status:false,message:"Database Error",data:[]});
      }
      else{
        console.log(result)
        res.status(200).json({status:true,data:result,message:"Restaurant Added Successfully",});
      }
  })
  })

  router.post('/restaurant_edit_data',upload.any(), function(req, res, next) {
    pool.query("update restaurants set restaurantname=?, ownername=?, phonenumber=?, emailid=?, mobileno=?, url=?, fssai=?, gstno=?, gsttype=?, address=?, stateid=?, cityid=?, updatedat=? where restaurantid=?",[ req.body.restaurantname, req.body.ownername, req.body.phonenumber, req.body.emailid, req.body.mobileno, req.body.url, req.body.fssai, req.body.gstno, req.body.gsttype, req.body.address, req.body.stateid, req.body.cityid, req.body.updatedat,req.body.restaurantid],function(error,result){
    if(error)
    {
        console.log(error)
        res.status(200).json({status:false,message:'Database Error'})
    
    }
    else
    {
        res.status(200).json({status:true,message:'Restaurant Updated Successfully'})
    }
    
    })
    
});

module.exports = router;