const {CityRepository}  = require('../repositories/city-repository');
const AppError = require('../utils/errors/app-error');
const {StatusCodes}=require('http-status-codes');

const cityRepository=new CityRepository();

async function createCity(data) {
    try {
        const city=await cityRepository.create(data);
        return city;
    } catch (error) {
        console.log("error",error);
        
        if((error.name='SequelizeValidationError' )|| (error.name = 'SequelizeUniqueConstraintError')){
            let explanation=[];
            error.errors.forEach((err) => {
                explanation.push(err.message); 
            });
            console.log("in city service",explanation);
            
            throw new AppError(explanation,StatusCodes.BAD_REQUEST);
        }
        throw new AppError('cannot create a new city object',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCities(){
    try{
    const city=await cityRepository.getAll();
    return city;
    }
    catch(error){
        throw new AppError('unable to fetch all the airplanes',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function getCity(id){
    try{
        console.log('service',id);
        
    const city=await cityRepository.get(id);
    console.log('serviceresult',city);
    
    return city;
    }
    catch(error){
        if(error.statusCode=StatusCodes.NOT_FOUND){
            throw new AppError('the city your are requested is not present',error.statusCode);
        }
        throw new AppError('unable to fetch all the city',StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function destroyCity(id){
    try {
        const response = await cityRepository.destroy(id);
        return response;
    } catch (error) {
        if(error.statusCode=StatusCodes.NOT_FOUND){
            throw new AppError('the city you want to delete  is not present',error.statusCode);
        }
       throw new AppError('cannot delete the city',StatusCodes.INTERNAL_SERVER_ERROR); 
    }
}

async function updateCity(id,data){
    try{
        console.log("here the body in service is",id);
        console.log("here the  body in service  is",data);
        
        const city=await cityRepository.update(id,data);
        console.log("the response body from service is is",city);
        return city;
    } catch(error) {
        if(error.statusCode=StatusCodes.NOT_FOUND){
            throw new AppError('the city you want to update is not present',error.statusCode);
        }
       throw new AppError('cannot delete the city',StatusCodes.INTERNAL_SERVER_ERROR); 
    
    }
}

module.exports={
createCity,
getCities,
getCity,
destroyCity,
updateCity
}