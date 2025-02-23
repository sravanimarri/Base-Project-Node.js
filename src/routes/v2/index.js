const express=require('express');
const { InfoController } = require('../../controllers');

const router=express.Router();

router.get('/info2',InfoController.info2);

module.exports=router;