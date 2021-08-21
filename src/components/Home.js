import React, { useEffect, useState } from "react";
import axios from "axios";
const Home = (props) => {
  async function addToCart(item) {
    props.setCart([...props.cart, item]);
    console.log(props.cart);

    return props.cart;
  }
  // useEffect(async () => {
  //   props.getItems();
  // }, []);

  return (
    <div className="homePageDiv">
      <div className="itemsDiv">
        {props.items.map((item) => {
          return (
            <div className="itemCard">
              <div className="imgContainer">
                <img className="img" src={item.image}></img>
              </div>
              <p>{item.title}</p>
              <p>description: {item.description}</p>
              <p>${item.price}</p>
              <button
                class="btn btn-primary"
                type="button"
                onClick={() => {
                  addToCart(item);
                }}>
                buy
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
