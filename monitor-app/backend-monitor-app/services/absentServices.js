const connection = require('../configs/db');

exports.checkIn = (req, res) => {
    const photo = req.file;
    const checkIn = new Date();
    const photoBase64 = photo.buffer.toString('base64');
    const queryString = 'INSERT INTO absent(employee_id, check_in, photo) VALUES (?, ?, ?)';
    connection.query(queryString, [req.params.id, checkIn, photoBase64], async (err, result) => {
        if (err) {
            console.error('Error check in :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(202).json({message: 'Check In successfully'});
    });
};

exports.loadAllAbsent = (req, res) => {
    const queryString = 'SELECT id, employee_id, check_in FROM absent';
    connection.query(queryString, [], async (err, result) => {
        if (err) {
            console.error('Error load absent :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(200).json(result);
    });
};

exports.loadAbsentByEmployeeId = (req, res) => {
    const queryString = 'SELECT id, employee_id, check_in FROM absent WHERE employee_id = ?';
    connection.query(queryString, [req.params.id], async (err, result) => {
        if (err) {
            console.error('Error load absent :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(200).json(result);
    });
};

exports.loadPhotoById = (req, res) => {
    const queryString = 'SELECT photo FROM absent WHERE id = ?'
    connection.query(queryString, [req.params.id], async (err, result) => {
        if (err) {
            console.error('Error load absent :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        }
        res.status(200).json(result[0]);
    });
}