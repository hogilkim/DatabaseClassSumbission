

function verifyAgentToken(req, res, next){ //next allows express to continue
    const bearerToken = req.header('bookingAgent');
    if(typeof bearerToken !== 'undefined') {
        req.token = bearerToken;
        next();
    } else {
        console.log("error in verify token")
        res.sendStatus(401); //not authorized
    }

} 

module.exports = verifyAgentToken;