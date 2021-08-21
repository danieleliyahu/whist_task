import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Stats from "./components/Stats";
import Admin from "./components/Admin";
import axios from "axios";
import { Navbar, Container, Nav } from "react-bootstrap";
function App() {
  const [cart, setCart] = useState([]);
  const [openCart, setOpenCart] = useState(false);
  const [cartValue, setCartValue] = useState(0);
  const [items, setItems] = useState([]);
  async function getItems() {
    let { data } = await axios.get("http://localhost:5000/api/item/get/all");
    setItems(data);
  }
  async function buy() {
    await axios
      .post("/api/order/buy", cart)
      .then(() => {
        setCart([]);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    getItems();
  }, []);
  function total() {
    let totalPrice = 0;
    {
      cart.map((item) => {
        return (totalPrice = totalPrice + item.price);
      });
      return setCartValue(totalPrice);
    }
  }
  useEffect(() => {
    total();
  }, [cart]);
  return (
    <Router>
      <div className="App">
        {/* <Link to="/admin">admin</Link>
        <Link to="/">home</Link>
        <Link to="/stats">stats</Link> */}
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="/">My Shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link>
                <Link to="/admin">admin</Link>
              </Nav.Link>

              <Nav.Link>
                <Link to="/">home</Link>
              </Nav.Link>
              <Nav.Link>
                <Link to="/stats">stats</Link>
              </Nav.Link>
              <Nav.Link>
                {" "}
                <div
                  onClick={() => {
                    setOpenCart(openCart ? false : true);
                    console.log(openCart);
                  }}>
                  <i className={`fa`} style={{ fontSize: "24px" }}>
                    &#xf07a;
                  </i>
                  {cart.length ? (
                    <span className="badge badge-warning" id="lblCartCount">
                      {cart.length}
                    </span>
                  ) : (
                    ""
                  )}
                </div>
              </Nav.Link>
            </Nav>
          </Container>
        </Navbar>

        <div className="cartItemsDiv">
          {openCart ? (
            <div className="cartItems">
              {cart.map((itemAtCart) => {
                return (
                  <div>
                    <span>{itemAtCart.title} </span>
                    <span>${itemAtCart.price}</span>
                  </div>
                );
              })}
              {cartValue ? <h3>total:{cartValue}</h3> : ""}
              <div>
                <button
                  onClick={() => {
                    buy();
                  }}>
                  pay
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <main>
          <Route path="/" exact>
            <Home
              cart={cart}
              setCart={setCart}
              getItems={getItems}
              items={items}></Home>
          </Route>

          <Route path="/admin" exact>
            <Admin getItems={getItems} items={items}></Admin>
          </Route>
          <Route path="/stats" component={Stats} exact></Route>
        </main>
      </div>
    </Router>
  );
}

export default App;
