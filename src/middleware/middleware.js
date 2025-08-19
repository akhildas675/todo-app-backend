import jwt from 'jsonwebtoken';
import User from '../model/user-model.js'; 

export const protect = async (req, res, next) => {
    let token;
    

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    
   
    if (!token) {
        return res.status(401).json({ msg: "No token, authorization restricted" });
    }
    
    try {
      
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
      
        req.user = await User.findById(decoded.id).select("-password");
        
        if (!req.user) {
            return res.status(401).json({ msg: "User not found" });
        }
        
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        res.status(401).json({ msg: "Token is not valid" });
    }
};