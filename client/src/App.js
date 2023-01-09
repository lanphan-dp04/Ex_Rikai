import Home from "./pages/home/Home";
import TopBar from "./components/topbar/TopBar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";
import Admin from "./pages/admin/Admin";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/admin">
          <Admin />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/login">{user ? <Home /> : <Login />}</Route>
      </Switch>
    </Router>
  );
}

export default App;
