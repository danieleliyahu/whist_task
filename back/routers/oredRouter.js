const express = require("express");
const Order = require("../models/orderModel");

const orderRouter = express.Router();
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
let past5DaysCheck = [];
let today = new Date();
past5DaysCheck.push([formatDate(new Date().setDate(today.getDate()))]);
past5DaysCheck.push([formatDate(new Date().setDate(today.getDate() - 1))]);
past5DaysCheck.push([formatDate(new Date().setDate(today.getDate() - 2))]);
past5DaysCheck.push([formatDate(new Date().setDate(today.getDate() - 3))]);
past5DaysCheck.push([formatDate(new Date().setDate(today.getDate() - 4))]);
orderRouter.post("/buy", async (req, res) => {
  let newOrder = new Order({ orderItems: req.body });
  console.log(newOrder);
  const orderMade = await newOrder.save();
  console.log(orderMade);
  res.send(true);
});

orderRouter.get("/stats", async (req, res) => {
  const top5Items = await Order.aggregate([
    { $unwind: "$orderItems" },
    { $match: {} },
    {
      $group: {
        _id: "$orderItems.title",
        money: { $sum: "$orderItems.price" },
        count: { $sum: 1 },
      },
    },
    { $sort: { count: -1 } },
  ]);
  const top5Unique = await Order.aggregate([
    { $unwind: "$orderItems" },
    { $match: {} },
    {
      $group: {
        _id: "$_id",
        uniqueIds: { $addToSet: "$orderItems.title" },
      },
    },

    { $sort: { count: -1 } },
  ]);
  let uniqueItem = {};
  top5Unique.map((order) => {
    for (let i = 0; i < order.uniqueIds.length; i++) {
      if (!uniqueItem[order.uniqueIds[i]]) {
        uniqueItem[order.uniqueIds[i]] = 1;
      } else {
        uniqueItem[order.uniqueIds[i]] += 1;
      }
    }
  });
  let entries = Object.entries(uniqueItem);
  let sorted = entries.sort((a, b) => b[1] - a[1]);
  uniqueItem = sorted;

  let past5Days = await Order.aggregate([
    { $unwind: "$orderItems" },
    { $match: {} },
    {
      $group: {
        _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
        price: { $sum: "$orderItems.price" },
      },
    },
    { $limit: 5 },

    { $sort: { _id: -1 } },
  ]);
  past5Days = past5Days.map((day, i) => {
    if (
      past5DaysCheck[0] == day._id ||
      past5DaysCheck[1] == day._id ||
      past5DaysCheck[2] == day._id ||
      past5DaysCheck[3] == day._id ||
      past5DaysCheck[4] == day._id
    ) {
      return day;
    } else {
    }
  });

  res.send({
    past5Days: past5Days,
    uniqueItem: uniqueItem,
    top5Items: top5Items,
  });
});
module.exports = orderRouter;
