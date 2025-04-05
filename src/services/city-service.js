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




module.exports={
createCity,
getCities
}