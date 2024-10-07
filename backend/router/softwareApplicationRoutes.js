import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { addNewApplication, deleteApplication, getAllApplications,  } from "../controller/softwareApplicationController.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewApplication);
router.delete("/delete/:id", isAuthenticated, deleteApplication);
router.get("/get-all", getAllApplications);

export default router;
