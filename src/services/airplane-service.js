const {AirplaneRepository}  = require('../repositories/airplane-repository');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    try {
        console.log("in service",data);
        console.log("inside service routes");
        const airplane= await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
       console.log("in airplane service",error.name);

       if (error.name = 'SequelizeValidationError') {
        let explanation=[];
        console.log("18 error",error);
        
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        console.log("here explanation",explanation);
        throw new AppError(explanation,StatusCodes.BAD_REQUEST);
       }
       throw new AppError('cannot create a new airplane object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplanes(){
    try{
    const airplanes=await airplaneRepository.getAll();
    return airplanes;
    }
    catch(error){
        throw new AppError('unable to fetch all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getAirplane(id){
    try{
        console.log('service',id);
        
    const airplane=await airplaneRepository.get(id);
    console.log('serviceresult',airplane);
    
    return airplane;
    }
    catch(error){
        if(error.statusCode=StatusCodes.NOT_FOUND){
            throw new AppError('the airplane your are requested is not present',error.statusCode);
        }
        throw new AppError('unable to fetch all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyAirplane(id){
    try {
        const response = await airplaneRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode=StatusCodes.NOT_FOUND){
            throw new AppError('the airplane you want to delete  is not present',error.statusCode);
        }
       throw new AppError('cannot delete the airplane',StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

module.exports= {
    createAirplane,
    getAirplanes,
    getAirplane,
    destroyAirplane
};
