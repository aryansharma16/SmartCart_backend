import express from "express";
import {
    writecssController,
    getCssController,
} from "../controllers/customcssController.js";

// import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";
// router object

const router = express.Router();

/// routing perform
// REGISTER || METHOD POST
router.post("/writecss", writecssController);
// LOGIN || METHOD POST
router.get("/getcss", getCssController);

// testin porpuse route for middleware testing token verfication
// router.get("/test", requireSignin, isAdmin, testController);

export default router;
