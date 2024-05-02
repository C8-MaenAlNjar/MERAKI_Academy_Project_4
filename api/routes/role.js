const express =require('express')
const {addRole} =require('../controllers/role')

const roleRouter =express.Router()

roleRouter.post("/roles", addRole)

module.exports=roleRouter