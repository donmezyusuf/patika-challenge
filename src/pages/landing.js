import { Link } from "react-router-dom";
import "../styles/App.css";
import UserDataContext from "../components/UserDataContext";
import React from "react";

function LandingPage() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  return (
    <UserDataContext.Consumer>
      {([data, setData]) => (
        <div className="App">
          <div className="userInfoContainer">
            <form className="innerContainer">
              <div className="firstNameContainer">
                <input
                  className="textInput"
                  placeholder="First Name"
                  type="text"
                  id="fname"
                  name="fname"
                  onChange={(val) => setFirstName(val.target.value)}
                />
              </div>
              <div className="lastNameContainer">
                <input
                  className="textInput"
                  placeholder="Last Name"
                  type="text"
                  id="lname"
                  name="lname"
                  onChange={(val) => setLastName(val.target.value)}
                />
              </div>
              <div className="buttonContainer">
                <Link to="/dashboard">
                  <button
                    onClick={() => {
                      localStorage.setItem(
                        "data",
                        JSON.stringify({
                          firstName: firstName,
                          lastName: lastName,
                        })
                      );
                      /*setData({
                        firstName: firstName,
                        lastName: lastName,
                      });
                       */
                    }}
                  >
                    Kayıt Ol
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      )}
    </UserDataContext.Consumer>
  );
}

export default LandingPage;
