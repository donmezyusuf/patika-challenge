import "./styles/App.css";

import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import LandingPage from "./pages/landing";
import Dashboard from "./pages/dashboard";
import React from "react";
import UserDataContext from "./components/UserDataContext";

const App = () => {
  const [data, setData] = React.useState({
    firstName: "",
    lastName: "",
  });

  React.useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <UserDataContext.Provider value={[data, setData]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </Router>
    </UserDataContext.Provider>
  );
};

export default App;
