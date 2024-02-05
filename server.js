import express from "express";
import route from "./Routes/UserRouter.js";
const app = express();

app.use(express.json());
app.use(route);

app.listen(3000, () => {
  console.log(`Server Started on PORT 3000`);
});
