const connection = require('../configs/db');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = (req, res) => {
    const {username, password, employeeId} = req.body;
    const queryUsernameExist = 'SELECT * FROM auth WHERE username = ?';
    const queryInsertUser = 'INSERT INTO auth(employee_id, username, password) VALUES (?,?,?)';

    const insertUser = async () => {
        const hashedPassword = await bcrypt.hash(password, 10);
        connection.query(queryInsertUser, [employeeId, username, hashedPassword], async (err, result) => {
            if (err) {
                console.error('Error registering :', err);
                res.status(500).json({error: 'Internal server error'});
                return;
            }
            res.status(201).json({message: 'Registered successfully'});
        });
    };

    connection.query(queryUsernameExist, [username], async (err, result) => {
        if (result == 0) {
            await insertUser();
        } else {
            console.error('Error register: ', err);
            res.status(400).json({error: 'username exist'});
            return;
        }
    });
};

exports.login = (req, res) => {
    const {username, password} = req.body;
    const queryString = 'SELECT * FROM auth WHERE username = ?';
    connection.query(queryString, [username], async (err, result) => {
        if (err) {
            console.error('Error authentication login: ', err);
            res.status(500).json({error: 'Internal Server Error'});
            return;
        }
        if (result.length === 0) {
            res.status(401).json({error: 'Invalid username or password'});
            return;
        }
        const isMatch = await bcrypt.compare(password, result[0].password);
        if (!isMatch) {
            res.status(401).json({error: 'Invalid username or password'});
            return;
        }
        const token = jwt.sign(
            {id: result[0].employee_id, username: result[0].username, role:result[0].role},
            process.env.SECRET_KEY,
            {expiresIn: '12h'},
        );
        res.status(200).json({token});
    });
};