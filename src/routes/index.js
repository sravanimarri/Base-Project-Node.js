const express=require('express');

const v1Routes=require('./v1');

const router=express.Router();

console.log("inside api routes");

const v2Routes=require('./v2');

router.use('/v2',v2Routes);

router.use('/v1',v1Routes);


module.exports=router;

