// React.createContext → you import the whole React object (import React from "react") and then call React.createContext().

// createContext → you use ES6 named import to pull out only createContext from the React module.

import { createContext, useState } from "react";
import { removetodo } from "../services/todoitemservices";
//  remove,
// eslint-disable-next-line react-refresh/only-export-components
export let TodoContext = createContext();

let Contextprovider = ({ children }) => {
  let removeclickhandler = async (id) => {
    // await remove(id);
    // console.log(id);
    setremoving(true);
    await removetodo(id);
    let newvallist = value.filter((val) => val._id.toString() != id.toString());
    setValue(newvallist);
    setremoving(false);
  };
  let [loggedin, setloggedin] = useState(false);
  let [value, setValue] = useState([]);
  let [removing, setremoving] = useState(false);
  let [task, setTask] = useState("");
  let [date, setDate] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setuser] = useState("");
  let [loginemail, setloginemail] = useState("");
  let [loginpass, setloginpass] = useState("");
  return (
    <>
      <TodoContext.Provider
        value={{
          task,
          setTask,
          date,
          setDate,
          value,
          setValue,
          removing,
          setremoving,
          removeclickhandler,
          loggedin,
          setloggedin,
          name,
          setName,
          email,
          setEmail,
          password,
          setPassword,
          confirmPassword,
          setConfirmPassword,
          user,
          setuser,
          setloginemail,
          loginemail,
          setloginpass,
loginpass,          
        }}
      >
        {children}
      </TodoContext.Provider>
    </>
  );
};

export default Contextprovider;
