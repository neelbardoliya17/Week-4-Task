const db = require("../utils/database");

const getAllUsers = (req, res) => {
  try {
    db.all("select * from users", [], (err, users) => {
      if (err) {
        console.error("Error fetching users:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      return res.json(users);
    });
  } catch (error) {
    console.error("error occurs:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getUserById = (req, res) => {
  try {
    const { id } = req.params;
    db.get("select * from users where id = ?", [id], (err, user) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.json(user);
    });
  } catch (error) {
    console.error("error occurs:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const createUser = (req, res) => {
  try {
    const { name, email, age } = req.body;

    if (!name || !email || !age) {
      return res.status(400).json({ message: "All fields are required" });
    }

    db.run(
      "insert into users (name, email, age) VALUES (?, ?, ?)",
      [name, email, age],
      (err) => {
        if (err) {
          if (err.code === "SQLITE_CONSTRAINT") {
            return res
              .status(400)
              .json({ message: "User with this email already exists" });
          }
          console.error("Error adding user:", err);
          return res.status(500).json({ message: "Internal server error" });
        }
       return  res.status(201).json({ id: this.lastID, name, email, age });
      }
    );
  } catch (error) {
    console.error("error occurs:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!id || !updates || Object.keys(updates).length === 0) {
      return res.status(400).json({ message: "No valid data provided" });
    }

    const fields = Object.keys(updates)
      .map((key) => `${key} = ?`)
      .join(", ");
    const values = [...Object.values(updates), id];

    db.run(`update users set ${fields} where id = ?`, values, function (err) {
      if (err) {
        console.error("Error updating user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (this.changes === 0)
        return res.status(404).json({ message: "User not found" });

      console.log(this.changes);
      
      res.json({
        message: "User updated successfully",
        changesData: this.changes,
      });
    });
  } catch (error) {
    console.log("error occurs:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deleteUser = (req, res) => {
  try {
    const { id } = req.params;

    db.run("delete from users where id = ?", [id], function (err) {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (this.changes === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(this.changes);

      res.json({
        message: "User deleted successfully",
        updateData: this.changes,
      });
    });
  } catch (error) {
    console.log("error occurs:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
