const connection = require('../configs/db');

exports.createEmployee = (req, res) => {
    const {fullname, email, department, position, joinDate} = req.body;
    const queryString = 'INSERT INTO employee(fullname, email, department, position, join_date) VALUES (?,?,?,?,?)';
    connection.query(queryString, [fullname, email, department, position, joinDate], async (err, result) => {
        if (err) {
            console.error('Error create employee :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(201).json({message: 'Create Employee Data successfully'});
    });
};

exports.loadAllEmployees = (req, res) => {
    const queryString = 'SELECT * FROM employee';
    connection.query(queryString, [], async (err, result) => {
        if (err) {
            console.error('Error load employee :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(200).json(result);
    });
};

exports.loadEmployeeDetail = (req, res) => {
    const queryString = 'SELECT * FROM employee WHERE id = ?';
    connection.query(queryString, [req.params.id], async (err, result) => {
        if (err) {
            console.error('Error load employee :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(200).json(result[0]);
    });
};

exports.editEmployee = (req, res) => {
    const {fullname, email, department, position, joinDate} = req.body;
    const queryString = 'UPDATE employee SET fullname = ?, email = ?, department = ?, position = ?, join_date = ? WHERE id = ?';
    connection.query(queryString, [fullname, email, department, position, joinDate, req.params.id], async (err, result) => {
        if (err) {
            console.error('Error edit employee :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(204).json({message: 'Edit Employee Data successfully'});
    });
};

exports.deleteEmployee = (req, res) => {
    const queryString = 'DELETE FROM employee WHERE id = ?';
    connection.query(queryString, [req.params.id], async (err, result) => {
        if (err) {
            console.error('Error edit employee :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(204).json({message: 'Edit Employee Data successfully'});
    });
};