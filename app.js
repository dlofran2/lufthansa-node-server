import express from "express";
import controller from "./controllers";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

app.use(bodyParser.json());
app.use(controller);
app.listen(port, () => console.log(`listening on port ${port}`));
