// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import { useContext, useEffect } from "react";
import "./App.css";
import List from "./components/List";
import { gettodo } from "./services/todoitemservices";
// , get
import Nav from "./components/nav";
import Handle from "./components/handle";
import { TodoContext } from "./store/context.jsx";
import { Outlet } from "react-router-dom";
function App() {
  let { setValue, setloggedin, loggedin } = useContext(TodoContext);
  // let [click, setClick] = useState(false);
  useEffect(() => {
    gettodo()
      .then((req) => {
        setValue(req.data.array);
        setloggedin(req.data.state.isloggedin);
        return req;
      })
      .catch((err) => {
        setValue([]);
        setloggedin(false);
        return [];
      });
  }, [loggedin]);
  // ...existing code...

  // let [list, setList] = useState([]);

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export default App;
