const express = require("express");
const router = express.Router();
const controller = require('../controllers/department')();
const authMiddleware = require('../middlewares/authenticate');

router.use(authMiddleware);

router.get('/', controller.getDepartments);
router.post('/create', controller.create);
router.put('/update/:departmentId', controller.update);
router.delete('/delete/:departmentId', controller.delete);

module.exports = router;