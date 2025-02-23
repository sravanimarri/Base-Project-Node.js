const express=require('express');

const {serverConfig, Logger} = require('./config');

const apiRoutes=require('./routes');


const app=express();
//console.log("hi hello",process.env);

app.use('/api',apiRoutes);


app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT: ${serverConfig.PORT}`);
   // Logger.info("successfully started","root",{});
});
