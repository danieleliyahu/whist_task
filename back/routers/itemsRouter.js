const express = require("express");
const Item = require("../models/itemModel");

const itemsRouter = express.Router();

itemsRouter.post("/add", async (req, res) => {
  let { title, price, description, image } = req.body;
  console.log(title, price, description, image);
  const item = new Item({
    title,
    price,
    description,
    image,
  });
  const addedItem = await item.save();
  res.send(addedItem);
});

itemsRouter.get("/get/all", async (req, res) => {
  const item = await Item.find();
  res.send(item);
});

itemsRouter.put("/edit/:id", async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findById(itemId);
  if (!item) {
    res.send({ message: "no such item" });
  }
  item.title = req.body.title || item.title;
  item.price = req.body.price || item.price;
  item.description = req.body.description || item.description;
  item.image = req.body.image || item.image;
  const updateItem = await item.save();
  console.log(updateItem);
  res.send({ message: "item updated", item: updateItem });
});
itemsRouter.delete("/delete/:id", async (req, res) => {
  const itemId = req.params.id;
  const item = await Item.findById(itemId);
  if (!item) res.send({ message: "no such item" });
  const deletedItem = await item.remove();
  res.send({ message: "item deleted", item: deletedItem });
});
module.exports = itemsRouter;
