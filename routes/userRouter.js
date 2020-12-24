const express = require('express')
const {createAccountSchema, createAccount, updateAccount, updateAccountSchema} = require('../schemas/schemas')
const router = express.Router()

const genericHandler = (req, res, next) => {
    res.json({
      status: 'success',
      data: req.body
    });
  };

router.get("/", (req, res) =>{
    res.send('Bem-vindo ao mundo da aids')
})

router.post("/accounts/", createAccountSchema, genericHandler);
router.put("/accounts/:id", updateAccountSchema, updateAccount);


module.exports = router