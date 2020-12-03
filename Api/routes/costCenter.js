const express = require("express");
const router = express.Router();
const controller = require('../controllers/costCenter')();
const authMiddleware = require('../middlewares/authenticate');

router.use(authMiddleware);
router.get('/', controller.getCostCenter);
router.post('/create', controller.create);
router.put('/update/:costCenterId', controller.update);
router.delete('/delete/:costCenterId', controller.delete);

module.exports = router;