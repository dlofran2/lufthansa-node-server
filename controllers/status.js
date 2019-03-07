import express from "express";
import axios from "axios";

import config from "../config";

const router = express.Router();

const getStatusAsync = async (req, token, urlParams, limit = 20) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "X-Originating-IP": req.connection.remoteAddress
  };
  const url = `${config.GET_FLIGHT_STATUS}${req.path}${urlParams}?limit=${limit}&offset=0`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return error;
  }
};

router.post("/", async (req, res) => {
  const { token, flightNumber, date } = req.body;
  const urlParams = `/${flightNumber}/${date}`;
  const countries = await getStatusAsync(req, token, urlParams);
  res.send({ countries });
});

router.post("/route", async (req, res) => {
  const { token, origin, destination, date } = req.body;
  const urlParams = `/${origin}/${destination}/${date}`;
  const countries = await getStatusAsync(req, token, urlParams);
  res.send({ countries });
});

export default router;
