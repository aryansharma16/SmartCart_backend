import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignin = async (req, res, next) => {
  try {
    const decode = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET_KEY
    );
    req.user =decode;
    next();

     
     
     
     
  } catch (error) {
    console.log(error);
  }
};

// admin access

// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     console.log(user,"shhshhdsh")
//     if (user.role !== 1) {
//       return res.status(401).send({
//         succes: false,
//         message: "unAuthrised access...",
//       });
//     }
//     else{
//       next();
//       console.log("else")
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(401).send({
//       succes: false,
//       message: "Error in admin MiddleWare",
//     });
//   }
// };

export const isAdmin = async (req, res, next) => {
  
// console.log(object)
  try {
    const user = await userModel.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send({
        success: false,
        message: "UnAuthorized Access",
      });
    } else {
      next();
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middelware",
    });
  }
};
