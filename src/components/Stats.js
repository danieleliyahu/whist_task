import axios from "axios";
import React, { useEffect, useState } from "react";

const Stats = () => {
  const [stats, setStats] = useState();
  useEffect(async () => {
    let { data } = await axios.get("http://localhost:5000/api/order/stats");

    setStats(data);
  }, []);
  let x = { d: 1, b: 2 };
  function uniqueItemsFunc(object) {
    let x = [];
    let length = 5;
    if (object.length < 5) {
      length = object.length;
    }
    for (let i = 0; i < length; i++) {
      x.push(
        <p>
          <span>{object[i][0]} </span>
          <span>{object[i][1]}</span>
        </p>
      );
    }

    return x;
  }
  return (
    <div>
      {stats ? (
        <div className="statsDiv">
          <div>
            <h1>Past 5 days $</h1>
            <div>
              {console.log(stats)}
              {stats.past5Days.map((day) => {
                return day ? (
                  <p>
                    <span>{day._id} </span>
                    {day.price}$<span></span>
                  </p>
                ) : (
                  ""
                );
              })}
            </div>
          </div>

          <div>
            <h1>Top 5 unique sel</h1>
            <div>{uniqueItemsFunc(stats.uniqueItem)}</div>
          </div>
          <div>
            <h1>Top 5 sel</h1>
            <div>
              {stats.top5Items.map((item) => {
                return item ? (
                  <p>
                    <span>{item._id} </span>
                    {item.count}
                    <span></span>
                  </p>
                ) : (
                  ""
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Stats;
