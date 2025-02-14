const loggerInfo=(req,res,next) =>{
    console.log(`${req.method} ${req.path}`);
    next();
}

const authenticateUser=(req,res,next)=>{
    const authKey=process.env.KEY;
    const userKey=req.headers['key'];

    if(authKey!==userKey)
    {
        return res.status(401).send('Authentication Failed');
    }
    console.log('User Authenticated');
    next();
}

module.exports={loggerInfo,authenticateUser};