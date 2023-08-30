import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Protected Routes token base
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    console.log( req.headers.authorization.split(' ')[1],"hii iam hee")
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};

// admin access

export const isAdmin = async (req, res, next) => {
  try {
    const userRole = req.header('X-User-Role'); // Get the role from request headers
    console.log(typeof userRole,'roleis herer')
    if (userRole === '1') {
      next(); // Allow access for admin
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized Access",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      error,
      message: "Error in admin middleware",
    });
  }
};


// old method

// export const isAdmin = async (req, res, next) => {
//   try {
//     const user = await userModel.findById(req.user._id);
//     console.log(req.user._id.role, 'here sus role')
//     // console.log(user.role,'here is the user rli amdo')
//     if (user.role !== 1) {
//       return res.status(401).send({
//         success: false,
//         message: "UnAuthorized Access",
//       });
//     } else {
//       next();
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(401).send({
//       success: false,
//       error,
//       message: "Error in admin middelware",
//     });
//   }
// };
