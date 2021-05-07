

function verifyStaffToken(req, res, next){ //next allows express to continue
    const bearerToken = req.header('airlineStaff');
    if(typeof bearerToken !== 'undefined') {
        req.token = bearerToken;
        next();
    } else {
        console.log("error in verify token")
        res.sendStatus(401); //not authorized
    }

} 

module.exports = verifyStaffToken;