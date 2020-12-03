const express = require('express');
const router = express.Router();
const userRoutes = require('./user');
const costCenterRoutes = require('./costCenter');
const departmentRoutes = require('./department');
const auth = require('../controllers/authenticate')();

router.get('/', (req, res) =>
    res.json({ result: 'working fine !' })
);
router.post('/auth', auth.authenticate);

router.use('/user', userRoutes);
router.use('/department', departmentRoutes);
router.use('/costCenter', costCenterRoutes);


module.exports = router;