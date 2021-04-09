import React from "react";
import { useState, useEffect, useReducer } from "react";
import UserDataContext from "../components/UserDataContext";
import Card from "../components/card";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [cardArray, setCardArray] = useState([]);
  const [categories, setCategories] = useState(["İş", "Kişisel"]);
  const [selectedCategories, setSelectedCategories] = useState([true, true]);
  const [todoElements, setTodoElements] = useState([]);
  const [cartOtherInfo, setCartOtherInfo] = useState({
    header: "",
    category: "",
    chekbox: [],
  });

  const [inputValue, setInputValue] = useState("");

  const [todoValues, setTodoValues] = useState([]);

  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);

  let NameSurname =
    JSON.parse(localStorage.getItem("data")).firstName +
    " " +
    JSON.parse(localStorage.getItem("data")).lastName;

  let cardCounter = 0;

  let cards = cardArray.map((val, index) => {
    let arrIndex = categories.indexOf(val.category);
    if (selectedCategories[arrIndex]) {
      return (
        <Card
          headerName={val.headerName}
          category={val.category}
          inputTexts={val.inputTexts}
          checkmarks={val.checkmarks}
          setCardArray={setCardArray}
          cardArray={cardArray}
          arrayIndex={index}
          forceUpdate={forceUpdate}
        />
      );
    } else return <div></div>;
  });

  let todos = todoElements.map((val, index) => (
    <div
      key={index}
      style={{
        alignSelf: "center",
        marginTop: "20px",
        backgroundColor: "white",
        color: "black",
      }}
    >
      <input
        onChange={(e) => {
          cartOtherInfo.chekbox[index] = e.target.checked;
          setCartOtherInfo(cartOtherInfo);
        }}
        type="checkbox"
      />
      <input
        onChange={(event) => {
          todoElements[index] = event.target.value;
          setTodoElements(todoElements);
        }}
        value={todoElements[index]}
        className="TodoContentInput"
        type="text"
        disabled={true}
      />
      <button
        onClick={() => {
          todoElements.splice(index, 1);
          setTodoElements(todoElements);
          forceUpdate();
        }}
      >
        X
      </button>
    </div>
  ));

  const listCategories = categories.map((val, index) => (
    <li key={index} style={{ display: "flex" }}>
      <input
        type="checkbox"
        className="checkboxStyle"
        defaultChecked={true}
        onChange={() => {
          selectedCategories[index] = !selectedCategories[index];
          setSelectedCategories(selectedCategories);
          forceUpdate();
        }}
      />
      <div className="">{val}</div>
    </li>
  ));

  return (
    <div className="DashboardContainer">
      <div className="SidebarContainer">
        <div className="UserInfoContainer">
          <img src="account.png" />
          <div className="UserInfo">{NameSurname}</div>
        </div>
        <div className="CategoryContainer">
          <ul>{listCategories}</ul>
        </div>
      </div>
      <div className="ContentContainer">
        {cards}
        <div className="CreateCart">
          <div style={{ marginLeft: "2vw", marginBottom: "1vh" }}>
            <input
              placeholder="Edit Title"
              onChange={(event) => {
                cartOtherInfo.header = event.target.value;
                setCartOtherInfo(cartOtherInfo);
              }}
              className="CardHeaderInput"
              type="text"
            />
            <input
              type="radio"
              name="category"
              value="İş"
              onChange={(event) => {
                cartOtherInfo.category = event.target.value;
                setCartOtherInfo(cartOtherInfo);
              }}
            />
            <label htmlFor="İş">İş</label>
            <input
              onChange={(event) => {
                cartOtherInfo.category = event.target.value;
                setCartOtherInfo(cartOtherInfo);
              }}
              value="Kişisel"
              type="radio"
              name="category"
            />
            <label htmlFor="Kişisel">Kişisel</label>
          </div>
          <div style={{ alignSelf: "center", marginTop: "10px" }}>
            <button
              onClick={() => {
                todoElements.push(inputValue);
                setTodoElements(todoElements);
                forceUpdate();
              }}
              style={{ borderRadius: "12px", width: "50px" }}
            >
              Add
            </button>
            <input
              className="AddTodoInput"
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
              type="text"
            />
          </div>

          <div className="TodoContainer">{todos}</div>

          <button
            onClick={() => {
              cardArray.push({
                headerName: cartOtherInfo.header,
                category: cartOtherInfo.category,
                inputTexts: todoElements,
                checkmarks: cartOtherInfo.chekbox,
              });
              console.log(cardArray);
              setCardArray(cardArray);
              forceUpdate();
              cardCounter++;
            }}
            className="CreateButton"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
/*
    <UserDataContext.Consumer>
      {([data, setData]) => (
        <div className="ToDoContainer">
          <Card/>
        </div>
      )}
    </UserDataContext.Consumer>
 */
