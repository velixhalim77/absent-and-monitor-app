const axios = require('axios');
const FormData = require('form-data');

exports.checkIn = (req, res) => {
    const token = req.headers['authorization'];
    const formData = new FormData();
    formData.append('photo', req.file.buffer, {
        filename: req.file.originalname,
        contentType: req.file.mimetype
    });
    axios.post(`http://localhost:6000/absent/${req.employeeId}`, formData, {
        headers: {
            'Authorization': token,
            ...formData.getHeaders()
        }
    })
        .then(response => {
            if (response.status == 202) {
                res.status(202).json({message: 'Check In successfully'});
            } else {
                res.status(500).json({error: 'Internal server error'});
                return;
            }
        })
        .catch(err => {
            console.error('Error check in :', err);
            res.status(500).json({error: 'Internal server error'});
            return;
        });
};