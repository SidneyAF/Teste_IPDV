const express = require("express");
const router = express.Router();
const controller = require('../controllers/user')();
const authMiddleware = require('../middlewares/authenticate');

router.use(authMiddleware);
router.get('/', controller.getUsers);
router.post('/create', controller.create);
router.put('/update/:userId', controller.update);
router.delete('/delete/:userId', controller.delete);

module.exports = router;