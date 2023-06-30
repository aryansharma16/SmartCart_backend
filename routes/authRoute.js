import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";

import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
// router object

const router = express.Router();

/// routing perform
// REGISTER || METHOD POST
router.post("/register", registerController);
// LOGIN || METHOD POST
router.post("/login", loginController);

// testin porpuse route for middleware testing token verfication
router.get("/test", requireSignin, isAdmin, testController);



//  protected route auth
router.get("/user-auth", requireSignin, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
