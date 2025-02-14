const {getUsers,addUser} = require("../models/User");

const getAllUsers = (req, res) => {
  try {
    const users=getUsers();
    if (users.length===0) {
      throw new Error("No user found");
    }
    res.json(users);
  } catch (error) {
    console.log(`Error in getAllUsers:`, error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "User ID is requires" });
    }

    const user = users.find((user) => {
      return user.id === +id;
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.log(`Error in getUserById`, error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const createUser = (req, res) => {
  try {
    const userData = req.body;

    console.log(req.body);
    
    if (!userData) {
      return res.status(400).json({ message: "User data are required" });
    }

    const users=getUsers();
    const existingUser = users.find((user) => {
      return (user.email === userData.email);
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const lastUserId = users.length > 0 ? users[users.length - 1].id : 0;
    const newId = lastUserId + 1;

    const newUser = {
      id: newId,
      ...userData,
    };
  
   const result= addUser(newUser);
    
    res.status(201).json(newUser);
  } catch (error) {
    console.log(`Error in createUser`, error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    
    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const users=getUsers();
    const index = users.findIndex((user) => {
      return user.id === +id;
    });

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const emailConflict =
      users.find((user) => {
        return user.email === userData.email && user.id !== id;
      }) !== undefined;

    if (emailConflict) {
      return res
        .status(400)
        .json({ message: "Email already in use by another user" });
    }

    users[index] = {
      ...users[index],
      ...userData,
    };

    res.json(users[index]);
  } catch (error) {
    console.log("Error in updateUser:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const users=getUsers();
    const index = users.findIndex((user) => {
      return user.id === +id;
    });

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }

    const deletedUser = users.splice(index, 1)[0];

    res.json({
      message: "User deleted successfully",
      user: deletedUser,
    });
  } catch (error) {
    console.error("Error in deleteUser:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports={getAllUsers,getUserById,createUser,updateUser,deleteUser};