import { useContext } from "react";
import { posttodo } from "../services/todoitemservices";
import { TodoContext } from "../store/context";
import List from "./List";

let Handle = () => {
  let { task, setTask, date, setDate, value, setValue } =
    useContext(TodoContext);
  let clickhandler = async () => {
    let res = await posttodo(task, date);
    // setClick(!click);
    let newvalue = [...value, { task, date, _id: res._id }];
    setValue(newvalue);
  };
  let taskhandler = (e) => {
    setTask(e.target.value);
  };
  let datehandler = (e) => {
    setDate(e.target.value);
  };
  return (
    <>
      <h1>todo app</h1>
      <div className="inputitem">
        <div className="input">
          <input
            type="text"
            placeholder="Add task"
            name="task"
            className="task-name"
            onChange={(e) => {
              taskhandler(e);
            }}
          />
        </div>
        <div className="date">
          <input
            type="date"
            placeholder="Add task"
            name="task"
            className="task-date"
            onChange={(e) => {
              datehandler(e);
            }}
          />
        </div>
        <div className="add">
          <button
            className="button"
            onClick={(e) => {
              clickhandler(e);
            }}
          >
            Add
          </button>
        </div>
      </div>

        <List></List>

    </>
  );
};
export default Handle;
