const express = require("express");
const router = express.Router();

const genericHandler = (req, res, next) => {
  res.json({
    status: "sucess",
    data: req.body,
  });
};

router.post("/pessoa", genericHandler);

router.post("/auth/edit", genericHandler)

router.post("/fees/pay")

module.exports = router;
