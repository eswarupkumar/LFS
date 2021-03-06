const { postitem } = require("../models/category");
const { requestitem } = require("../models/category");
const { requireSignin, userMiddleware } = require("../middleware");
const express = require("express");
const router = express.Router();
// const multer=require('multer')
// const shortid=require('shortid')
// const push=multer({dest:'uploads/'})
const path = require("path");
const SignUp = require("../models/signup");
const category = require("../models/category");

// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, path.join(path.dirname(__dirname),'uploads'))
//     },
//     filename: function (req, file, cb) {
//       cb(null, shortid.generate()+'-'+file.originalname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage })
// push.single("itemPic"),
router.post("/postitem", requireSignin, userMiddleware, async (req, res) => {
  // console.log(req)
  console.log("Hitted the POST successfully ");
  try {
    console.log("try");

    // console.log(req.body.name)
    // console.log(req.body.description)
    // console.log(req.body.itemPictures)
    // console.log(req.user._id)
  
    const newPost = await postitem.create({
      name: req.body.name,
      description: req.body.description,
      type:req.body.type,
      createdBy: req.user._id,
    });
    // if(req.body.itemPictures!=''){
    //   console.log(":Executed:")
    //   newPost.insert({itemPictures:req.body.itemPictures})
    // }
    
    // sendToken(newSignup,201,req,res)
    console.log(newPost);
    res.status(200).json({
      message: "Item Posted",
    });
    // res.send("Done")
  } catch (err) {
        res.status(401).json({
            "Message is":err.message
        });
    }
});
router.post("/founditem", requireSignin, userMiddleware, async (req, res) => {
  try {
    console.log(req.body.name,req.body.description,req.body.itemPictures,req.user._id)
    const newRequest = await requestitem.create({
      name: req.body.name,
      description: req.body.description,
      itemPictures:req.body.itemPictures,
      createdBy: req.user._id,
    });
    // sendToken(newSignup,201,req,res)
    console.log(newRequest);
    res.status(200).json({
      message: "Request Done",
    });
    // res.send("Done")
  } catch (err) {
    res.status(401).json(err.message);
  }
});
router.get("/getitem", (req, res) => {
  postitem.find({}).exec((err, postitems) => {
    if (err) return res.status(400).json({ err });
    if (postitems) {
      
      // let items_list=[]
      // postitems.map((item)=>{
      //   // console.log(item.createdBy)
      //   SignUp.find({_id:item.createdBy}).lean()
      //   .exec((error,info)=>{
      //     if (error) res.status(400).json({'error':error})
      //     // res.json(info)
      //     // console.log(info[0].username)
      //     // res.status(200).json({
      //     // console.log(typeof(item))
      //     item.username=info[0].username
      //     console.log(item)
      //     items_list.push(item)
      //     // console.log(items_list)
      //     // })
      //   })
      // })
      res.status(200).json({
        postitems
      });
    }
  });
});

router.get('/item/:id',(req,res)=>{
  const {id}=req.params
  // console.log(id)
  postitem.find({_id:id})
  .exec((err,item)=>{
    if(err) return res.status(400).json({'Error':err})

    // console.log(item)
    res.status(200).json({
      'Item':item
    })
  })
})
module.exports = router;
