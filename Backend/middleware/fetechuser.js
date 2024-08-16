const jwt = require('jsonwebtoken')
const jwt_secret = "xhamster"

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, jwt_secret);
        req.user = data.user
        next()

    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" })

    }
}
module.exports = fetchuser;