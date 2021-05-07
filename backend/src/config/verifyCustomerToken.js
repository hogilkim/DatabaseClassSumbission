

function verifyCustomerToken(req, res, next){ //next allows express to continue
    const bearerToken = req.header('customer');
    if(typeof bearerToken !== 'undefined') {
        req.token = bearerToken;
        next();
    } else {
        console.log("error in verify token")
        res.sendStatus(401); //not authorized
    }

} 

module.exports = verifyCustomerToken;