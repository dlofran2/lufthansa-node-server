import express from "express";

import token from "./token";
import reference from "./reference";
import status from "./status";
import schedule from "./schedule";

const router = express.Router();

router.get("/", (req, res) => res.send("Luftansa API proxy"));
router.use("/token", token);
router.use("/reference", reference);
router.use("/status", status);
router.use("/schedule", schedule);

module.exports = router;
