const express = require("express");
const mongoose = require("mongoose");
const itemsRouter = require("./routers/itemsRouter");
const port = 5000;
const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  process.env.MONGODB_URL ||
    "mongodb+srv://danidani80:9925259@cluster0.rqrrd.mongodb.net/whistTask?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

app.use("/api/item", itemsRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
