import React from "react";
import { useState, useReducer } from "react";
import "../styles/card.css";
import "../styles/Dashboard.css";

const Card = (props) => {
  const [ignored, forceUpdate] = useReducer((x) => x + 1, 0);
  const [todoElements, setTodoElements] = useState(props.inputTexts);

  let cardTodos = todoElements.map((val, index) => {
    return (
      <div
        key={index}
        style={{
          alignSelf: "center",
          marginTop: "20px",
          backgroundColor: "white",
          color: "black",
        }}
      >
        <input value={props.checkmarks[index]} type="checkbox" />
        <input
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
    );
  });

  return (
    <div className="CardContainer">
      <div
        style={{
          marginLeft: "2vw",
          marginBottom: "1vh",
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          value={props.headerName}
          placeholder="Başlık Yok"
          className="CardHeaderInput2"
        />
        <div style={{ display: "flex" }}>
          <button
            onClick={() => {
              let temp = props.cardArray;
              temp.splice(props.arrayIndex, 1);
              props.setCardArray(temp);
              props.forceUpdate();
            }}
            style={{ height: "24px", marginLeft: "12px" }}
          >
            X
          </button>
        </div>
      </div>
        <label style={{marginLeft:'16px'}} htmlFor="Kategorisi">Kategorisi:</label>
        <input type="text" style={{width:'8vw', fontSize:'0.9em'}} disabled={true} value={props.category} />
      <div className="TodoContainer">{cardTodos}</div>
    </div>
  );
};

export default Card;
