import express from "express";
import axios from "axios";

import config from "../config";
import appInfo from "../appinfo";
import { jsonToFormUrlEncoded } from "../utils";

const router = express.Router();

const postTokenAsync = async () => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded"
  };
  const body = {
    client_id: appInfo.KEY,
    client_secret: appInfo.SECRET,
    grant_type: "client_credentials"
  };
  try {
    const response = await axios.post(config.POST_TOKEN, jsonToFormUrlEncoded(body), { headers });
    return response.data;
  } catch (error) {
    return error;
  }
};

router.get("/", async (req, res) => {
  const token = await postTokenAsync();
  res.send({ token });
});

export default router;
