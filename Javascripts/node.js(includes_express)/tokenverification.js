const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 33344;
const cors = require('cors');
app.use(express.json());
app.use(cors());
const JWT_SECRET = "U6;tyg4MHF#Xx5'Gl@q_7CL1[d%R";
app.get('/verify-token', (req, res) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: 'Authorization token not provided or is in the wrong format.'
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token.'
            });
        }
        res.status(200).json({
            success: true,
            message: 'Token is valid.',
            userData: decoded
        });
    });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
