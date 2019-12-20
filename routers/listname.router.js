var express = require('express')
var router = express.Router()
const controller = require('../controller/lsitname.controller');
const validate = require('../validate/listname.validate');

const authMiddleware = require('../middlewares/auth.middleware')
router.get('/',authMiddleware.requireAuth,controller.index)

router.get('/create',authMiddleware.requireAuth,controller.create)
router.post('/create', controller.postCreate)
//cookie

router.get('/search', controller.search)
router.get('/:id', controller.view)
module.exports = router;