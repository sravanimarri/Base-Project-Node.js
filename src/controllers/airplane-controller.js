const {StatusCodes} = require('http-status-codes');
const {AirplaneService}=require('../services');
const { response } = require('express');
const {ErrorResponse,SuccessResponse}=require('../utils/common')


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
        SuccessResponse.data=airplane;
        return res
            .status(StatusCodes.CREATED)
            .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        console.error("Error fetching airplanes:", error);
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

module.exports={
    createAirplane
}