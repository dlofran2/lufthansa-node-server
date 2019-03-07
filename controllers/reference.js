import express from "express";
import axios from "axios";

import config from "../config";

const router = express.Router();

const getReferenceDataAsync = async (req, token, code = "", langCode = "en", limit = 20) => {
  const headers = {
    Accept: "application/json",
    Authorization: `Bearer ${token}`,
    "X-Originating-IP": req.connection.remoteAddress
  };
  const url = `${config.GET_REFERENCE}${req.path}/${code}?lang=${langCode}&limit=${limit}&offset=0`;
  try {
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    return error;
  }
};

router.post("/countries", async (req, res) => {
  const { token, countryCode, langCode } = req.body;
  console.log(req.body);
  const countries = await getReferenceDataAsync(req, token, countryCode, langCode);
  res.send({ countries });
});

router.post("/cities", async (req, res) => {
  const { token, cityCode, langCode } = req.body;
  const cities = await getReferenceDataAsync(req, token, cityCode, langCode);
  res.send({ cities });
});

router.post("/airports", async (req, res) => {
  const { token, airportCode, langCode } = req.body;
  const airports = await getReferenceDataAsync(req, token, airportCode, langCode, 100);
  res.send({ airports });
});

router.post("/airlines", async (req, res) => {
  const { token, airlineCode, langCode } = req.body;
  const airlines = await getReferenceDataAsync(req, token, airlineCode, langCode);
  res.send({ airlines });
});

router.post("/aircraft", async (req, res) => {
  const { token, aircraftCode, langCode } = req.body;
  const aircrafts = await getReferenceDataAsync(req, token, aircraftCode, langCode);
  res.send({ aircrafts });
});

export default router;
