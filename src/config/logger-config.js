const { createLogger, format, transports } = require('winston');
//createlogger a func,format ,transports are object
const { combine, timestamp, label, printf } = format;//destructuring the objects

const customFormat=printf(({level,message,label,timestamp})=>{
    return `${timestamp}:${level}: ${message}`;
})

const logger = createLogger({
    format: combine(
      timestamp({format:'YYYY-MM-DD HH:mm:ss'}),
      customFormat
    ),
    transports:[
        new transports.Console(),
        new transports.File({filename:'combined.log'})
    ],
});

module.exports=
   logger;