import mongoose from "mongoose"
let todoitemschema = new mongoose.Schema({
  task: { type: String, required: true },
  date: { type: String },
  iscompleted: { type: Boolean, default: false }
})
let Todo = mongoose.model("TodoItemDb", todoitemschema)
export default Todo;