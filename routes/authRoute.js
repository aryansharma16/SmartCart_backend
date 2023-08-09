import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgotPasswordController
} from "../controllers/authController.js";

import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
// router object

const router = express.Router();

/// routing perform
// REGISTER || METHOD POST
router.post("/register", registerController);
// LOGIN || METHOD POST
router.post("/login", loginController);
// forgot password
router.post('/forgot-password',forgotPasswordController)

// testin porpuse route for middleware testing token verfication
router.get("/test", requireSignin, isAdmin, testController);



//  user route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

// admin protected route 
router.get("/admin-auth", requireSignin, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
