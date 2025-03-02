const {AirplaneRepository}  = require('../repositories/airplane-repository');

const airplaneRepository=new AirplaneRepository();

async function createAirplane(data){
    try {
        console.log("in service",data);
        console.log("inside service routes");
        const airplane= await airplaneRepository.create(data);
        return airplane;
    } catch (error) {
        throw error;
    }
}

module.exports= {createAirplane};
