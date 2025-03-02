const express=require('express');

const {serverConfig, Logger} = require('./config');

const apiRoutes=require('./routes');


const app=express();
//console.log("hi hello",process.env);
app.use(express.json());//to register the middlewarer for all the upcoming routes
// that only passes the json 
app.use(express.urlencoded({extended: true}));//  3extended to use library 

//qs can pass nested object, querystring cannot parse nested object, extended true passes qs 
app.use('/api',apiRoutes);


app.listen(serverConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT: ${serverConfig.PORT}`);
   // Logger.info("successfully started","root",{});
});
