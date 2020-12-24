const express = require("express");
const router = express.Router();
const {
  createAccountSchema,
  createAccount,
  updateAccount,
  updateAccountSchema,
} = require("../schemas/schemas");
const {
  saveUser,
  updateUser,
  getUsers,
} = require("../repository/userRepository");

router.get("/", (req, res) => {
  res.send("Bem-vindo ao mundo da aids");
});

router.post("/accounts/", createAccountSchema, async (req, res) => {
  const {
    title,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
  } = req.body;
  const user = {
    title: title,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    role: role,
  };

  try {
    const userSaved = await saveUser(user);
    res.json(userSaved);
  } catch {
    res.sendStatus(500);
  }
});

router.put("/accounts/:id", updateAccountSchema, async (req, res) => {
  const {
    title,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
    role,
  } = req.body;

  const user = {
    title: title,
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: password,
    confirmPassword: confirmPassword,
    role: role,
  };

  try {
    const userSaved = await updateUser(req.params.id, user);
    res.json(userSaved);
  } catch {
    res.sendStatus(500);
  }
});

router.get("/accounts/", async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);
  } catch {
    res.sendStatus(500);
  }
});

module.exports = router;
