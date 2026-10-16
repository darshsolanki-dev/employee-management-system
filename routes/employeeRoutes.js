const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.get("/", (req, res) => {
    db.query("SELECT * FROM employees ORDER BY id DESC", (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Failed to load employees" });
        }
        res.json(results);
    });
});

router.post("/", (req, res) => {
    const { name, email, department, salary } = req.body;

    if (!name || !email || !department || !salary) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "INSERT INTO employees (name, email, department, salary) VALUES (?, ?, ?, ?)";

    db.query(sql, [name, email, department, salary], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to add employee" });
        }
        res.status(201).json({ message: "Employee added successfully", id: result.insertId });
    });
});

router.put("/:id", (req, res) => {
    const { id } = req.params;
    const { name, email, department, salary } = req.body;

    if (!name || !email || !department || !salary) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const sql = "UPDATE employees SET name = ?, email = ?, department = ?, salary = ? WHERE id = ?";

    db.query(sql, [name, email, department, salary, id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to update employee" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee updated successfully" });
    });
});

router.delete("/:id", (req, res) => {
    db.query("DELETE FROM employees WHERE id = ?", [req.params.id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Failed to delete employee" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.json({ message: "Employee deleted successfully" });
    });
});

module.exports = router;
