import axios from "axios";
import React, { useState } from "react";
import AddPopup from "./AddPopup";
import EditPopup from "./EditPopup";

const Admin = (props) => {
  const [popup, setPopup] = useState(true);
  const [popupInfo, setPopupInfo] = useState({});
  const [EditPopupClass, setEditPopupClass] = useState("close");
  const [AddPopupClass, setAddPopupClass] = useState("close");

  async function deleteItem(id) {
    let deleteMassage = await axios.delete(
      `http://localhost:5000/api/item/delete/${id}`
    );
    props.getItems();
    console.log(deleteMassage);
  }
  async function edit(item) {
    setPopupInfo(item);
    setEditPopupClass("modal");
    props.getItems();
  }
  async function add() {
    setAddPopupClass("modal");
    props.getItems();
  }
  return (
    <div>
      <button
        onClick={() => {
          add();
        }}>
        add
      </button>
      <div className={EditPopupClass}>
        <EditPopup
          popupInfo={popupInfo}
          setEditPopupClass={setEditPopupClass}
          getItems={props.getItems}></EditPopup>
      </div>
      <div className={AddPopupClass}>
        <AddPopup
          setAddPopupClass={setAddPopupClass}
          getItems={props.getItems}></AddPopup>
      </div>
      {console.log(props.items)}

      <table>
        <tr>
          <th>title</th>
          <th>description</th>
          <th>price</th>
          <th>image</th>
          <th>options</th>
        </tr>
        {props.items.map((item) => {
          return (
            <tr>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.price}</td>
              <td className="smallImgContainer">
                <img className="img" src={item.image}></img>
              </td>
              <td>
                <button
                  onClick={() => {
                    deleteItem(item._id);
                  }}>
                  delete
                </button>
                <button
                  onClick={() => {
                    edit(item);
                  }}>
                  edit
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default Admin;
