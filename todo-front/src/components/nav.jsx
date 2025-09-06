import { useNavigate } from "react-router-dom";
import { TodoContext } from "../store/context";
import { useContext } from "react";
import { postremovesession } from "../services/todoitemservices";

const Nav = () => {
  let { loggedin, setloggedin } = useContext(TodoContext);
  let navigate = useNavigate();
  let homehandler = () => {
    navigate("/");
  };
  let loginhandler = () => {
    navigate("/login");
  };
  let abouthandler = () => {
    navigate("/about");
  };
  let signuphandler = () => {
    navigate("/signup");
  };
  let logouthandler = async () => {
    let res = await postremovesession();
    console.log(res);
    setloggedin(res.data.isloggedin);
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="navbar-title">Todo App</div>
      <ul className="navbar-links">
        {loggedin ? (
          <>
            <li
              onClick={() => {
                homehandler();
              }}
            >
              Home
            </li>
            <li
              onClick={() => {
                abouthandler();
              }}
            >
              About
            </li>
            <li
              onClick={() => {
                logouthandler();
              }}
            >
              logout
            </li>
          </>
        ) : (
          <>
            {/* to remove later
            <li
              onClick={() => {
                homehandler();
              }}
            >
              Home  
            </li>
   <li
              onClick={() => {
                logouthandler();
              }}
            >
              logout
            </li> */}
            {/* this  */}

            <li
              onClick={() => {
                abouthandler();
              }}
            >
              About
            </li>
            <li
              onClick={() => {
                loginhandler();
              }}
            >
              login
            </li>
            <li
              onClick={() => {
                signuphandler();
              }}
            >
              Sign Up
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
