process.on('uncaughtException',(error)=>{
    console.log("Uncaught Exception:",error.message);
    console.log(error.stack);
    process.exit(1);
});

process.on('unhandledRejection',(reason,promise)=>{
    console.log(reason);
    console.log(`Unhandle Promise rejection`,promise);
    process.exit(1);
})
        
require('dotenv').config();
const express=require('express');
const {loggerInfo,authenticateUser}=require('./middlewares/userMiddleware');
const userRoutes=require('./routes/userRoutes');

const app=express()

app.get('/',(req,res)=>{
    res.send('Welcome to home page');
}); 

//TRIGGGER THE GLOBAL LEVEL EXCEPTIOn

// console.log(x);
// const asyncFunction = async () => {
//     throw new Error("Error occurred!");
//   };
//   asyncFunction();


app.use(loggerInfo);
app.use(express.json());
app.use('/users',userRoutes);

app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server running on this port ${process.env.PORT}`);
})
