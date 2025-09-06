// import { useEffect, useState } from "react";
// import { gettodo } from "../services/todoitemservices";
import { useContext } from "react";
import Listitems from "./listitem";
import { TodoContext } from "../store/context";

let List = () => {
  let { value, removeclickhandler, removing } = useContext(TodoContext);
  // let [todotasks, settodotasks] = useState([]);
  // useEffect(() => {
  //   gettodo()
  //     .then((data) => {
  //       console.log(data);
  //       settodotasks(data);
  //       return data;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       settodotasks([]);
  //       return [];
  //     });
  // },[click]);
  return (
    <>
      {value.map((item) => {
        // console.log(item);
        return (
          <Listitems
            task={item.task}
            date={item.date}
            id={item._id}
            removeclickhandler={removeclickhandler}
            removing={removing}
          ></Listitems>
        );
      })}
    </>
  );
};

export default List;
