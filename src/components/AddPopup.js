import axios from "axios";
import React, { useEffect, useState } from "react";

const AddPopup = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  async function submit() {
    console.log(id);
    await axios.post(`http://localhost:5000/api/item/add/`, {
      title,
      description,
      image,
      price,
    });
    setTitle("");
    setDescription("");
    setImage("");
    setPrice("");
    setId("");
    props.setAddPopupClass("close");
    props.getItems();
  }
  return (
    <div className={"popupContent"}>
      <div class="w3-container w3-red">
        <h2>
          Add Item{" "}
          <p
            onClick={() => {
              props.setAddPopupClass("close");
            }}>
            X
          </p>
        </h2>
      </div>
      <form className={"w3-container"} onSubmit={submit}>
        <div>
          <input
            className="w3-input"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <label>title</label>
        </div>
        <div>
          <input
            className="w3-input"
            type="text"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <label>description</label>
        </div>
        <div>
          <input
            className="w3-input"
            type="text"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <label>image url</label>
        </div>
        <div>
          <input
            className="w3-input"
            type="number"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
            }}
          />
          <label>price</label>
        </div>
        <div>
          {" "}
          <button className="formButton" type={"button"} onClick={submit}>
            submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPopup;
