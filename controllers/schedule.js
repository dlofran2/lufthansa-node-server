import express from "express";
import axios from "axios";

import config from "../config";

const router = express.Router();

const getScheduleAsync = async (req, token, urlParams, directFlight, limit = 20) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "X-Originating-IP": req.connection.remoteAddress
  };
  const url = `${config.GET_FLIGHT_SCHEDULES}${urlParams}?directFlight=${directFlight}limit=${limit}&offset=0`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return error;
  }
};

router.post("/", async (req, res) => {
  const { token, origin, destination, dateTime, directFlight } = req.body;
  const urlParams = `/${origin}/${destination}/${dateTime}`;
  const countries = await getScheduleAsync(req, token, urlParams, directFlight);
  res.send({ countries });
});

export default router;
