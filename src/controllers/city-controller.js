const { CityService } =require('../services');
const { StatusCodes }= require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function createCity(req,res) {
    try {
        const city=await CityService.createCity({
            name:req.body.name
        });
        SuccessResponse.data=city;
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error=error;
        return res
                .status(error.statusCode)
                .json(ErrorResponse);
    }
    
}

async function getCities(req,res){
    try {
        const city=await CityService.getCities();
        SuccessResponse.data=city;
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

async function getCity(req,res){
    try{
        console.log("see",req.params.id);
        const city=await CityService.getCity(req.params.id);
        SuccessResponse.data=city;
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

async function destroyCity(req,res){
    try {
        const city=await CityService.destroyCity(req.params.id);
        SuccessResponse.data=city;
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

async function updateCity(req,res){
    try{
        console.log("here the request body is",req);
        console.log("here the request body is",req.params.id);
        console.log("here the request body is",req.body.name);
        
        const city=await CityService.updateCity(req.params.id,{
            name:req.body.name
        });

        console.log("here the response body from controller is",city);
        SuccessResponse.data=city;
        console.log("here the successresponse body from controller is",SuccessResponse);
        return res
                .status(StatusCodes.CREATED)
                .json(SuccessResponse)
    } catch(error){
        ErrorResponse.error=error;
        console.error("Error fetching city:", error);
        return res
        .status(error.statusCode)
        .json(ErrorResponse);
    }
}

module.exports={
    createCity,
    getCities,
    getCity,
    destroyCity,
    updateCity
}