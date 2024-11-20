import Subject from "../models/Subject.js";
import User from "../models/User.js";


export const createSubject = async (req, res) => {
    try {
        const { name, code, createdBy } = req.body;

        const user = await User.findById(createdBy);
        if (!user || user.role !== "Admin") {
            return res.status(403).json({ error: "Only admins are allowed to create subjects" });
        }

       
        const subject = new Subject({
            name,
            code,
            createdBy,
        });

      
        const savedSubject = await subject.save();

        res.status(201).json({
            savedSubject,
            message: "Subject created successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error occurred while creating subject",
        });
    }
};


export const getSubjects = async (req, res) => {
    try {
        const subjects = await Subject.find().populate("createdBy", "name email role"); // Include role to confirm admin
        res.status(200).json({
            subjects,
            message: "Subjects fetched successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Error occurred while fetching subjects",
        });
    }
};
