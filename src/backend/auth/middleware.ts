import jwt from 'jsonwebtoken';


const authMiddleware = (req, res, next) => {
    try {
        let token = "invalid";

        if (req.headers.authorization) {
            //get token from auth header and split from "bearer " postfix
            token = req.headers.authorization.split(" ")[1];
        }

        const decoded = jwt.verify(token, process.env.JWT_KEY as string); //Verify Token
        req.userData = decoded; //Set decoded and verified user data in req object
        next(); //Call next handler

    } catch (error) {
        return res.status(401).json({ message: 'Auth failed' });
    }
};

export default authMiddleware;