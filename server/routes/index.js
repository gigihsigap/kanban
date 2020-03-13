"use strict"

const express = require('express')
const router = express.Router()
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

const UserCon = require('../controllers/userController.js')
const KanbanCon = require('../controllers/kanbanController.js')

router.post('/register', UserCon.register)
router.post('/login', UserCon.login)
router.post('/google-login', UserCon.googleLogin)

// router.get('/kanban', KanbanCon.getAllTask)
// router.post('/kanban', KanbanCon.addTask)

router.get('/kanban', authentication, KanbanCon.getAllTask)
router.post('/kanban', authentication, KanbanCon.addTask)
router.get('/kanban/:id', authentication, KanbanCon.getOneTask)
router.put('/kanban/:id', authentication, authorization, KanbanCon.editTask)
router.delete('/kanban/:id', authentication, authorization, KanbanCon.deleteTask)

// router.get('/project', ProjectCon.viewAll)
// router.post('/project', ProjectCon.addTask)
// router.put('/project', ProjectCon.editTask)
// router.delete('/project', ProjectCon.deleteTask)

module.exports = router