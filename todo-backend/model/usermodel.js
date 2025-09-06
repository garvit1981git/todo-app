import mongoose from "mongoose"
let Userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  hashedpassword: { type: String, required: true },
  todos: [{ type: mongoose.Schema.Types.ObjectId, ref: "TodoItemDb" }]
})
let Usermodel = mongoose.model("userinfo", Userschema)
export default Usermodel;