const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
      const token = req.headers.autherization.split(" ")[1];
      try{
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY);
        req.userData = {email: decodedToken.email, userId: decodedToken.userId}
        next();
      } catch(error) {
        res.status(401).json({
          message: 'You are not authenticated!'
        })
      }
    } catch (error){
        res.status(401).json({
          message: 'You are not autheticated!'
        })
    }

};
