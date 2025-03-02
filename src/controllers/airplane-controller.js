const {StatusCodes} = require('http-status-codes');
const {AirplaneService}=require('../services');
const { response } = require('express');


async function createAirplane(req,res) {
    console.log('hii :>> ');
    try {
        console.log("inside controller routes");
        console.log("reqofbody",req.body);
        const airplane=await AirplaneService.createAirplane({
            modelNumber: req.body.modelNumber,
            capacity:req.body.capacity
        });
        console.log("created airplane:" ,airplane)
        return res
            .status(StatusCodes.CREATED)
            .json({
                success:true,
                message:'Successfully created a plane',
                data:airplane,
                error:{}
            });
    } catch (error) {
        console.error("Error fetching airplanes:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({
            success:false,
            message:'Something went wrong while creating airplane',
            data:{},
            error: error 
        });
    }
}

module.exports={
    createAirplane
}