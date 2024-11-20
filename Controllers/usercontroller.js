import User from "../models/User.js";


export const createAdmin = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

 
    const allowedRoles = ["Admin", "Teacher", "Student"];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        error: "Invalid role. Allowed roles are: Admin, Teacher, Student.",
      });
    }


    const user = new User({
      name,
      email,
      password,
      role,
    });

  
    const savedUser = await user.save();

    res.status(201).json({
      savedUser,
      message: `${role} created successfully`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while creating the user",
    });
  }
};


export const getAllUsers = async (req, res) => {
  try {
   
    const users = await User.find();

   
    if (!users.length) {
      return res.status(404).json({
        message: "No users found",
      });
    }

   
    const usersWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

  
    res.status(200).json({
      users: usersWithoutPassword,
      message: "Users fetched successfully",
    });
  } catch (error) {
   
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      error: "An error occurred while fetching users",
    });
  }
};


export const getAllAdmins = async (req, res) => {
  try {
  
    const admins = await User.find({ role: "Admin" });

  
    const adminsWithoutPassword = admins.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.status(200).json({
      admins: adminsWithoutPassword,
      message: "Admins fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching admins",
    });
  }
};


export const getAllTeachers = async (req, res) => {
  try {
   
    const teachers = await User.find({ role: "Teacher" });

    
    const teachersWithoutPassword = teachers.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.status(200).json({
      teachers: teachersWithoutPassword,
      message: "Teachers fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching teachers",
    });
  }
};


export const getAllStudents = async (req, res) => {
  try {
    
    const allowedRoles = ["Admin", "Teacher"];
    const users = await User.find({ role: "Student" });

    
    const studentsWithoutPassword = users.map((user) => {
      const { password, ...userWithoutPassword } = user.toObject();
      return userWithoutPassword;
    });

    res.status(200).json({
      students: studentsWithoutPassword,
      message: "Students fetched successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while fetching students",
    });
  }
};
