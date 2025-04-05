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

module.exports={
    createCity,
    getCities
}