import { createAdmin, getAllUsers, getAllAdmins, getAllTeachers, getAllStudents } from "../Controllers/usercontroller.js";

import { createSubject, getSubjects } from "../Controllers/subjectcontroller.js";
import { createPractical, enrollInPractical, getPracticals } from "../Controllers/practicalcontroller.js";
import { isAdmin } from "../middleware/Middleware.js";  
import express from "express";

const router = express.Router();

router.post("/admin/create", createAdmin);
router.post("/subject/create", createSubject);
router.post("/practical/create", createPractical);
router.post("/enrollpractical/create", enrollInPractical);

router.get("/user/get",isAdmin, getAllUsers);  
router.get("/practical/get", getPracticals);  
router.get("/subject/get", getSubjects);  


router.get("/Admin/get", isAdmin, getAllAdmins);  
router.get("/Teachers/get", isAdmin, getAllTeachers);  


router.get("/Student/get", isAdmin, getAllStudents);  

export default router;

