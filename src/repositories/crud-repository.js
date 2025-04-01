const { Logger } = require("../config");
const AppError = require("../utils/errors/app-error");
const {StatusCodes}=require("http-status-codes")


class CrudRepository {
    constructor(model){
        this.model=model;
    }

    async create(data){
      
            console.log("body",data);
            console.log("inside repo routes");
            
            const response=await this.model.create(data);
            return response;
       
    }

    async destroy(data){
            const response=await this.model.destroy({
                where:{
                    id:data
                }
            });
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND);
            }
            return response;
    }

    async get(data){
        console.log('repo',data);
        
            const response=await this.model.findByPk(data);
            if(!response){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            console.log('reporesult',response);
            
            return response;

    }

    async getAll(){
            const response=await this.model.findAll();
            return response;
    }

    async update(id,data){
            const response=await this.model.update(data,{
                where:{
                    id:id
                }
            });
            console.log('update response',response[0])
            if(!response || response[0]==0){
                throw new AppError('Not able to find the resource',StatusCodes.NOT_FOUND)
            }
            return response;
    }
}

module.exports=CrudRepository;