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

async function getAirplanes(req,res){
    try {
        const airplanes=await AirplaneService.getAirplanes();
        SuccessResponse.data=airplanes;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }

}

async function getAirplane(req,res){
    try{
        console.log("see",req.params.id);
        const airplane=await AirplaneService.getAirplane(req.params.id);
        SuccessResponse.data=airplane;
        console.log("at 51c",SuccessResponse);
        
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse)
    }
    catch(error){
        ErrorResponse.error=error;
        return res
            .status(error.statusCode)
            .json(ErrorResponse)
    }
}

async function destroyAirplane(req,res){
    try {
        const airplane=await AirplaneService.destroyAirplane(req.params.id);
        SuccessResponse.data=airplane;
        return res
                .status(StatusCodes.OK)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
}

async function updateAirplane(req,res){
    try {
        const airplane=await AirplaneService.updateAirplane(req.params.id,{
            modelNumber: req.body.modelNumber,
            capacity:req.body.capacity
        });
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
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane,
    updateAirplane
}