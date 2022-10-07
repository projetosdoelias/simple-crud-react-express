const express = require('express')

const router = express.Router()

const teacherController = require('../controllers/teacher.controller')

router.get('/', teacherController.findAll);

router.post('/', teacherController.create);

router.delete('/:id', teacherController.deleta);

router.put('/:id', teacherController.update);


module.exports = router;